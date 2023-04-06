<template>
  <view class="relative pb-72">
    <view class="fixed w-full h-80 px-8 bg-white z-10">
      <view class="w-full h-44 flex items-center">
        <!-- 选择地区 -->
        <view class="shrink-0">
          <uni-data-picker
            v-model="params.region"
            :localdata="areaList" 
            placeholder="选择地址"
            :border="false"
            :map="{
              text: 'name',
              value: 'name'
            }"
            popup-title="请选择所在地区"
            @change="changeArea"
          />
        </view>
        <!-- 搜索 -->
        <u-search 
          v-model="params.content"
          placeholder="请输入搜索关键字"
          shape="square"
          @search="handleSearch"
          @custom="handleSearch"
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
        <image src="/static/map/map1.png" class="w-280 h-240" />
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
  export default {
    data() {
      return {
        params: {
          content: '',
          region: '',
        },
        areaList: [],
        list: [],
        showDefault: true
      }
    },
    onLoad() {
      this.getCityList()
    },
    methods: {
      async getCityList() {
        const res = await this.$api({ url: '/open/map/getCityList' })
        this.areaList = res.data.data
      },
      handleSearch: throttle(function(value) {
        uni.showLoading({ title: '采集中' })
        this.toSearch(value)
      }, 1500, {leading: true, trailing: false}),
      async toSearch(value) {
        const res = await this.$api({ url: '/map/getMapList',  data: this.params })
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
            uni.$u.toast(`采集结束，共${res.data.data.length}条数据`)
          }, 1000)
        }
      },
      toCustomer() {
        uni.reLaunch({
          url: '/pages/customer/index'
        })
      },
      changeArea() {
        
      }
    }
  }
</script>