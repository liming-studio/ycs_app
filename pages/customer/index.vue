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
				/>
			</view>
			<view class="p-12">
				<view 
					v-for="i in 12" 
					:key="i"
					class="w-full h-80 bg-white mb-8 rounded-xs p-16"
				>
					<view class="flex items-center">
						<view class="grow text-lg line-1">搜索条件：精神卫生保健院</view>
						<view class="shrink-0 ml-8 px-4">
							<u-icon name="trash" size="20" color="#909193" />
						</view>
					</view>
					<view class="mt-8 text-sm">
						<text class="text-primary">精准拓客</text>
						<text class="text-gray-300 px-4">|</text>
						<text class="text-gray-500">30条数据</text>
						<text class="text-gray-300 px-4">|</text>
						<text class="text-gray-500">2023-04-12 12:34:08</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
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
		onLoad() {

		},
		methods: {
			clear() {

			}
		}
	}
</script>
