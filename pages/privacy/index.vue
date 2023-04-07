<template>
	<view>
		<web-view src="http://www.jnysqc.com:8080/open/ystk"/>
	</view>
</template>

<script>
var wv //计划创建的webview
export default {
	onReady() {
		// #ifdef APP-PLUS
		var currentWebview = this.$scope.$getAppWebview() //此对象相当于html5plus里的plus.webview.currentWebview()。在uni-app里vue页面直接使用plus.webview.currentWebview()无效
		setTimeout(function() {
			wv = currentWebview.children()[0]
			wv.setStyle({
        top:10,
        width: 375,
        height:300,
      })
		}, 1000); // 如果是页面初始化调用时，需要延时一下
		// #endif
	}
}
</script>