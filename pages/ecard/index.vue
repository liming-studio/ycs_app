<!-- 我的名片 -->
<template>
  <view 
    class="w-full bg-gray-100" 
    :style="{height: screenHeight + 'px'}"
  >
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
        <view class="w-full h-440 bg-white rounded-xl p-16">
          <view class="w-full h-300 rounded-xl">
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
            <view class="mt-12 flex items-cneter">
              <u-icon name="account-fill" size="20" color="#c0c4cc" />
              <view class="ml-12 line-1">
                <text>{{ message.name }}</text>
                <text class="ml-8">{{ message.position }}</text>
              </view>
            </view>
            <view class="mt-4 flex items-center">
              <u-icon name="phone-fill" size="20" color="#c0c4cc" />
              <text class="ml-12 line-1">{{ message.mobile }}</text>
            </view>
            <view class="mt-4 flex items-center">
              <u-icon name="bookmark-fill" size="20" color="#c0c4cc" />
              <text class="ml-12 line-1">{{ message.companyname }}</text>
            </view>
            <view class="mt-4 flex items-center">
              <u-icon name="map-fill" size="20" color="#c0c4cc" />
              <text class="ml-12 line-1">{{ message.companyaddress }}</text>
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