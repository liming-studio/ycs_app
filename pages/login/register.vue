<template>
  <view class="w-full h-screen pt-navbar relative">
    <u-navbar autoBack />
    <view class="px-24 py-16">
      <view class="text-2xl">新用户注册</view>
      <view class="mt-32">
        <!-- form -->
        <u-form>
          <!-- 手机号 -->
          <u-form-item>
            <u-input
              v-model="formData.phone"
              type="number"
              maxlength="11"
              placeholder="请输入手机号"
              border="bottom"
              clearable
              @change="changePhone"
            >
              <u-text
                text="手机号码："
                slot="prefix"
                margin="0 8px 0 0"
                type="tips"
              />
            </u-input>
          </u-form-item>
          <!-- 验证码 -->
          <u-form-item>
            <u-input
              v-model="formData.captcha"
              type="number"
              placeholder="请输入验证码"
              border="bottom"
              clearable
              @change="changeCaptcha"
            >
              <u-text
                text="验证码："
                slot="prefix"
                margin="0 8px 0 0"
                type="tips"
              />
              <template slot="suffix">
                <u-code
                  ref="uCode"
                  @change="codeChange"
                  seconds="20"
                  changeText="X秒重新获取"
                />
                <u-button
                  type="primary"
                  size="mini"
                  shape="circle"
                  @tap="getCode"
                  :text="captchaBtnText"
                />
              </template>
            </u-input>
          </u-form-item>
          <!-- 登录密码 -->
          <u-form-item>
            <u-input
              v-model="formData.password"
              :password="true"
              placeholder="请输入您的登录密码"
              border="bottom"
              clearable
              @change="changePassword"
            >
              <u-text
                text="登录密码："
                slot="prefix"
                margin="0 8px 0 0"
                type="tips"
              />
            </u-input>
          </u-form-item>
          <!-- 邀请码 -->
          <u-form-item>
            <u-input
              type="number"
              placeholder="请输入邀请码（选填）"
              border="bottom"
              clearable
            >
              <u-text
                text="邀请码："
                slot="prefix"
                margin="0 8px 0 0"
                type="tips"
              />
            </u-input>
          </u-form-item>
        </u-form>
        <u-button 
          type="primary"
          text="立即注册" 
          shape="circle"
          class="mt-50"
          :disabled="btnDisabled"
          @click="submit"
        />
      </view>
    </view>
    <!-- 用户协议、隐私协议 -->
		<view 
			class="absolute w-full flex-center"
			style="bottom: 50rpx"
		>
			<view
				class="w-16 h-16 rounded-5xl border-1 border-gray-300 flex-center"
				:class="{'bg-primary border-primary': checkAgreement}"
				@click="checkAgreement = !checkAgreement"
			>
				<u-icon v-show="checkAgreement" name="checkbox-mark" color="#FFFFFF" size="12"></u-icon>
			</view>
			<view class="ml-4 text-sm flex items-cenetr">
				<view class="text-gray-300">已阅读并同意</view>
				<navigator 
					url="/pages/agreement/index"
					hover-class="none"
					class="text-primary"
				>
					《服务协议》
				</navigator>
				<view class="text-gray-300">和</view>
				<navigator 
					url="/pages/privacy/index"
					hover-class="none"
					class="text-primary"
				>
					《隐私政策》
				</navigator>
			</view>
		</view>
  </view>
</template>

<script>
import { validatePhone } from '@/utils/validate.js'
import { Encrypt } from '@/utils/crypto.js'

export default {
  data() {
    return {
			formData: {
				phone: '',
				password: '',
        captcha: ''
			},
      captchaBtnText: '',			// 验证码按钮文字
			checkAgreement: false,	// 是否勾选协议
			btnDisabled: true 	    // 登录按钮禁用状态
    }
  },
  methods: {
    /** 输入变化改变按钮禁用状态 **/
    changePhone(val) {
      this.btnDisabled = !(val && this.formData.password && this.formData.captcha)
    },
    changePassword(val) {
      this.btnDisabled = !(val && this.formData.phone && this.formData.captcha)
    },
    changeCaptcha(val) {
      this.btnDisabled = !(val && this.formData.phone && this.formData.password)
    },
    /******** 验证码相关 ********/
		codeChange(text) {
			if(text === '重新获取') {
				this.captchaBtnText = '获取验证码'
			} else {
				this.captchaBtnText = text
			}
		},
		getCode() {
			// 拦截一些不合规的情况
			if(!this.formData.phone) { uni.$u.toast('请输入手机号'); return }
			if(!validatePhone(this.formData.phone)) { uni.$u.toast('手机号格式不正确'); return }
			if(!this.$refs.uCode.canGetCode) { uni.$u.toast('倒计时结束后再发送'); return }
			// 模拟向后端请求验证码
			uni.showLoading({ title: '正在获取验证码' })
			this.getCaptcha(this.formData.phone)
			setTimeout(() => {
				uni.hideLoading()
				uni.$u.toast('验证码已发送')
				this.$refs.uCode.start()
			}, 2000)
		},
		async getCaptcha(phone) {
			const res = await this.$api({ url: '/open/sendCaptcha', data: { phone: phone } })
			if(res.data.code !== 20000) uni.$u.toast(res.data.msg)
		},
    /******** 注册相关 ********/
    // 校验
		validateForm() {
			if(!this.checkAgreement) { uni.$u.toast('请阅读并勾选协议'); return }
			if(!validatePhone(this.formData.phone)) { uni.$u.toast('手机号格式不正确'); return }
			return true
		},
    // 提交信息
		submit() {
			if(this.validateForm()) {
				uni.showLoading({ title: '注册中' })
				this.btnDisabled = true
				this.register()
			}
		},
    // 注册
    async register() {
			const res = await this.$api({
				url: '/open/register', 
				data: {
					phone: this.formData.phone,
					password: Encrypt(this.formData.password),
					captcha: this.formData.captcha,
				}
			})
			if(res.data.code !== 20000) {
				uni.hideLoading()
				this.btnDisabled = false
				uni.$u.toast(res.data.msg)
			}
			if (res.data.code == 20000) {
        uni.setStorage({ key: 'token', data: res.data.data.token })
				uni.setStorage({ key: 'user', data: res.data.data.user })
				uni.$u.toast('成功')
				setTimeout(() => {
          uni.hideLoading()
					this.btnDisabled = false
					uni.reLaunch({ url:"/pages/index/index"})
				}, 200)
			}
		},
  }
}
</script>

<style lang="scss" scoped>
/deep/ .u-text__value--tips {
  color: #303133;
  width: 150rpx
}
</style>
