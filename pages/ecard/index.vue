<!-- 我的名片 -->
<template>
  <view 
    class="w-full bg-main pt-statusbar" 
    bgColor="rgba(236,236,236,0.2)"
    :style="{height: screenHeight + 'px'}"
  >
    <view class="stikcy top-0 w-full h-44 flex-center relative">
      <view 
        class="absolute left-0 px-16 h-44 flex items-center"
        @click="back"
      >
        <u-icon name="arrow-left" size="20"></u-icon>
      </view>
      <view class="text-xl">我的名片</view>
    </view>
    <!-- loading -->
    <u-loading-page :loading="showLoading" />
    <view v-if="!showLoading">
      <!-- empty -->
      <view 
        v-if="showEmpty" 
        class="w-full flex flex-col items-center justify-center"
        style="height: 70vh" 
      >
        <u-empty
          mode="data"
          width="450rpx"
          height="450rpx"
          textSize="28rpx"
          text="你还没有上传名片" 
          icon="http://cdn.uviewui.com/uview/empty/data.png"
        />
        <view class="mt-24 w-120">
          <navigator url="/pages/ecard/add" hover-class="none">
            <u-button type="primary">立即上传</u-button>
          </navigator>
        </view>
      </view>
      <!-- content -->
      <view v-else class="w-full p-16">
        <view class="w-full bg-white rounded-xl px-16 pt-16 pb-24">
          <view
            class="w-full h-300 rounded-xl"
          >
            <u-image 
              :src="JSON.parse(message.thumbnail)[0]"
              width="100%"
              height="300"
              mode="widthFix"
              radius="6"
              :lazy-load="true"
            >
              <template v-slot:loading>
                <u-loading-icon />
              </template>
            </u-image>
          </view>
          <view class="px-16">
            <view class="mt-16 line-1 text-2xl font-bold">
              <text>{{ message.name }}</text>
              <text class="ml-8">{{ message.position }}</text>
            </view>
            <view class="mt-12 flex items-center">
              <u-icon name="phone-fill" size="20" color="#c0c4cc" />
              <text class="ml-12 line-1 text-gray-700 text-lg">{{ message.mobile }}</text>
            </view>
            <view class="mt-8 flex items-center">
              <u-icon name="bookmark-fill" size="20" color="#c0c4cc" />
              <text class="ml-12 line-1 text-gray-700 text-lg">{{ message.companyname }}</text>
            </view>
            <view class="mt-8 flex items-center">
              <u-icon name="map-fill" size="20" color="#c0c4cc" />
              <text class="ml-12 line-1 text-gray-700 text-lg">{{ message.companyaddress }}</text>
            </view>
          </view>
        </view>
        <view class="mt-32 w-full h-70 flex items-center px-16 z-10">
          <navigator url="/pages/ecard/edit" hover-class="none" class="w-full">
            <u-button 
              type="primary" 
              shape="circle"  
            >
              编辑名片
            </u-button>
          </navigator>
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
        showEmpty: false,
        screenHeight: '',
        message: {
          id: null,
          thumbnail: '',        // 头像
          name: '',             // 姓名
          mobile: '',           // 对外联系号码
          wechatcode: '',       // 微信号
          position: '',         // 职位
          companyaddress: '',   // 公司地址
          companycontent: '',   // 公司简介
          companyname: '',      // 公司名称
          industryid: '',       // 主营业务
          wechat: '',           // 上传微信二维码
        }
      }
    },
    onLoad() {
      this.getCardDetail()
      this.screenHeight = uni.getSystemInfoSync().windowHeight
    },
    methods: {
      back() {
        uni.navigateBack()
      },
      async getCardDetail() {
        const res = await this.$api({ url: '/card/getDetail' })
        if(res.data.code !== 20000) uni.$u.toast(res.data.msg)
        if(res.data.code === 20000) {
          if(!res.data.data) this.showEmpty = true
          if(res.data.data) Object.assign(this.message, res.data.data)
        }
        setTimeout(() => this.showLoading = false, 200)
      }
    },
  }
</script>
<style scoped>
.bg-main {
  background: rgb(236,236,236);
  background: linear-gradient(180deg, rgba(236,236,236,1) 0%, rgba(192,239,242,1) 25%, rgba(250,243,252,1) 70%);
} 
</style>