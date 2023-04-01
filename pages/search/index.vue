<template>
  <view class="pt-statusbar relative">
    <!-- 搜索框部分 -->
    <view class="py-12 px-16">
      <u-search 
        placeholder="请输入关键字" 
        v-model="keyword"
        shape="square"
        actionText="取消"
        @custom="cancel"
        />
    </view>
    <!-- 最近搜索 -->
    <view class="mt-12 px-16">
      <view>最近搜索</view>
      <view class="mt-4 flex flex-wrap">
        <u-tag 
          v-for="tag in historyTags"
          :key="tag.id"
          :text="tag.text" 
          size="mini" 
          closable 
          bgColor="#f3f4f6"
          borderColor="#f3f4f6"
          color="#909193"
          :show="tag.show" 
        />
      </view>
    </view>
    <!-- 热门搜索 -->
    <view class="mt-32 px-16">
      <view>热门搜索</view>
      <view class="mt-4 flex flex-wrap">
        <u-tag 
          v-for="tag in hotTags"
          :key="tag.id"
          :text="tag.text" 
          size="mini" 
          closable 
          bgColor="#f3f4f6"
          borderColor="#f3f4f6"
          color="#909193"
          :show="tag.show" 
        />
      </view>
    </view>
  </view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
        historyTags: [
          {id: 1, show: true, text: '乐地健身'},
          {id: 2, show: true, text: '卢小师烤肉山庄'},
          {id: 3, show: true, text: '家家悦超市'},
          {id: 4, show: true, text: '金艺图文'},
          {id: 5, show: true, text: '卓一地产顾问有限公司'},
        ],
        hotTags: [
          {id: 1, show: true, text: '乐地健身'},
          {id: 2, show: true, text: '卢小师烤肉山庄'},
          {id: 3, show: true, text: '家家悦超市'},
          {id: 4, show: true, text: '金艺图文'},
          {id: 5, show: true, text: '卓一地产顾问有限公司'},
        ]
			}
		},
    methods: {
      cancel() {
        uni.navigateBack()
      }
    }
	}
</script>