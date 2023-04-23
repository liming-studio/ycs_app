<script>
	export default {
		onLaunch: function() {
			// #ifdef APP-PLUS
			if(!uni.getStorageSync('phone') || !uni.getStorageSync('password')) {
				uni.reLaunch({
					url:"/pages/login/index",
					success:() => {
						plus.navigator.closeSplashscreen() //跳转完页面后再关闭启动页
					}
				})
			} else {
				plus.navigator.closeSplashscreen()
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
