<template>
  <view class="h-screen py-30">
    <!-- logo -->
    <view class="w-full h-200 flex-center text-3xl text-primary">云畅搜</view>
		<!-- main -->
		<view style="padding: 0 75rpx;">
			<!-- tabs 
			<view class="flex justify-center">
				<u-tabs 
					:list="tabList" 
					:is-scroll="false" 
					:current="current" 
					class="mb-20"
					@change="tabChange"
				/>
			</view>
			-->
			<!-- form -->
			<u-form>
				<!-- 手机号 -->
				<u-form-item>
					<u-input
						v-model="formData.phone"
						maxlength="11"
						placeholder="请输入手机号"
						border="bottom"
						clearable
					/>
				</u-form-item>
				<!-- 密码 -->
				<u-form-item v-show="formData.loginType">
					<u-input
						v-model="formData.password"
						:password="!showPassword"
						placeholder="请输入密码"
						border="bottom"
						clearable
					>
						<template slot="suffix">
							<view class="p-1" @click="showPassword = !showPassword">
								<u-icon v-if="!showPassword" name="eye" size="20"></u-icon>
								<u-icon v-else name="eye-off" size="20"></u-icon>
							</view>
						</template>
					</u-input>
				</u-form-item>
				<!-- 验证码 -->
				<u-form-item v-show="!formData.loginType">
					<u-input
						v-model="formData.captcha"
						type="number"
						placeholder="请输入验证码"
						border="bottom"
						clearable
					>
						<template slot="suffix">
							<u-code
								ref="uCode"
								@change="codeChange"
								seconds="20"
								changeText="X秒重新获取哈哈哈"
							/>
							<u-button
								type="primary"
								size="mini"
								@tap="getCode"
								:text="captchaBtnText"
							/>
					</template>
					</u-input>
				</u-form-item>
			</u-form>
			<view class="flex items-center justify-between text-gray-300">
				<view>忘记密码？</view>
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
				<text class="text-gray-300">还没有账号？</text>
				<text class="text-primary">立即注册</text>
			</view>
			<!-- 用户协议、隐私协议 -->
			<view class="mt-20 flex-center">
				<view
					class="w-16 h-16 rounded-5xl border-1 border-gray-300 flex-center"
					:class="{'bg-primary border-primary': checkAgreement}"
					@click="checkAgreement = !checkAgreement"
				>
					<u-icon v-show="checkAgreement" name="checkbox-mark" color="#FFFFFF" size="12"></u-icon>
				</view>
				<view class="ml-4 text-sm">
					<text class="text-gray-300">请您阅读并同意</text>
					<text class="text-primary">《用户协议》</text>
					<text class="text-gray-300">和</text>
					<text class="text-primary">《隐私协议》</text>
				</view>
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
				// phone: uni.getStorageSync("phone") || '',
				phone: '',
				password: '',
        captcha: ''
			},
			showPassword: false,		// 是否显示密码
			captchaBtnText: '',			// 验证码按钮文字
			checkAgreement: false,	// 是否勾选协议
			btnDisabled: false, 	  // 登录按钮禁用状态
			/** tabs 
				tabList: [{name: '账号登录'}, {name: '验证码登录'}],
				current: 0,
			**/
    };
  },
  mounted() {
	},
  methods: {
		// 切换登录状态
		changeLoginType() {
			this.formData.loginType = !this.formData.loginType
			if(this.formData.loginType) this.formData.captcha = ''
			if(!this.formData.loginType) this.formData.password = ''
		},
		/******** 验证码相关 ********/
		codeChange(text) {
			this.captchaBtnText = text
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
		validateLogin() {
			if(this.formData.loginType && (!this.formData.phone || !this.formData.password)) { uni.$u.toast('输入信息不完整'); return }
			if(!this.formData.loginType && (!this.formData.phone || !this.formData.captcha)) { uni.$u.toast('输入信息不完整'); return }
			if(!this.checkAgreement) { uni.$u.toast('请阅读并勾选协议'); return }
			if(!validatePhone(this.formData.phone)) { uni.$u.toast('手机号格式不正确'); return }
			return true
		},
		// 提交登录信息
		submit() {
			if(this.validateLogin()) {
				uni.showLoading({ title: '登录中' })
				this.btnDisabled = true
				this.login()
			}
		},
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
				setTimeout(() => {
					uni.hideLoading()
					uni.$u.toast('登录成功')
					this.btnDisabled = false
					uni.switchTab({ url:"/pages/index/index"})
				}, 200)
			}
		}
		// tabChange(val) {
		// 	this.current = val.index
		// }
	},
};
</script>
