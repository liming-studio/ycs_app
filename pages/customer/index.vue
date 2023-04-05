<template>
	<view class="w-full min-h-screen bg-gray-100 pt-navbar relative">
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
					ask
				>
					<template v-slot="{list}">
						<navigator 
							v-for="(item, index) in list" 
							:key="index"
							:url="'/pages/customer/detail?id='+item.id" 
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
								<text class="text-gray-500">30条数据</text>
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
				tabs: [
					{ name: '全部来源' },
					{ name: '精准拓客' },
					{ name: '附近拓客' },
					{ name: '企查拓客' }
				],
			}
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
			changeTabs(id) {
				this.active = id
				uni.pageScrollTo({scrollTop: 0, duration: 0 })
			},
			clear() {
				uni.showModal({
					title: '提示',
					content: '你确定要清空客源管理数据吗？',
					icon: 'fail',
					success: () => {
						this.removeAll()
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
				const res = await this.$api({ url: '/history/deleteBatch' })
				if(res.data.code !== 20000) uni.$u.toast(res.data.msg)
				if(res.data.code === 20000) {
					this.$refs.paginationRef.askApi(false)
					uni.$u.toast(res.data.msg)
        }
			}
		}
	}
</script>
