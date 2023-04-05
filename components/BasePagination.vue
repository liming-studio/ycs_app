<template>
	<view>
		<view v-show="!showLoading">
			<slot :list="localList" />
		</view>
		<view v-if="!showLoading && !finished && localList.length > 0" class="p-4">
			<u-loading-icon text="加载中,请稍后~" size="16" textSize="14"  />
		</view>
		<view 
			v-show="finished && localList.length > 0" 
			class="p-16"
		>
			<view v-if="showDivider">
				<u-divider text="已经到底了" />
			</view>
			<view v-else class="text-center text-gray-300">
				已经到底了
			</view>
		</view>
		<view 
			v-if="localList.length === 0 && !showLoading" 
			class="flex flex-col" 
			style="margin-top: 100rpx"
		>
			<u-empty
				mode="data"
				icon="http://cdn.uviewui.com/uview/empty/data.png"
				width="480rpx"
				height="480rpx"
				textSize="32rpx"
				text=" "
			/>
			<view class="text-gray-300 text-center">暂无数据</view>
		</view>
	</view>
</template>

<script>
	import { pickBy } from 'lodash'
	export default {
		name: "BasePagination",
		props: {
			url: {
				type: String,
				required: true
			},
			showDivider: {
				type: Boolean,
				default: true
			},
			params: {
				type: Object,
				default: () => {}
			},
			size: {
				type: Number,
				default: 10
			},
			// 是否初次加载时直接获取数据
			ask: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				showLoading: true,
				finished: false,
				currentPage: 1,
				localList: []
			};
		},
		mounted() {
			if(this.ask) this.askApi(false)
		},
		methods: {
			async askApi(more = true) {
				const newParams = {}
				if (!more) this.currentPage = 1
				Object.assign(newParams, this.params, { currentPage: this.currentPage, size: this.size })	
				const res = await this.$api({ url: this.url, data: pickBy(newParams)})
				if(more) this.localList.push(...res.data.data.records)
				if(!more) this.localList = res.data.data.records
				if (res.data.data.current * res.data.data.size >= res.data.data.total) {
					this.finished = true
				}
				this.showLoading = false
			},
			addPage() {
				if(!this.finished) {
					console.log('aa')
					this.currentPage++
					this.askApi()
				}
			}
		},
		watch: {
			params: {
				handler(item,index) {
					this.finished = false
					this.showLoading = true
					this.askApi(false)
				},
				deep: true // 深度监听父组件传过来对象变化
			}
		}
	}
</script>
