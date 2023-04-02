<template>
	<view class="w-full pt-navbar relative">
		<u-navbar
			left-icon="search"
			leftIconSize="28"
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
		<view v-show="active === 1">
			<view class="sticky top-navbar bg-white z-20 pb-4">
				<u-tabs 
					:list="tabs"
					activeStyle="font-size: 32rpx; font-weight: 700; color: #303133"
					inactiveStyle="color: #909193"
				/>
			</view>
			<view 
				v-for="i in 10" 
				:key="i"
			>
				<view class="p-16">
					<view class="flex items-center">
						<view class="shrink-0 w-36 h-36 rounded-xs">
							<u-image src="https://cdn.pixabay.com/photo/2021/11/12/03/04/woman-6787784__340.png" width="72rpx" height="72rpx" radius="8" />
						</view>
						<view class="ml-10 grow">
							<view class="flex items-center justify-between">
								<view class="text-base">{{ testObj.companyname }}</view>
								<view class="px-6 py-1 bg-error text-white text-xs rounded-xs">置顶</view>
							</view>
							<view class="text-xs text-gray-500">2023-04-13 09:18:12</view>
						</view>
					</view>
					<view class="mt-8">
						<view class="line-2 text-lg font-bold">{{ testObj.title }}</view>
						<view class="mt-8 text-base text-gray-700 line-3">{{ testObj.contact }}</view>
						<view class="mt-8 flex justify-between">
							<view 
								v-for="(img, index) in testObj.images"
								:key="index"
								class="w-110 h-110 rounded-xs"
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
							<view class="ml-4 text-sm text-gray-500">糖酒食品</view>
							<view class="ml-auto text-sm text-gray-500">2399人浏览</view>
						</view>
					</view>
				</view>
				<u-line color="#e5e7eb" />
			</view>
		</view>
		<!-- 我的推广 -->
		<view v-show="active === 2">
			<view 
				v-for="i in 10" 
				:key="i"
			>
				<view class="p-16">
					<view class="flex items-center">
						<view class="shrink-0 w-36 h-36 rounded-xs">
							<u-image src="https://cdn.pixabay.com/photo/2021/11/12/03/04/woman-6787784__340.png" width="72rpx" height="72rpx" radius="8" />
						</view>
						<view class="ml-10 grow">
							<view class="flex items-center justify-between">
								<view class="text-base">{{ testObj.companyname }}</view>
								<view class="px-6 py-1 bg-error text-white text-xs rounded-xs">置顶</view>
							</view>
							<view class="text-xs text-gray-500">2023-04-13 09:18:12</view>
						</view>
					</view>
					<view class="mt-8">
						<view class="line-2 text-lg font-bold">{{ testObj.title }}</view>
						<view class="mt-8 text-base text-gray-700 line-3">{{ testObj.contact }}</view>
						<view class="mt-8 flex justify-between">
							<view 
								v-for="(img, index) in testObj.images"
								:key="index"
								class="w-110 h-110 rounded-xs"
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
							<view class="ml-4 text-sm text-gray-500">糖酒食品</view>
							<view class="ml-auto text-sm text-gray-500">2399人浏览</view>
						</view>
					</view>
				</view>
				<u-line color="#e5e7eb" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navList: [
					{ id: 1, name: '推荐' },
					{ id: 2, name: '我的推广' }
				],
				active: 1,
				bannerList: [
					'https://cdn.pixabay.com/photo/2015/07/17/22/43/student-849822__340.jpg',
					'https://cdn.pixabay.com/photo/2015/05/31/13/45/working-791849__340.jpg',
				],
				tabs: [
					{ name: '全部分类' },
					{ name: '五金制品' },
					{ name: '门窗卫浴' },
					{ name: '建材家具' },
					{ name: '微商电商' },
					{ name: '糖酒食品' },
					{ name: '鞋包服饰' },
					{ name: '金融保险' },
					{ name: '教育培训' },
					{ name: '招商加盟' },
					{ name: '招商加盟' }
				],
				testObj: {
					companyname: '防忽悠防诈骗智商实在是有限公司',
					title: '惊爆！超级食物竟然能让你长寿200岁！',
					images: [
						'https://cdn.pixabay.com/photo/2018/07/24/21/47/pear-3560106__340.jpg',
						'https://cdn.pixabay.com/photo/2016/11/06/23/31/breakfast-1804457__340.jpg',
						'https://cdn.pixabay.com/photo/2016/03/23/15/00/ice-cream-1274894__340.jpg'
					],
					contact: '近日，一项惊人的研究揭示了一个极具魅力的发现：一种名为“长寿之果”的超级食物可能会让人类寿命翻倍，让你活到200岁！据研究人员介绍，这种神奇的果实是在偏远的热带丛林中发现的，历经多年的实验研究和验证，其富含各种营养成分和抗氧化物质，能够帮助人类延缓衰老和提高免疫力。更为惊人的是，长期食用这种果实的人类实验对象，实际上显示出了令人难以置信的寿命增长。',
				}
			}
		},
		onLoad(options) {
			
		},
		methods: {
			// 求换nav
			changeNav(id) {
				this.active = id
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0
				})
			},
			// 发布推广
			addPromote() {
				uni.navigateTo({
					url: '/pages/promotion/add'
				})
			}
		}
	}
</script>
