<template>
  <view class="h-screen py-30 relative">
    <!-- logo -->
    <view class="w-full h-300 flex-center">
			<image src="/static/logo.png" class="w-70 h-70" />
			<view class="text-3xl text-primary" style=" margin-top:-4px">云畅搜</view>
		</view>
		<!-- main -->
		<view class="px-32">
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
					/>
				</u-form-item>
				<!-- 密码 -->
				<u-form-item v-show="formData.loginType">
					<u-input
						v-model="formData.password"
						:password="true"
						placeholder="请输入密码"
						border="bottom"
						clearable
						@change="changePassword"
					/>
				</u-form-item>
				<!-- 验证码 -->
				<u-form-item v-show="!formData.loginType">
					<u-input
						v-model="formData.captcha"
						type="number"
						placeholder="请输入验证码"
						border="bottom"
						clearable
						@change="changeCaptcha"
					>
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
			</u-form>
			<view class="flex items-center justify-between text-gray-500">
				<view @click="toForgetPassword">忘记密码？</view>
				<view @click="changeLoginType">
					<text>{{ formData.loginType ? '使用短信验证码登录' : '使用密码登录' }}</text>
				</view>
			</view>
			<u-button 
				type="primary"
				text="登录" 
				shape="circle"
				class="mt-50"
				:disabled="btnDisabled"
				@click="submit"
			/>
			<view class="mt-10 text-center text-base">
				<text class="text-gray-500">还没有账号？</text>
				<text class="text-primary" @click="toRegister">立即注册</text>
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
			<view class="ml-4 text-sm">
				<text class="text-gray-300">已阅读并同意</text>
				<text class="text-primary">《用户协议》</text>
				<text class="text-gray-300">和</text>
				<text class="text-primary">《隐私协议》</text>
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
				loginType: true,
				phone: uni.getStorageSync('phone') || '',
				password: '',
        captcha: ''
			},
			captchaBtnText: '',			// 验证码按钮文字
			checkAgreement: false,	// 是否勾选协议
			btnDisabled: true 	    // 登录按钮禁用状态
    }
  },
  methods: {
		// 切换登录状态
		changeLoginType() {
			this.formData.loginType = !this.formData.loginType
			if(this.formData.loginType) this.formData.captcha = ''
			if(!this.formData.loginType) this.formData.password = ''
		},
		/** 输入变化改变按钮禁用状态 **/
		changePhone(val) {
			this.btnDisabled = this.formData.loginType ? !(this.formData.password && val) : !(this.formData.captcha && val)
		},
		changePassword(val) {
			this.btnDisabled = !(this.formData.phone && val)
		},
		changeCaptcha(val) {
			this.btnDisabled = !(this.formData.phone && val)
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
		/******** 登录相关 ********/
		// 登录校验
		validateForm() {
			if(!this.checkAgreement) { uni.$u.toast('请阅读并勾选协议'); return }
			if(!validatePhone(this.formData.phone)) { uni.$u.toast('手机号格式不正确'); return }
			return true
		},
		// 提交信息
		submit() {
			if(this.validateForm()) {
				uni.showLoading({ title: '登录中' })
				this.btnDisabled = true
				this.login()
			}
		},
		// 登录
		async login() {
			const res = await this.$api({ 
				method: 'POST', 
				url: '/open/login', 
				data: {
					loginType: this.formData.loginType,
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
				// uni.setStorage({ key: 'phone', data: this.formData.phone })
				uni.setStorage({ key: 'token', data: res.data.data.token })
				uni.setStorage({ key: 'user', data: res.data.data.user })
				uni.setStorage({ key: 'phone', data: res.data.data.phone })
				setTimeout(() => {
					uni.hideLoading()
					uni.$u.toast('登录成功')
					this.btnDisabled = false
					uni.switchTab({ url:"/pages/index/index"})
				}, 200)
			}
		},
		/** 跳转啊啊啊 **/
		toForgetPassword() {
			uni.navigateTo({
				url: '/pages/login/forget'
			})
		},
		toRegister() {
			uni.navigateTo({
				url: '/pages/login/register'
			})
		}
	}
}
</script>
