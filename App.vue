<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// uni.getLocation({
			// 	type: 'wgs84',
			// 	success: function (res) {
			// 		console.log('当前位置的经度：' + res.longitude);
			// 		console.log('当前位置的纬度：' + res.latitude);
			// 	}
			// })
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";
	@import './styles/generate.scss';
	@import './styles/expand.scss';
	:not(not) { 
		box-sizing: border-box;
	}
	page {
		font-size: 14px;
		color: #303133;
	}
</style>
