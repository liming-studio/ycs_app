<template>
	<view class="w-full min-h-screen bg-gray-100 pb-12 relative">
		<!-- 头部背景 -->
		<view class="absolute w-full">
			<view class="bg-top-1" />
			<view class="bg-top-2" />
		</view>
		<!-- main -->
		<view class="relative">
			<!-- header -->
			<view 
				class="sticky top-0 z-50 pt-statusbar"
				:style="headerStyle"
			>
				<view class="flex items-center h-44 px-16">
					<view 
						class="shrink-0 text-xl"
						:class="headerOpacity > 0.5 ? 'text-primary' : 'text-white'"
					>
						云畅搜
					</view>
					<view class="grow px-9">
						<view 
							class="w-full h-32 bg-white rounded-sm flex items-center px-8"
							:style="searchStyle"
							@click="navigateTo('/pages/precise/index')"
						>
							<u-icon name="search" size="20" color="#3c9cff" />
							<view class="ml-4 text-gray-500">请输入关键词</view>
						</view>
					</view>
					<navigator 
						url="/pages/vip/index" 
						hover-class="none" 
						class="ml-auto shrink-0"
					>
						<u-button
							icon="level"
							color="linear-gradient(0deg, #F0AF5B 0%, #F9DFAF 100%)" 
							shape="circle"
							icon-color="#613e10"
							size="small"
						>
							<text style="color: #613e10">开通会员</text>
						</u-button>
					</navigator>
				</view>
			</view>
			<!-- content -->
			<view class="px-16 relative">
				<!-- search -->
					<view 
					class="w-full h-42 rounded-2xl bg-white flex items-center px-14"
					@click="navigateTo('/pages/precise/index')"	
				>
					<u-icon name="search" size="24" color="#909193" />
					<view class="ml-8 text-gray-500">请输入关键词</view>
				</view>
				<!-- kingkong -->
				<u-grid  :border="false" col="4" class="mt-12">
					<!-- 精准拓客 -->
					<u-grid-item>
						<view 
							class="flex flex-col items-center"
							@click="navigateTo('/pages/precise/index')"
						>
							<image src="/static/kingkong/target-icon.png" class="w-40 h-40" />
							<text class="grid-text">精准拓客</text>
						</view>
					</u-grid-item>
					<!-- 附近拓客 -->
					<u-grid-item>
						<view 
							class="flex flex-col items-center"
							@click="navigateTo('/pages/near/index')"
						>
							<image src="/static/kingkong/location-icon.png" class="w-40 h-40" />
							<text class="grid-text">附近拓客</text>
						</view>
					</u-grid-item>
					<!-- 企查拓客 -->
					<u-grid-item>
						<view 
							class="flex flex-col items-center"
							@click="navigateTo('/pages/company/index')"
						>
							<image src="/static/kingkong/suitcase-icon.png" class="w-40 h-40" />
							<text class="grid-text">企查拓客</text>
						</view>
					</u-grid-item>
					<!-- 电子名片 -->
					<u-grid-item>
						<view 
							class="flex flex-col items-center"
							@click="navigateTo('/pages/ecard/index')"
						>
							<image src="/static/kingkong/man-icon.png" class="w-50 h-40" />
							<text class="grid-text">电子名片</text>
						</view>
					</u-grid-item>
				</u-grid>
				<!-- kingkogn2 -->
				<view class="mt-8 w-full h-160 bg-white rounded-lg flex items-center p-12">
					<!-- 附近拓客 -->
					<view 
						class="shrink-0 w-160 h-full rounded-sm relative"
						@click="navigateTo('/pages/near/index')"
					>
						<view class="absolute inset-0 z-10 rounded-sm bg-primary bg-linear-near p-12">
							<view class="text-lg text-sky-600">附近拓客</view>
							<view class="text-xs opacity-80">搜索附近10km客源</view>
							<view class="mt-12 w-60">
								<u-button 
									size="mini" 
									color="linear-gradient(to right, rgb(251,167,50), rgb(251,183,92))" 
									text="去看看>" 
									shape="circle" 
								/>
							</view>
						</view>
						<view class="w-155 h-136 rounded-sm overflow-hidden">
							<u-image src="/static/kingkong/near-icon.jpeg" width="320rpx" height="272rpx" />
						</view>
					</view>
					<view class="ml-8 grow w-full h-full flex flex-col">
						<!-- 企业查询 -->
						<view
							class="w-full h-full rounded-sm relative"
							@click="navigateTo('/pages/company/index')"
						>
							<view class="absolute inset-0 z-10 rounded-sm bg-primary bg-linear-near px-12 py-8">
								<view class="text-lg text-sky-600">企业查询</view>
								<view class="text-xs opacity-80">互联网/财税/物流</view>
							</view>
							<view class="w-full h-136 rounded-sm overflow-hidden text-right">
								<u-image src="/static/kingkong/business-icon.jpeg" width="308rpx" height="130rpx" radius="8" />
							</view>
						</view>
						<!-- 精准拓客 -->
						<view 
							class="mt-8 w-full h-full rounded-sm relative"
							@click="navigateTo('/pages/precise/index')"
						>
							<view class="absolute inset-0 z-10 rounded-sm bg-primary bg-linear-near px-12 py-8">
								<view class="text-lg text-sky-600">精准搜索</view>
								<view class="text-xs opacity-80">根据条件精准查询</view>
							</view>
							<view class="w-full h-136 rounded-sm overflow-hidden text-right">
								<u-image src="/static/kingkong/precision-icon.jpeg" width="308rpx" height="130rpx" radius="8" />
							</view>
						</view>
					</view>
				</view>
				<!-- banner -->
				<view class="mt-12">
					<u-swiper 
						:list="bannerList" 
						interval="5000" 
						circular 
						indicator 
						height="80" 
					/>
				</view>
				<!-- list -->
				<view>
					<view class="mt-8 sticky top-navbar flex items-center h-44 bg-gray-100 z-30">
						<view class="w-4 h-14 rounded-lg bg-primary" />
						<view class="ml-8 text-lg font-bold">热门推荐</view>
					</view>
					<z-paging 
						ref="paging" 
						v-model="hotList"
						use-page-scroll
						loading-more-default-as-loading
						@query="queryList"
					>
            <view 
							v-for="(item,index) in hotList" 
							:key="index"
						>
							<navigator
								:url="'/pages/promotion/detail?id='+item.id" 
								hover-class="none"
							>
							  <view class="w-full h-136 bg-white rounded-xs px-12 mb-8">
									<view class="flex py-12">
										<view class="shrink-0 w-100 h-75 rounded-sm">
											<u-image 
												:src="JSON.parse(item.images)[0]"
												width="200rpx" 
												height="150rpx" 
												radius="6" 
												:lazy-load="true"
											>
												<template v-slot:loading>
													<u-loading-icon />
												</template>
											</u-image>
										</view>
										<view class="ml-12 grow flex flex-col justify-between pb-1">
											<view class="line-2">
												<text class="px-6 py-1 bg-error text-white text-xs rounded-xs">{{ item.level }}</text>
												<text class="ml-8 text-lg">{{ item.title }}</text>
											</view>
											<view class="text-right text-xs">
												<text class="text-gray-500">{{ item.industryname }}</text>
												<text class="text-gray-300 px-6">|</text>
												<text class="text-gray-500">{{ item.inserttime }}</text>
											</view>
										</view>
									</view>
									<u-line color="#e5e7eb"/>
									<view class="w-full h-36 flex items-center">
										<view class="shrink-0">
											<u-avatar :src="item.userthumbnail" size="20" />
										</view>
										<view class="ml-6 text-gray-700 line-1 text-sm">{{ item.companyname }}</view>
										<view class="ml-auto text-xs text-gray-500">{{ item.looknum }}人浏览</view>
									</view>
								</view>
							</navigator>
            </view>
        	</z-paging>
				</view>
				<!-- 返回顶部 -->
				<u-back-top 
					:scroll-top="scrollTop"
					icon="arrow-up"
					:iconStyle="{color: '#ffffff'}" 
					customStyle="background:rgba(0,0,0,0.5)" 
				/>
			</view>
		</view>
	</view>
</template>

<script>
import ZPMixin from '@/uni_modules/z-paging/components/z-paging/js/z-paging-mixin'

export default {
	mixins: [ZPMixin],
	meta: {
    keepAlive: false
  },
	data() {
		return {
			headerOpacity: 0, // 导航栏透明度变量
			scrollTop: 0,
			bannerList: [ 'https://cdn.uviewui.com/uview/swiper/swiper2.png', 'https://cdn.uviewui.com/uview/swiper/swiper3.png'],
			userInfo: {
				name: '',
				thumbnail: '',
				mobile: '',
				isvip: 0
			},
			kingkongList: [],
			params: {},
			hotList: []
		}
	},
	computed: {
		headerStyle() {
			return {
				backgroundColor: `rgba(243,244,246,${this.headerOpacity})`
			}
		},
		searchStyle() {
			return {
				opacity: this.headerOpacity
			}
		}
	},
	onPageScroll(e) {
		this.scrollTop = e.scrollTop
		this.headerOpacity = e.scrollTop / 100
		if (this.headerOpacity > 1) {
			this.headerOpacity = 1
		}
	},
	onLoad(options) {
		this.getUserInfo()
	},
	onShow() {
		if(this.$refs.paging) {
			this.$refs.paging.refresh()
		}
	},
	methods: {
		async getUserInfo() {
			const res = await this.$api({ url: '/user/getMyInfo' })
			if(res.data.code !== 20000) uni.$u.toast(res.data.msg)
			if(res.data.code === 20000) Object.assign(this.userInfo, res.data.data)
		},
		async queryList(pageNo, pageSize) {
			const res = await this.$api({ url: '/open/tuiguang/getPage', data: { currentPage: pageNo, size: pageSize }})
			if(res.data.code === 20000) {
				this.$refs.paging.completeByTotal(res.data.data.records, res.data.data.total)
			} else {
				this.$refs.paging.complete(false)
			}
		},
		navigateTo(url) {
			if(!this.userInfo.isvip) {
				uni.showModal({
					title: '提示',
					content: '抱歉，当前功能只针对VIP用户开放，请开通VIP后再试',
					cancelText: '确定',
					confirmText: '现在开通',
					success: (res) => {
						if(res.confirm) {
							uni.navigateTo({
								url: '/pages/vip/index'
							})
						}
					}
				})
			} else {
				uni.navigateTo({
					url: url
				})	
			}
		}
	}
}
</script>

<style scoped>
.bg-top-1 {
	height: 20vh;
	background: rgb(60,156,255);
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 304 304' width='304' height='304'%3E%3Cpath fill='%2377b5f5' fill-opacity='0.25' d='M44.1 224a5 5 0 1 1 0 2H0v-2h44.1zm160 48a5 5 0 1 1 0 2H82v-2h122.1zm57.8-46a5 5 0 1 1 0-2H304v2h-42.1zm0 16a5 5 0 1 1 0-2H304v2h-42.1zm6.2-114a5 5 0 1 1 0 2h-86.2a5 5 0 1 1 0-2h86.2zm-256-48a5 5 0 1 1 0 2H0v-2h12.1zm185.8 34a5 5 0 1 1 0-2h86.2a5 5 0 1 1 0 2h-86.2zM258 12.1a5 5 0 1 1-2 0V0h2v12.1zm-64 208a5 5 0 1 1-2 0v-54.2a5 5 0 1 1 2 0v54.2zm48-198.2V80h62v2h-64V21.9a5 5 0 1 1 2 0zm16 16V64h46v2h-48V37.9a5 5 0 1 1 2 0zm-128 96V208h16v12.1a5 5 0 1 1-2 0V210h-16v-76.1a5 5 0 1 1 2 0zm-5.9-21.9a5 5 0 1 1 0 2H114v48H85.9a5 5 0 1 1 0-2H112v-48h12.1zm-6.2 130a5 5 0 1 1 0-2H176v-74.1a5 5 0 1 1 2 0V242h-60.1zm-16-64a5 5 0 1 1 0-2H114v48h10.1a5 5 0 1 1 0 2H112v-48h-10.1zM66 284.1a5 5 0 1 1-2 0V274H50v30h-2v-32h18v12.1zM236.1 176a5 5 0 1 1 0 2H226v94h48v32h-2v-30h-48v-98h12.1zm25.8-30a5 5 0 1 1 0-2H274v44.1a5 5 0 1 1-2 0V146h-10.1zm-64 96a5 5 0 1 1 0-2H208v-80h16v-14h-42.1a5 5 0 1 1 0-2H226v18h-16v80h-12.1zm86.2-210a5 5 0 1 1 0 2H272V0h2v32h10.1zM98 101.9V146H53.9a5 5 0 1 1 0-2H96v-42.1a5 5 0 1 1 2 0zM53.9 34a5 5 0 1 1 0-2H80V0h2v34H53.9zm60.1 3.9V66H82v64H69.9a5 5 0 1 1 0-2H80V64h32V37.9a5 5 0 1 1 2 0zM101.9 82a5 5 0 1 1 0-2H128V37.9a5 5 0 1 1 2 0V82h-28.1zm16-64a5 5 0 1 1 0-2H146v44.1a5 5 0 1 1-2 0V18h-26.1zm102.2 270a5 5 0 1 1 0 2H98v14h-2v-16h124.1zM242 149.9V160h16v34h-16v62h48v48h-2v-46h-48v-66h16v-30h-16v-12.1a5 5 0 1 1 2 0zM53.9 18a5 5 0 1 1 0-2H64V2H48V0h18v18H53.9zm112 32a5 5 0 1 1 0-2H192V0h50v2h-48v48h-28.1zm-48-48a5 5 0 0 1-9.8-2h2.07a3 3 0 1 0 5.66 0H178v34h-18V21.9a5 5 0 1 1 2 0V32h14V2h-58.1zm0 96a5 5 0 1 1 0-2H137l32-32h39V21.9a5 5 0 1 1 2 0V66h-40.17l-32 32H117.9zm28.1 90.1a5 5 0 1 1-2 0v-76.51L175.59 80H224V21.9a5 5 0 1 1 2 0V82h-49.59L146 112.41v75.69zm16 32a5 5 0 1 1-2 0v-99.51L184.59 96H300.1a5 5 0 0 1 3.9-3.9v2.07a3 3 0 0 0 0 5.66v2.07a5 5 0 0 1-3.9-3.9H185.41L162 121.41v98.69zm-144-64a5 5 0 1 1-2 0v-3.51l48-48V48h32V0h2v50H66v55.41l-48 48v2.69zM50 53.9v43.51l-48 48V208h26.1a5 5 0 1 1 0 2H0v-65.41l48-48V53.9a5 5 0 1 1 2 0zm-16 16V89.41l-34 34v-2.82l32-32V69.9a5 5 0 1 1 2 0zM12.1 32a5 5 0 1 1 0 2H9.41L0 43.41V40.6L8.59 32h3.51zm265.8 18a5 5 0 1 1 0-2h18.69l7.41-7.41v2.82L297.41 50H277.9zm-16 160a5 5 0 1 1 0-2H288v-71.41l16-16v2.82l-14 14V210h-28.1zm-208 32a5 5 0 1 1 0-2H64v-22.59L40.59 194H21.9a5 5 0 1 1 0-2H41.41L66 216.59V242H53.9zm150.2 14a5 5 0 1 1 0 2H96v-56.6L56.6 162H37.9a5 5 0 1 1 0-2h19.5L98 200.6V256h106.1zm-150.2 2a5 5 0 1 1 0-2H80v-46.59L48.59 178H21.9a5 5 0 1 1 0-2H49.41L82 208.59V258H53.9zM34 39.8v1.61L9.41 66H0v-2h8.59L32 40.59V0h2v39.8zM2 300.1a5 5 0 0 1 3.9 3.9H3.83A3 3 0 0 0 0 302.17V256h18v48h-2v-46H2v42.1zM34 241v63h-2v-62H0v-2h34v1zM17 18H0v-2h16V0h2v18h-1zm273-2h14v2h-16V0h2v16zm-32 273v15h-2v-14h-14v14h-2v-16h18v1zM0 92.1A5.02 5.02 0 0 1 6 97a5 5 0 0 1-6 4.9v-2.07a3 3 0 1 0 0-5.66V92.1zM80 272h2v32h-2v-32zm37.9 32h-2.07a3 3 0 0 0-5.66 0h-2.07a5 5 0 0 1 9.8 0zM5.9 0A5.02 5.02 0 0 1 0 5.9V3.83A3 3 0 0 0 3.83 0H5.9zm294.2 0h2.07A3 3 0 0 0 304 3.83V5.9a5 5 0 0 1-3.9-5.9zm3.9 300.1v2.07a3 3 0 0 0-1.83 1.83h-2.07a5 5 0 0 1 3.9-3.9zM97 100a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-48 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 96a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-144a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM49 36a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM33 68a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 240a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm80-176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm112 176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 180a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 84a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'%3E%3C/path%3E%3C/svg%3E");
}
.bg-top-2 {
	height: 25vh;
	margin-top: -1px;
	background: rgb(243,244,246);
	background: linear-gradient(180deg, rgba(60,156,255,1) 0%, rgba(60,156,255,0.6) 60%,  rgba(243,244,246,1) 100%)
}
.grid-text {
	font-size: 14px;
	color: #ffffff;
	padding: 10rpx 0 20rpx 0rpx;
	/* #ifndef APP-PLUS */
	box-sizing: border-box;
	/* #endif */
}
.bg-linear-near {
	background: linear-gradient(120deg, rgba(255,255,255,0.9) 0%, rgba(130,189,250,0.5) 100%);
}
.bg-linear-bussiness {
	background: linear-gradient(120deg, rgba(255,255,255,0.9) 0%, rgba(249,115,22,0.5) 100%);
}
.bg-linear-precision {
	background: linear-gradient(120deg, rgba(255,255,255,0.9) 0%, rgba(79,70,229,0.5) 100%);
}
</style>
