<template>
  <view class="py-12 px-16">
    <!-- loading -->
    <view v-show="showLoading">
      <u-skeleton :loading="showLoading" avatar avatarSize="36" rowsWidth="95%" rows="1" />
      <u-skeleton :loading="showLoading" title rowsWidth="95%" rows="3" class="mt-16" />
      <u-skeleton :loading="showLoading" rowsWidth="95%" rows="2" class="mt-16" />
      <u-skeleton :loading="showLoading" rowsHeight="150" rows="1" class="mt-16" />
      <u-skeleton :loading="showLoading" rowsHeight="150" rows="1" class="mt-16" />
    </view>
    <view v-if="!showLoading">
      <!-- empty -->
      <view 
        v-if="showEmpty"
        class="flex-center h-full" 
        style="height: 80vh"
      >
        <u-empty
          mode="data"
          icon="http://cdn.uviewui.com/uview/empty/data.png"
          width="450rpx"
          height="450rpx"
          textSize="28rpx"
        />
      </view>
      <!-- content -->
      <view v-else>
        <view class="flex items-center">
          <view class="shrink-0">
            <u-avatar :src="message.userthumbnail" size="36" />
          </view>
          <view class="ml-12 grow">
            <view class="font-bold">{{ message.companyname }}</view>
            <view class="text-sm">
              <text class="text-gray-500">{{ message.industryname }}</text>
              <text class="text-gray-300 px-2">｜</text>
              <text class="text-gray-500">{{ message.contact }}</text>
            </view>
          </view>
          <view 
            v-if="user.id === message.userid"
            class="shrink-0"
          >
            <u-icon name="more-dot-fill" size="20" color="#303133" @click="actions.show = true" />
            <u-action-sheet 
              :show="actions.show"
              :actions="actions.list" 
              :round="16"
              :closeOnClickOverlay="true" 
              :closeOnClickAction="true"
              cancelText="取消"
              @close="actions.show = false"
              @select="handleSelect"
            >
            </u-action-sheet>
          </view>
        </view>
        <view class="mt-20 text-xl font-bold">{{ message.title }}</view>
        <view class="mt-8 text-sm">
          <text class="text-gray-500">{{ message.inserttime }}</text>
          <text class="text-gray-300 px-2 text-xs">｜</text>
          <text class="text-gray-500">{{ message.looknum }}人浏览</text>
        </view>
        <view class="mt-24">{{ message.content }}</view>
        <view class="mt-24">
          <view 
            v-for="(img, index) in JSON.parse(message.images)"
            :key="index"  
            class="mb-12"
          >
            <u-image 
              :src="img"
              width="100%"
              height=""
              mode="widthFix"
              radius="6"
              :lazy-load="true"
            >
              <template v-slot:loading>
                <u-loading-icon />
              </template>
            </u-image>
          </view>
        </view>
      </view>
      <!-- image -->
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        init: false,
        user: uni.getStorageSync('user'),
        showLoading: true,
        showEmpty: false,
        actions: {
          show: false,
          list: [
            { name: '编辑', key: 'edit' },
            { name: '删除', key: 'remove' }
          ]
        },
        message: {
          id: null,
          industryid: null,
          companyname: '',
          contact: '',
          content: '',
          images: '',
          industryname: '',
          inserttime: '',
          level: '',
          looknum: null,
          ordervalue: null,
          state: 1,
          title: '',
          userid: null
        }
      }
    },
    onLoad(options) {
      this.getDetail(options.id)
    },
    onShow() {
      if(this.message.id) {
        this.showLoading = true
        this.getDetail(this.message.id)
      }
			// if(this.init) {
      //   this.showLoading = true
			// 	this.init = false
			// 	uni.pageScrollTo({scrollTop: 0, duration: 0 })
			// 	this.getDetail(this.message.id)
			// }
		},
    methods: {
      async getDetail(id) {
        const res = await this.$api({ url: '/open/tuiguang/getDetail', data: { id: id } })
        if(res.data.code === 20000) Object.assign(this.message, res.data.data)
        if(res.data.code !== 20000) {
          uni.$u.toast(res.data.msg)
          this.showEmpty = true
        }
        this.$nextTick(() => this.showLoading = false)
      },
      handleSelect(e) {
        if(e.key === 'edit') {
          uni.navigateTo({
            url: `/pages/promotion/edit?id=${this.message.id}`
          })
        }
        if(e.key === 'remove') {
          uni.showModal({
            title: '提示',
            content: '你确定要删除这条推广吗？',
            icon: 'fail',
            success: (res) => {
              if(res.confirm) this.remove(this.message.id)
            }
          })
        }
      },
      async remove(id) {
        // let pages = getCurrentPages()
        // let prePage = pages[pages.length - 2]
				const res = await this.$api({ url: `/tuiguang/delete?id=${id}`})
				if(res.data.code !== 20000) uni.$u.toast(res.data.msg)
				if(res.data.code === 20000) {
					uni.$u.toast(res.data.msg)
          // prePage.init = true
          this.$nextTick(() => {
            uni.navigateBack({ delta: 1 })
          })
				}
			}
    },
  }
</script>