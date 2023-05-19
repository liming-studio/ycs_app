<template>
  <view>
    <view class="px-16 pt-12 pb-16">
      <view class="flex items-center">
        <view class="shrink-0">
          <u-avatar
            :text="companyData.companyName[0]"
            randomBgColor
            fontSize="24"
            size="44"
          />
        </view>
        <view class="ml-12 grow">
          <view class="font-bold line-1">{{ companyData.companyName }}</view>
          <view class="mt-4 w-36">
            <u-tag :text="companyData.businessStatus" size="mini" plain />
          </view>
        </view>
      </view>
      <view class="mt-16">
        <u-grid :border="false">
          <u-grid-item>
            <view class="text-xs text-gray-500">法定代表人</view>
            <view class="mt-2">{{ companyData.faRen }}</view>
          </u-grid-item>
          <u-grid-item>
            <view class="text-xs text-gray-500">注册资本</view>
            <view class="mt-2">{{ companyData.regMoney }}万</view>
          </u-grid-item>
          <u-grid-item>
            <view class="text-xs text-gray-500">成立日期</view>
            <view class="mt-2">{{ companyData.issueTime }}</view>
          </u-grid-item>
        </u-grid>
      </view>
    </view>
    <u-gap height="10" bgColor="#f3f4f6" />
    <view>
      <view class="px-16 py-12">
        <u-icon name="phone" label="电话" />
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      companyData: {
        address: '',            // 详细地址
        businessStatus: '',     // 经营状态
        bussinessDes: '',       // 经营范围
        cerValidityPeriod: '',  // 证书有效期
        companyCode: '',        // 公司编码
        companyName: '',        // 公司名称
        companyType: '',        // 企业类型
        creditCode: '',         // 信用码
        faRen: '',              // 法人
        issueTime: '',          // 成立时间
        regMoney: '',           // 注册资金
      }
    }
  },
  onShow() {
    this.getCompanyData()
  },
  methods: {
    getCompanyData() {
      let that = this
      uni.getStorage({
        key: 'companyDetail',
        success: function (res) {
          console.log(res.data)
          Object.assign(that.companyData, res.data)
        }
      })
    }
  },
}
</script>