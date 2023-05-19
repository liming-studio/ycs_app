<template>
  <view class="min-h-screen pt-navbar bg-gray-100">
    <u-navbar title="我的收藏" autoBack>
			<view slot="right">
				<u-button
          :text="multiple ? '取消' : '批量操作'"
          shape="circle"
          size="small"
          @click="changeMultiple"
        />
			</view>
		</u-navbar>
    <view class="p-12">
      <base-pagination
        ref="paginationRef" 
        url="/user/getCollectPage"
        :params="params"
        show-page-loading
        ask
      >
        <template v-slot:loading>
          <view class="w-full h-400 flex-center flex-col">
            <u-loading-icon 
              text="加载中" 
              mode="circle" 
              textSize="16" 
              size="32"
              :vertical="true"
            />
          </view>
        </template>
        <template v-slot="{list}">
          <view 
            v-for="(item, index) in list" 
            :key="index"
            class="w-full bg-white rounded-xs mb-8"
            style="box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05)"
          >
            <view class="pt-14 px-14 pb-6">
              <view class="text-lg">{{ item.name }}</view>
              <view class="mt-4 text-gray-500">{{ item.phone }}</view>
              <view class="pl-24 flex justify-end items-center">
                <!-- 加微信 -->
                <view 
                  v-if="item.phone"
                  class="ml-auto"
                  @click="addWeChat(item.phone)"
                >
                  <u-button 
                    icon="weixin-fill" 
                    color="#04BE02"
                    text="加微信"
                    shape="circle"
                    size="small" 
                    plain
                  />
                </view>
                <!-- 打电话 -->
                <view
                  v-if="item.phone"
                  class="ml-6"
                  @click="call(item.phone)"
                >
                  <u-button
                    type="primary"
                    icon="phone" 
                    text="打电话"
                    shape="circle"
                    size="small" 
                    plain
                  />
                </view>
              </view>
            </view>
            <u-line color="#e5e7eb" />
            <view class="px-10 py-8 text-xs flex items-start">
              <u-icon name="map" color="#909193" class="mt-1" />
              <view class="ml-1 text-gray-500">{{ item.address }}</view>
            </view>
          </view>
        </template>
      </base-pagination>
    </view>
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
      params: {}
    }
  },
  onReachBottom() {
    this.$refs.paginationRef.addPage()
  }
}
</script>