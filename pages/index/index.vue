<template>
	<view class="w-full min-h-screen bg-gray-100 relative">
		<view class="absolute w-full curved" />
		<!-- content -->
		<view class="pt-statusbar px-16 relative">
			<!-- title -->
			<view class="flex items-center justify-between py-8">
				<view class="text-xl text-white">云畅搜</view>
				<view>
					<u-button 
						icon="level"
						color="linear-gradient(0deg, #F0AF5B 0%, #F9DFAF 100%)" 
						shape="circle"
						icon-color="#613e10"
						size="mini"
					>
						<text style="color: #613e10">开通会员</text>
					</u-button>
				</view>
			</view>
			<!-- search -->
			<view class="w-full h-36 rounded-xl bg-white flex items-center px-14">
				<u-icon name="search" size="20" color="#909193" />
				<view class="ml-8 text-gray-300">查公司</view>
			</view>
			<!-- swiper -->
			<view class="mt-12">
				<u-swiper
					:list="bannerList"
					keyName="pic"
					circular
    		/>
			</view>
			<!-- kingkong -->
			<view class="mt-12 w-full bg-white rounded-sm py-4">
				<u-grid  :border="false" col="4">
					<u-grid-item
						v-for="(item,index) in kingkongList"
						:key="index"
					>
						<image :src="item.icon" class="w-35 h-35" />
						<text class="grid-text">{{item.name}}</text>
					</u-grid-item>
				</u-grid>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bannerList: [],
				kingkongList: []
			}
		},
		onLoad() {
			this.getBannerList()
			this.getKingKong()
		},
		methods: {
			async getBannerList() {
				const res = await this.$api({ url: '/open/index/getBanner' })
				if(res.data.code !== 20000) uni.$u.toast(res.data.msg)
				if(res.data.code === 20000) this.bannerList = res.data.data
			},
			async getKingKong() {
				const res = await this.$api({ url: '/open/index/getKingKong' })
				if(res.data.code !== 20000) uni.$u.toast(res.data.msg)
				if(res.data.code === 20000) this.kingkongList = res.data.data
			},
		}
	}
</script>

<style>
/* .bg-top {
	background: rgb(36,143,254);
	background: linear-gradient(180deg, rgba(60,156,255,0.3) 0%, rgba(60,156,255,0.25) 20%, rgba(79,166,255,0.2) 40%, rgba(132,192,255,0.15) 70%, rgba(255,255,255,1) 100%);
} */
.curved {
	height: 32vh;
	background-color: #3c9cff;
}
.curved::after {
  content: '';
  border-top-left-radius: 60% 100%;
  border-top-right-radius: 60% 100%;
  position: absolute;
  bottom: 0;
  width: 100%;
  background: #f3f4f6;
  height: 20%;
}
.grid-text {
	font-size: 14px;
	color: #909399;
	padding: 10rpx 0 20rpx 0rpx;
	/* #ifndef APP-PLUS */
	box-sizing: border-box;
	/* #endif */
}
</style>
