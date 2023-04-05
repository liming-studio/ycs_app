<template>
	<view class="w-full pt-navbar relative">
		<u-navbar
			:left-icon="active === 1 ? 'search' : ''"
			leftIconSize="28"
			@leftClick="toSearch"
		>
			<view slot="center">
				<div class="flex items-center">
					<view 
						v-for="item in navList"
						:key="item.id"
						:class="{
							'text-xl font-bold': item.id === active,
							'text-lg text-gray-500': item.id !== active
						}"
						@click="changeNav(item.id)"
					>
						<text class="px-8">{{ item.name }}</text>
					</view>
				</div>
			</view>
			<view slot="right">
				<u-button text="发布推广" shape="circle" size="small" @click="addPromote" />
			</view>
		</u-navbar>
		<!-- banner -->
		<view class="px-16 pb-8">
			<u-swiper 
				:list="bannerList"
				interval="5000" 
				circular 
				indicator 
				height="60" 
			/>
		</view>
		<u-gap height="8" bgColor="#f3f4f6"></u-gap>
		<!-- 推荐 -->
		<view v-if="active === 1">
			<view class="sticky top-navbar bg-white z-20 pb-4">
				<u-tabs 
					:list="tabs"
					activeStyle="font-size: 32rpx; font-weight: 700; color: #303133"
					inactiveStyle="color: #909193"
					@change="changeTabs"
				/>
			</view>
			<base-pagination 
				ref="paginationRef" 
				url="/open/tuiguang/getPage" 
				:params="params"
				:show-divider="false"
				ask
			>
				<template v-slot="{list}">
					<navigator 
						v-for="(item, index) in list"
						:key="index"
						:url="'/pages/promotion/detail?id='+item.id" 
						hover-class="none"
					>
						<view class="p-16">
							<view class="flex items-center">
								<view class="shrink-0 w-36 h-36 rounded-xs">
									<u-avatar :src="item.userthumbnail" size="36" />
								</view>
								<view class="ml-10 grow">
									<view class="flex items-center justify-between">
										<view class="text-base">{{ item.companyname }}</view>
										<view 
											v-if="item.level"
											class="px-6 py-1 bg-error text-white text-xs rounded-xs"
										>
											{{ item.level }}
										</view>
									</view>
									<view class="text-xs text-gray-500">{{ item.inserttime }}</view>
								</view>
							</view>
							<view class="mt-8">
								<view class="line-2 text-lg font-bold">{{ item.title }}</view>
								<view class="mt-8 text-base text-gray-700 line-3">{{ item.content }}</view>
								<view class="mt-8 flex">
									<view 
										v-for="(img, index) in JSON.parse(item.images)"
										:key="index"
										class="w-110 h-110 rounded-xs mr-8"
									>
										<u-image 
											:src="img" 
											width="220rpx" 
											height="220rpx" 
											radius="6"
											:lazy-load="true"
										>
											<template v-slot:loading>
												<u-loading-icon />
											</template>
										</u-image>
									</view>
								</view>
								<view class="mt-12 flex items-center">
									<u-icon name="tags" color="#909193" />
									<view class="ml-4 text-sm text-gray-500">{{ item.industryname }}</view>
									<view class="ml-auto text-sm text-gray-500">{{ item.looknum }}人浏览</view>
								</view>
							</view>
						</view>
						<u-line color="#e5e7eb" />
					</navigator>
				</template>
			</base-pagination>
		</view>
		<!-- 我的推广 -->
		<view v-if="active === 2">
			<base-pagination 
				ref="paginationRef" 
				url="/tuiguang/getMyPage"
				:show-divider="false"
				ask
			>
				<template v-slot="{list}">
					<navigator 
						v-for="(item, index) in list"
						:key="index"
						:url="'/pages/promotion/detail?id='+item.id" 
						hover-class="none"
					>
						<view class="p-16">
							<view class="flex items-center">
								<view class="shrink-0 w-36 h-36 rounded-xs">
									<u-avatar :src="item.userthumbnail" size="36" />
								</view>
								<view class="ml-10 grow">
									<view class="flex items-center justify-between">
										<view class="text-base">{{ item.companyname }}</view>
										<view 
											v-if="item.level"
											class="px-6 py-1 bg-error text-white text-xs rounded-xs"
										>
											{{ item.level }}
										</view>
									</view>
									<view class="text-xs text-gray-500">{{ item.inserttime }}</view>
								</view>
							</view>
							<view class="mt-8">
								<view class="line-2 text-lg font-bold">{{ item.title }}</view>
								<view class="mt-8 text-base text-gray-700 line-3">{{ item.content }}</view>
								<view class="mt-8 flex">
									<view 
										v-for="(img, index) in JSON.parse(item.images)"
										:key="index"
										class="w-110 h-110 rounded-xs mr-8"
									>
										<u-image 
											:src="img" 
											width="220rpx" 
											height="220rpx" 
											radius="6"
											:lazy-load="true"
										>
											<template v-slot:loading>
												<u-loading-icon />
											</template>
										</u-image>
									</view>
								</view>
								<view class="mt-12 flex items-center">
									<u-icon name="tags" color="#909193" />
									<view class="ml-4 text-sm text-gray-500">{{ item.industryname }}</view>
									<view class="ml-auto text-sm text-gray-500">{{ item.looknum }}人浏览</view>
								</view>
							</view>
						</view>
						<u-line color="#e5e7eb" />
					</navigator>
				</template>
			</base-pagination>
		</view>
	</view>
</template>

<script>
	import BasePagination from '@/components/BasePagination.vue'
	export default {
		components: {
			BasePagination
		},
		data() {
			return {
				params: {
					industryid: null
				},
				navList: [
					{ id: 1, name: '推荐' },
					{ id: 2, name: '我的推广' }
				],
				active: 1,
				bannerList: [
					'https://cdn.pixabay.com/photo/2015/07/17/22/43/student-849822__340.jpg',
					'https://cdn.pixabay.com/photo/2015/05/31/13/45/working-791849__340.jpg',
				],
				tabs: []
			}
		},
		onReachBottom() {
			this.$refs.paginationRef.addPage()
		},
		onLoad(options) {
			this.getTabs()
			if(uni.getStorageSync("promotionActive")) {
				this.active = uni.getStorageSync("promotionActive")
			}
			uni.setStorage({ key: 'promotionActive', data: 1 })
		},
		onShow() {
			// this.$nextTick(() => {
			// 	console.log(getCurrentPages())
			// 	uni.pageScrollTo({scrollTop: 0, duration: 0 })
			// 	this.$refs.paginationRef.askApi(false)
			// })
		},
		methods: {
			// 搜索
			toSearch() {
				if(this.active === 1) {
					uni.setStorage({ key: 'searchType', data: 'promotion' })
					uni.navigateTo({
						url: '/pages/search/index'
					})
				}
			},
			// 求换nav
			changeNav(id) {
				this.active = id
				uni.pageScrollTo({scrollTop: 0, duration: 0 })
			},
			// 发布推广
			addPromote() {
				uni.navigateTo({
					url: '/pages/promotion/add'
				})
			},
			// 获取tabs
			async getTabs() {
				const res = await this.$api({ url: '/open/industry/getList'})
				if(res.data.code !== 20000) uni.$u.toast(res.data.msg)
				if(res.data.code === 20000) this.tabs = [].concat([{ name: '全部分类', id: null }], res.data.data)
			},
			changeTabs({id}) {
				this.params.industryid = id
			}
		}
	}
</script>
