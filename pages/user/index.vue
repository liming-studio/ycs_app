<template>
	<view>
		<u-loading-page :loading="showLoading" />
		<view 
			v-if="!showLoading"
			class="w-full pb-12 relative"
			:style="{height: screenHeight + 'px'}"
		>
			<!-- 头部背景 -->
			<view class="absolute w-full bg-top"></view>
			<!-- content -->
			<view class="relative pt-navbar">
				<!-- header -->
				<view class="absolute top-statusbar w-full h-44 flex items-center justify-between px-16">
					<view class="text-xl text-white">我的</view>
					<navigator url="/pages/user/set" hover-class="none">
						<u-icon name="setting" size="24" color="#ffffff" />
					</navigator>
				</view>
				<!-- card -->
				<view class="mt-16 w-full px-16">
					<view 
						class="w-full h-130 rounded-lg bg-white px-16"
						style="box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"	
					>
						<navigator 
							url="/pages/user/edit" 
							hover-class="none"
							class="w-full h-90 flex items-center"
						>
							<view class="shrink-0 w-60 mr-12">
								<u-avatar :src="userInfo.thumbnail" mode="cover" size="60" />
							</view>
							<view class="grow w-full mr-12">
								<view class="flex items-center">
									<view class="text-xl font-bold">{{ userInfo.name }}</view>
									<view class="ml-8 w-60">
										<u-button
											v-if="userInfo.isvip === 0"
											size="mini"
											color="#909399"
											text="普通用户"
										/>
										<u-button
											v-if="userInfo.isvip === 1"
											color="linear-gradient(0deg, #F0AF5B 0%, #F9DFAF 100%)"
											size="mini"
										>
											<text style="color: #613e10">VIP用户</text>
										</u-button>
									</view>
								</view>
								<view class="mt-8 text-sm text-gray-500">{{ userInfo.mobile }}</view>
							</view>
						</navigator>
						<u-line color="#e5e7eb"/>
						<view class="w-full h-40 flex items-center justify-around">
							<view class="text-gray-500">采集数：{{ numInfo.caijinum }}</view>
							<view class="text-gray-500">企查数：{{ numInfo.qiyechaxunnum }}</view>
						</view>
					</view>
				</view>
				<!-- cell -->
				<view class="mt-16 px-12">
					<u-cell-group :border="false">
						<u-cell 
							icon="man-add-fill" 
							title="我的名片"
							:isLink="true" 
							size="large"
							url="/pages/ecard/index"
							:iconStyle="{ color: '#3c9cff', fontSize: '24px'}"
							:titleStyle="{ fontSize: '15px' }"
						/>
						<u-cell 
							icon="share-fill" 
							title="我的推广"
							:isLink="true" 
							size="large"
							url="/pages/promotion/me"
							:iconStyle="{ color: '#3c9cff', fontSize: '22px'}"
							:titleStyle="{ fontSize: '15px' }"
						/>
						<u-cell 
							icon="star-fill" 
							title="我的收藏" 
							size="large"
							:isLink="true"
							:iconStyle="{ color: '#3c9cff', fontSize: '20px'}"
							:titleStyle="{ fontSize: '15px' }"
						/>
					</u-cell-group>
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
				screenHeight: '',
				userInfo: {
					name: '',
					thumbnail: '',
					mobile: '',
					isvip: 0
				},
				numInfo: {
					caijinum: 0,
					qiyechaxunnum: 0
				}
			}
		},
		onLoad() {
      this.screenHeight = uni.getSystemInfoSync().windowHeight
    },
		onShow() {
			this.getUserInfo()
			this.getNum()
		},
		methods: {
			async getUserInfo() {
				const res = await this.$api({ url: '/user/getMyInfo' })
				if(res.data.code !== 20000) uni.$u.toast(res.data.msg)
      	if(res.data.code === 20000) Object.assign(this.userInfo, res.data.data)
				this.$nextTick(() => this.showLoading = false)
				// setTimeout(() => this.showLoading = false, 200)
			},
			async getNum() {
				const res = await this.$api({ url: '/user/getNum' })
				if(res.data.code !== 20000) uni.$u.toast(res.data.msg)
      	if(res.data.code === 20000) Object.assign(this.numInfo, res.data.data)
			}
		}
	}
</script>

<style scoped>
.bg-top {
  background: #3c9cff;
  height: 20vh;
  border-bottom-left-radius: 50% 20%;
  border-bottom-right-radius: 50% 20%;
}
</style>
