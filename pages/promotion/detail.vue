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
          width="480rpx"
          height="480rpx"
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
    onLoad(options) {
      this.getDetail(options.id)
    },
    data() {
      return {
        showLoading: true,
        showEmpty: false,
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
    methods: {
      async getDetail(id) {
        const res = await this.$api({ url: '/open/tuiguang/getDetail', data: { id: id } })
        if(res.data.code === 20000) Object.assign(this.message, res.data.data)
        if(res.data.code !== 20000) {
          uni.$u.toast(res.data.msg)
          this.showEmpty = true
        }
        setTimeout(() => {
          this.showLoading = false
        }, 150)
      },
    },
  }
</script>