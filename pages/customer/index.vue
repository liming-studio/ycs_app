<template>
	<view 
		class="w-full bg-gray-100 pt-navbar relative"
		:style="{minHeight: screenHeight + 'px'}"
	>
		<u-navbar
			title="客源管理"
			leftIcon=""
		>
			<view slot="right">
				<u-button text="清空" shape="circle" size="small" @click="clear" />
			</view>
		</u-navbar>
		<view>
			<view class="sticky top-navbar bg-white z-20 pb-4">
				<u-tabs 
					:list="tabs"
					itemStyle="padding: 8px 15px; height: 44px"
					activeStyle="font-size: 32rpx; font-weight: 700; color: #303133"
					inactiveStyle="color: #909193"
					@change="changeTabs"
				/>
			</view>
			<view class="p-12">
				<base-pagination 
					ref="paginationRef" 
					url="/history/getPage"
					:params="params"
					show-page-loading
				>
					<template v-slot="{list}">
						<navigator 
							v-for="(item, index) in list" 
							:key="index"
							:url="`/pages/customer/detail?id=${item.id}&type=${item.type}`"
							hover-class="none"
							class="w-full h-80 bg-white mb-8 rounded-xs p-16"
						>
							<view class="flex items-center">
								<view class="grow text-lg line-1">搜索条件：{{ item.title }}</view>
								<view 
									class="shrink-0 ml-8 px-4"
									@click.stop="removeItem(item.id)"
								>
									<u-icon name="trash" size="20" color="#909193" />
								</view>
							</view>
							<view class="mt-8 text-sm">
								<text class="text-primary">{{ item.type }}</text>
								<text class="text-gray-300 px-4">|</text>
								<text class="text-gray-500">{{ item.num }}条数据</text>
								<text class="text-gray-300 px-4">|</text>
								<text class="text-gray-500">{{ item.inserttime }}</text>
							</view>
						</navigator>
					</template>
				</base-pagination>
			</view>
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
				screenHeight: '',
				tabs: [
					{ name: '全部来源', id: -1 },
					{ name: '精准拓客', id: 0 },
					{ name: '附近拓客', id: 1},
					{ name: '企查拓客', id: 2 }
				],
				activeName: '全部来源',
				params: {
					type: -1
				}
			}
		},
		onLoad(options) {
			this.screenHeight = uni.getSystemInfoSync().windowHeight
		},
		onShow() {
			this.$nextTick(() => {
				uni.pageScrollTo({scrollTop: 0, duration: 0 })
				this.$refs.paginationRef.askApi(false)
			})
		},
		onReachBottom() {
			this.$refs.paginationRef.addPage()
		},
		methods: {
			changeTabs({name, id}) {
				this.activeName = name
				this.params.type = id
				uni.pageScrollTo({scrollTop: 0, duration: 0 })
			},
			clear() {
				uni.showModal({
					title: '提示',
					content: `你确定要清空${this.activeName}数据吗？`,
					icon: 'fail',
					success: (res) => {
						if(res.confirm) this.removeAll()
					}
				})
			},
			async removeItem(id) {
				const res = await this.$api({ url: '/history/delete', data: {id: id} })
				if(res.data.code !== 20000) uni.$u.toast(res.data.msg)
				if(res.data.code === 20000) {
					this.$refs.paginationRef.askApi(false)
					uni.$u.toast(res.data.msg)
        }
			},
			async removeAll() {
				const res = await this.$api({ url: '/history/deleteBatch', data: this.params })
				if(res.data.code !== 20000) uni.$u.toast(res.data.msg)
				if(res.data.code === 20000) {
					this.$refs.paginationRef.askApi(false)
					uni.$u.toast(res.data.msg)
        }
			}
		}
	}
</script>
