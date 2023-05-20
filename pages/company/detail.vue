<template>
  <view class="pb-16">
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
          <view class="text-lg font-bold line-1">{{ companyData.companyName }}</view>
          <view class="mt-4 flex items-center">
            <view v-show="companyData.businessStatus">
              <u-tag 
                :text="companyData.businessStatus" 
                :color="companyData.businessStatus === '注销' ? '#909193' : '#5ac725'" 
                :borderColor="companyData.businessStatus === '注销' ? '#909193' : '#5ac725'" 
                size="mini" 
                plain 
              />
            </view>
            <view v-show="companyData.regType" class="ml-6">
              <u-tag :text="companyData.regType" size="mini" plain />
            </view>
          </view>
        </view>
      </view>
      <view class="mt-16">
        <u-grid :border="false">
          <u-grid-item>
            <view class="text-xs text-gray-500">法定代表人</view>
            <view class="mt-2">{{ companyData.faRen || '-' }}</view>
          </u-grid-item>
          <u-grid-item>
            <view class="text-xs text-gray-500">注册资本</view>
            <view class="mt-2">{{ `${companyData.regMoney}万` || '-' }}</view>
          </u-grid-item>
          <u-grid-item>
            <view class="text-xs text-gray-500">成立日期</view>
            <view class="mt-2">{{ companyData.issueTime || '-' }}</view>
          </u-grid-item>
        </u-grid>
      </view>
    </view>
    <u-gap height="10" bgColor="#f3f4f6" />
    <view class="px-16 py-12">
      <view class="text-base font-bold">企业地址</view>
      <view class="mt-10 text-sm text-gray-500">{{ companyData.address || '-' }}</view>
    </view>
    <u-gap height="10" bgColor="#f3f4f6" />
    <view class="px-16 py-12">
      <view class="text-base font-bold">工商信息</view>
      <view class="mt-16 w-310">
        <u-grid col="2" :border="true" class="text-sm">
          <u-grid-item class="pb-12 pr-4">
            <view class="w-full text-gray-500 mb-6">经营者</view>
            <view class="w-full">{{ companyData.faRen || '-'  }}</view>
          </u-grid-item>
          <u-grid-item class="pb-12 pl-12">
            <view class="w-full mb-6 opacity-0">-</view>
            <view class="w-full opacity-0">-</view>
          </u-grid-item>
          <u-grid-item class="py-12 pr-4">
            <view class="w-full text-gray-500 mb-6">成立时间</view>
            <view class="w-full">{{ companyData.issueTime || '-' }}</view>
          </u-grid-item>
          <u-grid-item class="py-12 pl-12">
            <view class="w-full text-gray-500 mb-6">登记状态</view>
            <view class="w-full">{{ companyData.businessStatus || '-' }}</view>
          </u-grid-item>
          <u-grid-item class="py-12 pr-4">
            <view class="w-full text-gray-500 mb-6">注册资本</view>
            <view class="w-full">{{ `${companyData.regMoney}万` || '-' }}</view>
          </u-grid-item>
          <u-grid-item class="py-12 pl-12">
            <view class="w-full text-gray-500 mb-6">实缴资本</view>
            <view class="w-full">-</view>
          </u-grid-item>
          <u-grid-item class="py-12 pr-4">
            <view class="w-full text-gray-500 mb-6">企业类型</view>
            <view class="w-full">{{ companyData.companyType || '-' }}</view>
          </u-grid-item>
          <u-grid-item class="py-12 pl-12">
            <view class="w-full text-gray-500 mb-6">参保人数</view>
            <view class="w-full">-</view>
          </u-grid-item>
        </u-grid>
      </view>
    </view>
    <u-gap height="10" bgColor="#f3f4f6" />
    <view class="px-16 py-12">
      <view class="text-base font-bold">经营范围</view>
      <view class="mt-10 text-sm text-gray-500">{{ companyData.bussinessDes || '-' }}</view>
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
        regType: '',            // 注册类型
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