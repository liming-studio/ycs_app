<template>
	<z-paging 
		ref="paging" 
		v-model="list"
		loading-more-default-as-loading
		auto-show-system-loading
		@query="queryList"
	>
		<view slot="top">
			<view class="pt-navbar">
				<u-navbar
					:left-icon="activeUrl === '/open/tuiguang/getPage' ? 'search' : ''"
					leftIconSize="28"
					@leftClick="toSearch"
				>
					<view slot="center">
						<div class="flex items-center">
							<view 
								v-for="item in navList"
								:key="item.url"
								:class="{
									'text-xl font-bold': item.url === activeUrl,
									'text-lg text-gray-500': item.url !== activeUrl
								}"
								@click="changeNav(item.url)"
							>
								<text class="px-8">{{ item.name }}</text>
							</view>
						</div>
					</view>
					<view slot="right">
						<u-button text="发布推广" shape="circle" size="small" @click="addPromote" />
					</view>
				</u-navbar>
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
				<!-- tab -->
				<view v-show="activeUrl === '/open/tuiguang/getPage'">
					<u-tabs 
						:list="tabs"
						activeStyle="font-size: 32rpx; font-weight: 700; color: #303133"
						inactiveStyle="color: #909193"
						@change="changeTabs"
					/>
				</view>
			</view>
		</view>
		<navigator 
			v-for="(item, index) in list"
			:key="index"
			:url="'/pages/promotion/detail?id='+item.id" 
			hover-class="none"
		>
			<!-- 推荐 card -->
			<view v-show="activeUrl === '/open/tuiguang/getPage'">
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
			</view>
			<!-- 我的推广 card -->
			<view 
				v-show="activeUrl === '/tuiguang/getMyPage'"
				class="px-12"
			>
				<view 
					class="w-full h-136 bg-white rounded-xs px-12 mt-12"
					style="box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)"	
				>
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
						<text class="text-gray-300 px-6">|</text>
						<view 
							class="flex items-center"
							@click.stop="removeItem(item.id)"
						>
							<u-icon name="trash" size="16" color="#909193" />
							<view class="text-xs text-gray-500">删除</view>
						</view>
					</view>
				</view>
			</view>
		</navigator>
	</z-paging>
</template>

<script>
import { pickBy } from 'lodash'
export default {
	data() {
		return {
			activeUrl: '/open/tuiguang/getPage',
			activeId: null,
			navList: [
				{ url: '/open/tuiguang/getPage', name: '推荐' },
				{ url: '/tuiguang/getMyPage', name: '我的推广' }
			],
			bannerList: [
				'https://cdn.pixabay.com/photo/2015/07/17/22/43/student-849822__340.jpg',
				'https://cdn.pixabay.com/photo/2015/05/31/13/45/working-791849__340.jpg',
			],
			tabs: [],
			list: []
		}
	},
	onLoad(options) {
		this.getTabs()
	},
	onShow() {
		if(this.$refs.paging) {
			this.$refs.paging.refresh()
		}
	},
	methods: {
		// 搜索
		toSearch() {
			if(this.activeUrl === '/open/tuiguang/getPage') {
				uni.setStorage({ key: 'searchType', data: 'promotion' })
				uni.navigateTo({ url: '/pages/search/index' })
			}
		},
		// 切换nav
		changeNav(url) {
			if(this.activeUrl !== url) {
				this.activeUrl = url
				if(url === '/tuiguang/getMyPage') this.activeId = null
				this.$refs.paging.reload()
			}
		},
		// 发布推广
		addPromote() {
			uni.navigateTo({ url: '/pages/promotion/add' })
		},
		// 获取tabs
		async getTabs() {
			const res = await this.$api({ url: '/open/industry/getList'})
			if(res.data.code !== 20000) uni.$u.toast(res.data.msg)
			if(res.data.code === 20000) this.tabs = [].concat([{ name: '全部分类', id: null }], res.data.data)
		},
		changeTabs({id}) {
			if(this.activeId !== id) {
				this.activeId = id
				this.$refs.paging.reload()
			}
		},
		// 获取列表数据
		async queryList(pageNo, pageSize) {
			let data = { currentPage: pageNo, size: pageSize, industryid: this.activeId }
			const res = await this.$api({ url: this.activeUrl, data: pickBy(data)})
			if(res.data.code === 20000) {
				this.$refs.paging.completeByTotal(res.data.data.records, res.data.data.total)
			} else {
				this.$refs.paging.complete(false)
			}
		},

		// 删除一条推广
		removeItem(id) {
			uni.showModal({
				title: '提示',
				content: '你确定要删除这条推广吗？',
				icon: 'fail',
				success: (res) => {
					if(res.confirm) this.remove(id)
				}
			})
		},
		async remove(id) {
			const res = await this.$api({ url: `/tuiguang/delete?id=${id}`})
			if(res.data.code !== 20000) uni.$u.toast(res.data.msg)
			if(res.data.code === 20000) {
				uni.$u.toast(res.data.msg)
				this.$refs.paging.refresh()
			}
		}
	}
}
</script>
