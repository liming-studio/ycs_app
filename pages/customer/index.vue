<template> 
	<z-paging 
		ref="paging" 
		v-model="list"
		loading-more-default-as-loading
		auto-show-system-loading
		:paging-style="{'background-color':'#f3f4f6'}"
		@query="queryList"
	>
		<view slot="top">
			<view class="pt-navbar">
				<u-navbar
					title="客源管理"
					leftIcon=""
				>
					<view slot="right">
						<u-button text="清空" shape="circle" size="small" @click="clear" />
					</view>
				</u-navbar>
				<view class="bg-white pb-4">
					<u-tabs 
						:list="tabs"
						itemStyle="padding: 8px 15px; height: 44px"
						activeStyle="font-size: 32rpx; font-weight: 700; color: #303133"
						inactiveStyle="color: #909193"
						@change="changeTabs"
					/>
				</view>
			</view>
		</view>
		<view class="px-10 pt-10">
			<navigator 
				v-for="(item, index) in list" 
				:key="index"
				:url="`/pages/customer/detail?id=${item.id}&type=${item.type}`"
				class="w-full h-80 bg-white mb-8 rounded-xs p-16"
				hover-class="none"
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
		</view>
	</z-paging>
</template>

<script>
import { pickBy } from 'lodash'
export default {
	data() {
		return {
			tabs: [
				{ name: '全部来源', id: -1 },
				{ name: '精准拓客', id: 0 },
				{ name: '附近拓客', id: 1},
				{ name: '企查拓客', id: 2 }
			],
			tabId: -1,
			activeName: '全部来源',
			list: [],
		}
	},
	onShow() {
		if(this.$refs.paging) {
			this.$refs.paging.refresh()
		}
	},
	methods: {
		changeTabs({name, id}) {
			this.activeName = name
			this.tabId = id
			this.$refs.paging.refresh()
		},
		// 获取列表数据
		async queryList(pageNo, pageSize) {
			let data = { currentPage: pageNo, size: pageSize, type: this.tabId }
			const res = await this.$api({ url: '/history/getPage', data: pickBy(data)})
			if(res.data.code === 20000) {
				this.$refs.paging.completeByTotal(res.data.data.records, res.data.data.total)
			} else {
				this.$refs.paging.complete(false)
			}
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
				this.$refs.paging.refresh()
				uni.$u.toast(res.data.msg)
			}
		},
		async removeAll() {
			const res = await this.$api({ url: '/history/deleteBatch', data: { type: this.tabId } })
			if(res.data.code !== 20000) uni.$u.toast(res.data.msg)
			if(res.data.code === 20000) {
				this.$refs.paging.refresh()
				uni.$u.toast(res.data.msg)
			}
		}
	}
}
</script>
