<template>
  <view class="pt-statusbar relative">
    <!-- 搜索框部分 -->
    <view class="py-12 px-16 flex items-center">
      <view class="px-2 mr-8" @click="back">
        <u-icon name="arrow-left" size="20" />
      </view>
      <u-search 
        placeholder="请输入关键字"
        showAction
        v-model="keyword"
        @search="toSearch"
        @custom="toSearch"
      />
    </view>
    <!-- 最近搜索 -->
    <view 
      v-if="isNonEmptyArray(historyTags)"
      class="p-16"
    >
      <view class="flex items-center justify-between">
        <view>最近搜索</view>
        <view class="px-2">
          <u-icon name="trash" color="#909193" size="20" />
        </view>
      </view>
      <view class="mt-8 py-4 flex flex-wrap">
        <u-tag 
          v-for="(tag, index) in historyTags"
          :key="index"
          :text="tag"
          bgColor="#f3f4f6"
          borderColor="#f3f4f6"
          color="#909193"
          class="mr-8 mb-8"
          @click="toSearch(tag)"
        />
      </view>
    </view>
    <!-- 热门搜索 -->
    <view class="p-16">
      <view>热门搜索</view>
      <view class="mt-8 py-4 flex flex-wrap">
        <u-tag 
          v-for="(tag, index) in hotTags"
          :key="index"
          :text="tag"  
          bgColor="#f3f4f6"
          borderColor="#f3f4f6"
          color="#909193"
          class="mr-8 mb-8"
          @click="toSearch(tag)"
        />
      </view>
    </view>
  </view>
</template>
<script>
  import { uniq } from 'lodash'
  import { isNonEmptyArray } from '@/utils/tool.js'
	export default {
		data() {
			return {
        isNonEmptyArray: isNonEmptyArray,
				keyword: '',
        searchType: '',
        historyTags: [],
        hotTags: ['五金制品', '门窗卫浴', '建材家具', '微商电商', '糖酒食品', '鞋包服饰', '金融保险']
			}
		},
    onShow() {
      this.searchType = uni.getStorageSync("searchType")
      this.historyTags = uniq(uni.getStorageSync(`${uni.getStorageSync("searchType")}History`)) || []
    },
    methods: {
      back() {
        uni.navigateBack()
      },
      toSearch(value) {
        if(this.searchType === 'promotion') {
          uni.setStorage({ key: 'promotionHistory', data: [].concat(value, this.historyTags) })
          uni.redirectTo({ url: `/pages/promotion/search?text=${value}` })
        }
      }
    }
	}
</script>