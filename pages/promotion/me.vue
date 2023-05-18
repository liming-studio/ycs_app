<template>
  <view
    class="w-full pt-navbar bg-gray-100 relative"
		:style="{minHeight: screenHeight + 'px'}"
  >
    <u-navbar title="我的推广" autoBack>
			<view slot="right">
				<u-button text="发布推广" shape="circle" size="small" @click="addPromote" />
			</view>
		</u-navbar>
    <base-pagination 
      ref="paginationRef" 
      url="/tuiguang/getMyPage"
      :show-divider="false"
      ask
    >
      <template v-slot="{list}">
        <view class="px-12">
          <navigator 
            v-for="(item, index) in list"
            :key="index"
            :url="'/pages/promotion/detail?id='+item.id" 
            hover-class="none"
          >
            <view class="w-full h-136 bg-white rounded-xs px-12 mt-12">
              <view class="flex py-12">
                <view class="shrink-0 w-100 h-75 rounded-sm">
                  <u-image 
                    :src="JSON.parse(item.images)[0]"
                    width="200rpx" 
                    height="150rpx" 
                    radius="6" 
                    :lazy-load="true"
                  >
                    <template v-slot:loading>
                      <u-loading-icon />
                    </template>
                  </u-image>
                </view>
                <view class="ml-12 grow flex flex-col justify-between pb-1">
                  <view class="line-2">
                    <text class="px-6 py-1 bg-error text-white text-xs rounded-xs">{{ item.level }}</text>
                    <text class="ml-8 text-lg">{{ item.title }}</text>
                  </view>
                  <view class="text-right text-xs">
                    <text class="text-gray-500">{{ item.industryname }}</text>
                    <text class="text-gray-300 px-6">|</text>
                    <text class="text-gray-500">{{ item.inserttime }}</text>
                  </view>
                </view>
              </view>
              <u-line color="#e5e7eb"/>
              <view class="w-full h-36 flex items-center">
                <view class="shrink-0">
                  <u-avatar :src="item.userthumbnail" size="20" />
                </view>
                <view class="ml-6 text-gray-700 line-1 text-sm">{{ item.companyname }}</view>
                <view class="ml-auto text-xs text-gray-500">{{ item.looknum }}人浏览</view>
                <text class="text-gray-300 px-6">|</text>
                <view 
                  class="flex items-center"
                  @click.stop="removeItem(item.id)"
                >
                  <u-icon name="trash" size="16" color="#909193" />
                  <view class="text-xs text-gray-500">删除</view>
                </view>
              </view>
            </view>
          </navigator>
        </view>
      </template>
    </base-pagination>
  </view>
</template>

<script>
import BasePagination from '@/components/BasePagination.vue'
export default {
  components: {
    BasePagination
  },
  data() {
    return {
      init: false,
      screenHeight: '',
    }
  },
  onLoad() {
    this.screenHeight = uni.getSystemInfoSync().windowHeight
  },
  onShow() {
    if(this.init) {
      this.init = false
      uni.pageScrollTo({scrollTop: 0, duration: 0 })
      this.$refs.paginationRef.askApi(false)
    }
  },
  onReachBottom() {
    this.$refs.paginationRef.addPage()
  },
  methods: {
    // 发布推广
    addPromote() {
      uni.navigateTo({
        url: '/pages/promotion/add'
      })
    }
  }
}
</script>