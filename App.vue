<script>
	export default {
		onLaunch: function() {
			// #ifdef APP-PLUS
			let token = uni.getStorageSync('token')
			if(token) plus.navigator.closeSplashscreen()
			if(!token) {
				uni.relaunch({
					url: "/pages/login/index",
					success: () => {
						plus.navigator.closeSplashscreen();
					}
				})
			}
			// #endif
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
