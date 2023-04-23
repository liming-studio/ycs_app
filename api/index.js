const BASE_URL = 'https://www.jnysqc.com'
// const BASE_URL = 'https://192.168.1.149'

export const api = (options) => {
 	return new Promise((resolve, reject) => {
 		uni.request({
 			url: BASE_URL + options.url,
 			method: options.method || 'GET',
 			data: options.data || {},
 			header: {
				"Authorization": uni.getStorageSync("token"),
 				'Content-Type': options.contentType || 'application/json'
			},
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

// 必须是post请求
export const upload = (options) => {
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: BASE_URL + options.url,
			filePath: options.filePath,
			name: 'file',
			header: {
			 "Authorization": uni.getStorageSync("token"),
			// 'Content-Type': options.contentType || 'application/json'
		 },
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
