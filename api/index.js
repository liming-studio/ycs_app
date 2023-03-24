const BASE_URL = 'https://www.jnysqc.com/'

 export const api = (options) => {
 	const header_tmp = {
 		"Authorization": uni.getStorageSync("token"),
 		'Content-Type': options.contentType || 'application/json'
 	}
 	return new Promise((resolve, reject) => {
 		uni.request({
 			url: BASE_URL + options.url,
 			method: options.method || 'GET',
 			data: options.data || {},
 			header: header_tmp,
 			success: (res) => {
 				if (res.data.code === 20002) {
          uni.clearStorageSync()
 					uni.showModal({
 						title: '登录时效已过期，请重新登录',
 						icon: 'fail',
 						showCancel: false,
 						success: () => {
 							uni.navigateTo({
 								url: '/pages/login/login'
 							})
 						}
 					})
 				} else {
 					resolve(res)
 				}
 			},
 			fail: (err) => {
 				reject(err)
 			}
 		})
 	})
 }
