<template>
  <view class="px-16">
    <u-cell-group :border="false">
      <u-cell 
        title="服务协议"
        :isLink="true" 
        size="large"
        url="/pages/agreement/index"
      />
      <u-cell 
        title="隐私政策" 
        size="large"
        :isLink="true"
        url="/pages/privacy/index"
      />
    </u-cell-group>
    <view class="mt-48 flex justify-center">
      <view class="w-200">
        <u-button type="primary" shape="circle"  @click="quit">退出登录</u-button>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    methods: {
      quit() {
				uni.showModal({
					title: '确定要退出登录吗？',
					success: (res) => {
						if(res.confirm) {
              uni.removeStorage({ key: 'token' })
						  uni.reLaunch({ url: '/pages/login/index' })
            }
					}
				})
      }
    },
  }
</script>