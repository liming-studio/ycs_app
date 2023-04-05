<template>
  <view class="relative pb-72">
    <view class="fixed w-full h-80 px-8 bg-white z-10">
      <view class="w-full h-44 flex items-center">
        <!-- 搜索 -->
        <u-search 
          v-model="params.content"
          placeholder="请输入搜索关键字"
          shape="square"
          @search="toSearch"
          @custom="toSearch"
        />
      </view>
      <view class="w-full h-36 flex items-center px-8">
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
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        params: {
          content: '',
          latitude: '',
          longitude	: ''
        },
        list: [],
        showDefault: true
      }
    },
    onLoad() {
      this.getPosition()
    },
    methods: {
      getPosition() {
        let that = this
        uni.getLocation({
          type: 'wgs84',
          success: function (res) {
            that.params.latitude = res.latitude
            that.params.longitude = res.longitude
            uni.setStorage({ key: 'pos', data: {lat: res.latitude, long: res.longitude}})
          }
        })
      },
      async toSearch(value) {
        const res = await this.$api({ url: '/map/getNearByList',  data: this.params })
        console.log(res)
      }
    }
  }
</script>