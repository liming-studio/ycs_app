<template>
  <view>
    <u-loading-page :loading="showLoading" />
    <view v-if="!showLoading" class="relative pb-72">
      <view class="fixed w-full h-80 px-16 bg-white z-10">
        <view class="w-full h-44 flex items-center">
          <!-- 搜索 -->
          <u-search 
            v-model="params.content"
            placeholder="请输入搜索关键字"
            shape="square"
            @search="handleSearch"
            @custom="handleSearch"
          />
        </view>
        <view class="w-full h-36 flex items-center">
          <text class="text-gray-500">共检索信息</text>
          <text class="text-primary px-4 font-bold">{{ list.length }}</text>
          <text class="text-gray-500">条</text>
          <text 
            v-if="list.length > 0" 
            class="text-gray-500"
          >
            ，请前往客源管理查看
          </text>
        </view>
      </view>
      <view class="pt-80 px-16">
        <view 
          v-if="showDefault"
          class="flex flex-col items-center justify-center"
          style="height: 70vh"
        >
          <image src="/static/map/map2.png" class="w-280 h-220" />
          <view 
            class="mt-12 px-32 text-gray-500"
            style="text-indent: 32px"  
          >
            数据来源于高德地图、百度地图、腾讯地图、搜狗地图、谷歌地图、360地图、凯立德地图7大地图数据全覆盖。
          </view>
        </view>
        <view v-else>
          <view 
            v-if="list.length === 0"
            class="flex flex-col items-center justify-center"
            style="height: 70vh"
          >
            <u-empty
              mode="search"
              icon="http://cdn.uviewui.com/uview/empty/search.png"
              width="450rpx"
              height="450rpx"
              textSize="28rpx"
              text="检索数据为空"
            />
          </view>
          <view v-if="list.length > 0">
            <view 
              v-for="(item, index) in list"
              :key="index"
            >
              <view class="leading-40 text-gray-700">{{ item.name }}</view>
              <u-line v-if="list.length - 1 !== index" color="#e5e7eb"/>
              <u-divider v-else text="已经到底了" />
            </view>
          </view>
        </view>
      </view>
    </view>
    <view
      v-if="!showDefault && list.length > 0"
      class="fixed bottom-0 w-full h-70 flex items-center px-16 bg-white z-10"
    >
      <u-button 
        type="primary" 
        shape="circle"  
        @click="toCustomer"
      >
        客源管理
      </u-button>
    </view>
  </view>
</template>

<script>
  import { throttle } from 'lodash'
  import Gps from '@/uni_modules/json-gps/js_sdk/gps.js';
  const gps = new Gps()

  export default {
    data() {
      return {
        showLoading: false,
        params: {
          content: '',
          latitude: '',
          longitude	: ''
        },
        list: [],
        showDefault: true
      }
    },
    async onShow() {
      uni.showLoading({title:"获取定位中"})
      // #ifdef APP-PLUS
      let location = await gps.getLocation()
      if(location){
        this.params.latitude = location.latitude + ''
        this.params.longitude = location.longitude + ''
      }
      // #endif
      uni.hideLoading()
      this.openGPS()
    },
    methods: {
      getPosition() {
        let that = this
        uni.getLocation({
          type: 'wgs84',
          success: function (res) {
            that.params.latitude = Math.abs(res.latitude)
            that.params.longitude = Math.abs(res.longitude)
            uni.setStorage({ key: 'pos', data: {lat: Math.abs(res.latitude), long: Math.abs(res.longitude)}})
          },
          fail: () => {
          },
          complete: function() {
            setTimeout(() => {
              that.showLoading = false
            }, 200)
          }
        })
      },
      handleSearch: throttle(
        function(value) {
          if(!this.params.latitude || !this.params.longitude) {
            this.openGPS()
            return
          }
          uni.showLoading({ title: '采集中' })
          this.toSearch(value)
        }, 1500, {
          leading: true, 
          trailing: false
        }
      ),
      openGPS() {
        // 定位开启状态 true=开启，false=未开启
        let bool = false
        
        // android平台
        if (uni.getSystemInfoSync().platform == 'android') {
          var context = plus.android.importClass("android.content.Context")
          var locationManager = plus.android.importClass("android.location.LocationManager")
          var main = plus.android.runtimeMainActivity();
          var mainSvr = main.getSystemService(context.LOCATION_SERVICE)
          bool = mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER)
        }
        
        // ios平台
        if (uni.getSystemInfoSync().platform == 'ios') {
          var cllocationManger = plus.ios.import("CLLocationManager");
          var enable = cllocationManger.locationServicesEnabled();
          var status = cllocationManger.authorizationStatus();
          plus.ios.deleteObject(cllocationManger);
          bool = enable && status != 2
        }
        
        // 未开启定位功能
        if (bool === false) {
          uni.showModal({
            title: '提示',
            content: '请打开定位服务',
            success: ({
              confirm,
              cancel
            }) => {
              if (confirm) {
                // android平台
                if (uni.getSystemInfoSync().platform == 'android') {
                  var Intent = plus.android.importClass('android.content.Intent');
                  var Settings = plus.android.importClass('android.provider.Settings');
                  var intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
                  var main = plus.android.runtimeMainActivity();
                  main.startActivity(intent); // 打开系统设置GPS服务页面
                }
        
                // ios平台
                if (uni.getSystemInfoSync().platform == 'ios') {
                  var UIApplication = plus.ios.import("UIApplication");
                  var application2 = UIApplication.sharedApplication();
                  var NSURL2 = plus.ios.import("NSURL");
                  var setting2 = NSURL2.URLWithString("App-Prefs:root=Privacy&path=LOCATION");
                  application2.openURL(setting2);
                  plus.ios.deleteObject(setting2);
                  plus.ios.deleteObject(NSURL2);
                  plus.ios.deleteObject(application2);
                }
              }
              // 用户取消前往开启定位服务
              if (cancel) {
                // do sth...
              }
            }
          });
        }
      },
      async toSearch(value) {
        const res = await this.$api({ url: '/map/getNearByList',  data: this.params })
        if(res.data.code !== 20000) {
          setTimeout(() => {
            uni.hideLoading()
            uni.$u.toast(res.data.msg)
          }, 1000)
        }
        if(res.data.code === 20000) {
          setTimeout(() => {
            this.showDefault = false
            this.list = res.data.data
            uni.hideLoading()
            uni.$u.toast(`采集结束，共为您找到${res.data.data.length}条数据`)
          }, 1000)
        }
      },
      toCustomer() {
        uni.reLaunch({
          url: '/pages/customer/index'
        })
      }
    }
  }
</script>