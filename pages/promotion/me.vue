<template>
  <view
    class="w-full pt-navbar relative"
		:style="{minHeight: screenHeight + 'px'}"
  >
    <u-navbar
			title="我的推广"
      :autoBack="true"
		>
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
        <navigator 
          v-for="(item, index) in list"
          :key="index"
          :url="'/pages/promotion/detail?id='+item.id" 
          hover-class="none"
        >
          <view class="p-16">
            <view class="flex items-center">
              <view class="shrink-0 w-36 h-36 rounded-xs">
                <u-avatar :src="item.userthumbnail" size="36" />
              </view>
              <view class="ml-10 grow">
                <view class="flex items-center justify-between">
                  <view class="text-base">{{ item.companyname }}</view>
                  <view 
                    v-if="item.level"
                    class="px-6 py-1 bg-error text-white text-xs rounded-xs"
                  >
                    {{ item.level }}
                  </view>
                </view>
                <view class="text-xs text-gray-500">{{ item.inserttime }}</view>
              </view>
            </view>
            <view class="mt-8">
              <view class="line-2 text-lg font-bold">{{ item.title }}</view>
              <view class="mt-8 text-base text-gray-700 line-3">{{ item.content }}</view>
              <view class="mt-8 flex">
                <view 
                  v-for="(img, index) in JSON.parse(item.images)"
                  :key="index"
                  class="w-110 h-110 rounded-xs mr-8"
                >
                  <u-image 
                    :src="img" 
                    width="220rpx" 
                    height="220rpx" 
                    radius="6"
                    :lazy-load="true"
                  >
                    <template v-slot:loading>
                      <u-loading-icon />
                    </template>
                  </u-image>
                </view>
              </view>
              <view class="mt-12 flex items-center">
                <u-icon name="tags" color="#909193" />
                <view class="ml-4 text-sm text-gray-500">{{ item.industryname }}</view>
                <view class="ml-auto text-sm text-gray-500">{{ item.looknum }}人浏览</view>
              </view>
            </view>
          </view>
          <u-line color="#e5e7eb" />
        </navigator>
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
      screenHeight: '',
    }
  },
  onLoad() {
    this.screenHeight = uni.getSystemInfoSync().windowHeight
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