<template>
  <view class="min-h-screen bg-gray-100">
    <u-loading-page :loading="showLoading" />
    <view v-if="!showLoading">
      <u-sticky>
        <view class="py-8 px-16 text-sm bg-white z-10">
          <text class="text-gray-500">搜索条件：</text>
          <text class="text-primary">{{ message.title }}</text>
          <text class="text-gray-500">，共搜出</text>
          <text class="text-primary px-2">{{ message.num }}</text>
          <text class="text-gray-500">条客源数据</text>
        </view>
      </u-sticky>
      <view class="p-16">
        <view
          v-for="(item, index) in JSON.parse(message.content)"
          :key="index"
          class="w-full bg-white rounded-xs mb-12"
        >
          <view class="pt-12 px-12 pb-4 flex items-end">
            <view class="flex-grow mr-8">
              <view class="text-lg">
                <text v-if="message.type === '企查拓客'">{{ item.companyName }}</text>
                <text v-else>{{ item.name }}</text>
              </view>
              <view 
                v-if="['精准拓客', '附近拓客'].includes(message.type)"
                class="mt-8 text-gray-700"
              >
                {{ item.phone }}
              </view>
            </view>
            <view class="shrink-0 ml-auto w-80 flex items-center justify-end">
              <!-- 打电话 -->
              <view v-if="item.phone" class="p-4" @click="call(item.phone)">
                <u-icon name="phone" color="#2979ff" size="20" />
              </view>
              <!-- 收藏 -->
              <view class="ml-4 p-4">
                <u-icon name="star" size="20" />
              </view>
            </view>
          </view>
          <u-line color="#e5e7eb" />
          <view class="px-12 py-6 text-xs flex items-start">
            <u-icon name="map" color="#909193" class="mt-1" />
            <view class="ml-1 text-gray-500">{{ item.address }}</view>
          </view>
        </view>
        <u-divider text="已经到底了" />
      </view>
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
      message: {
        id: null, 
        title: '',
        content: '',
        num: null,
        region: '',
        type: ''
      }
    }
  },
  methods: {
    async getDetail(id) {
      const res = await this.$api({ url: '/history/getDetail', data: {id: id} })
      if(res.data.code !== 20000) uni.$u.toast(res.data.msg)
      if(res.data.code === 20000) Object.assign(this.message, res.data.data)
      setTimeout(() => this.showLoading = false, 200)
    },
    call(phoneNum) {
      uni.makePhoneCall({
        phoneNumber: phoneNum //仅为示例
      })
    }
  },
}
</script>