<template>
  <view>
    <u-loading-page :loading="showLoading" />
    <view v-show="!showLoading" class="relative">
      <view class="w-full h-120 bg-primary p-16">
        <view class="w-full h-40 flex items-center">
          <view class="shrink-0 w-40 mr-12">
            <u-avatar :src="userInfo.thumbnail" />
          </view>
          <view class="grow w-full mr-12">
            <view class="text-white">
              <view class="text-sm">{{ userInfo.name }}</view>
              <view class="mt-2 text-xs opacity-90">您还未开通VIP会员</view>
            </view>
          </view>
        </view>
      </view>
      <view 
        class="w-full bg-white relative rounded-t-xl py-16 px-12" 
        style="margin-top: -40px; min-height: 300px"
      >
        <u-grid
          :border="false"
          col="3"
        >
          <u-grid-item
            v-for="(item, index) in vipList" 
            :key="index"
            class="p-4"
            @click="vipActive = index"
          >
            <view 
              class="w-full border-1 rounded-sm px-8 pt-12 pb-14 text-center"
              :class="vipActive === index ? 'border-primary bg-primary-10' : 'border-gray-300'"
            >
              <view>{{ item.title }}</view>
              <view 
                class="mt-6"
                :class="vipActive === index ? 'text-red' : 'text-gray-900'"  
              >
                <text>￥</text>
                <text class="text-xl">{{ item.price }}</text>
              </view>
              <view class="mt-6 text-xs text-gray-500">{{ item.content }}</view>
            </view>
          </u-grid-item>
        </u-grid>
        <view class="mt-16 px-8">
          <u-radio-group 
            v-model="payActive"
            placement="column"
            iconPlacement="right"
          >
            <u-radio 
              v-for="(item, index) in payList"
              :key="index"
              activeColor="#3c9cff" 
              class="w-full py-8"
              :name="item.label"
            >
              <u-icon :name="item.icon" :color="item.iconColor" size="24" :label="item.label" />
            </u-radio>
          </u-radio-group>
        </view>
        <view class="mt-32 px-8">
          <u-button text="立即开通" type="primary" shape="circle"></u-button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      showLoading: true,
      userInfo: {
        name: '',
        thumbnail: '',
        mobile: '',
        isvip: 0
      },
      vipActive: 0,
      vipList: [],
      payActive: '支付宝',
      payList: [
        { icon: 'zhifubao-circle-fill', iconColor: '#027aff', label: '支付宝' },
        { icon: 'weixin-circle-fill', iconColor: '#04BE02', label: '微信支付' }
      ]
    }
  },
  onLoad() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      const res = await this.$api({ url: '/user/getMyInfo' })
      if(res.data.code !== 20000) uni.$u.toast(res.data.msg)
      if(res.data.code === 20000) Object.assign(this.userInfo, res.data.data)
      this.$nextTick(() => {
        this.getVipShow()
      })
    },
    async getVipShow() {
      const res = await this.$api({ url: '/user/getVipShow' })
      if(res.data.code !== 20000) uni.$u.toast(res.data.msg)
      if(res.data.code === 20000) this.vipList = res.data.data
      this.$nextTick(() => {
        this.showLoading = false
      })
    }
  }
}
</script>