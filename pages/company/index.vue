<template>
  <view class="relative pb-72">
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
        <image src="/static/map/map3.png" class="w-280 h-240" />
        <view 
          class="mt-12 px-32 text-gray-500"
          style="text-indent: 32px"  
        >
          <view>数据资料，一网打进。</view>
          <view>掌握先机，快人一步。</view>
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
            <view class="leading-40 text-gray-700">{{ item.companyName }}</view>
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
          content: ''
        },
        list: [],
        showDefault: true
      }
    },
    onLoad() {
    },
    methods: {
      handleSearch: throttle(function(value) {
        uni.showLoading({ title: '采集中' })
        this.toSearch(value)
      }, 1500, {leading: true, trailing: false}),
      async toSearch(value) {
        const res = await this.$api({ url: '/map/getCompanyList',  data: this.params })
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
      }
    }
  }
</script>