<template>
  <view class="min-h-screen bg-gray-100">
    <u-loading-page :loading="showLoading" />
    <view v-if="!showLoading">
      <u-sticky>
        <view 
          class="py-8 px-16 text-sm bg-white z-10"
          style="box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)"
        >
          <text class="text-gray-500">搜索条件：</text>
          <text class="text-primary">{{ message.title }}</text>
          <text class="text-gray-500">，共搜出</text>
          <text class="text-primary px-2">{{ message.num }}</text>
          <text class="text-gray-500">条客源数据</text>
        </view>
      </u-sticky>
      <view 
        v-if="message.num > 0"
        class="pb-44"
      >
        <u-checkbox-group
          v-model="checkboxArr"
          placement="column"
          shape="circle"
          class="py-8 px-6"
          @change="checkboxChange"
        >
          <view
            v-for="(item, index) in JSON.parse(message.content)"
            :key="index"
            class="w-full bg-white rounded-xs mb-8"
            style="box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05)"
          >
            <view class="pt-12 px-10 pb-4">
              <u-checkbox 
                :name="item" 
                :label="message.type === '企查拓客' ? item.companyName : item.name" 
              />
              <view class="mt-4 pl-24 flex justify-end items-center">
                <view class="mt-8 text-gray-500">{{ item.phone }}</view>
                <!-- 打电话 -->
                <view 
                  v-if="item.phone"
                  class="ml-auto"
                  @click="call(item.phone)"
                >
                  <u-button 
                    type="primary" 
                    icon="phone" 
                    text="打电话"
                    shape="circle"
                    size="mini" 
                    plain
                  />
                </view>
                <!-- 收藏 -->
                <view class="ml-6">
                  <u-button 
                    type="warning" 
                    :text="item.collected ? '已收藏' : '收藏'"
                    :plain="item.collected ? false : true"
                    shape="circle"
                    size="mini"
                    @click="changeCollected(item)"
                  />
                </view>
              </view>
            </view>
            <u-line color="#e5e7eb" />
            <view class="px-10 py-6 text-xs flex items-start">
              <u-icon name="map" color="#909193" class="mt-1" />
              <view class="ml-1 text-gray-500">{{ item.address }}</view>
            </view>
          </view>
        </u-checkbox-group>
        <!-- 底部 -->
        <view 
          class="fixed bottom-0 inset-x-0 w-full h-50 bg-white flex items-center pl-16 pr-12"
          style="box-shadow: 1px 0 0 1px rgb(0 0 0 / 0.1), 1px 1px 0 1px rgb(0 0 0 / 0.1)"  
        >
          <u-checkbox-group>
            <u-checkbox v-model="checkedAll" shape="circle" label="全选" />
          </u-checkbox-group>
          <view class="grow flex items-center justify-end">
            <view>
              <u-button text="导入通讯录" type="primary" shape="circle" />
            </view>
          </view>
        </view>
      </view>
      <view 
        v-else 
        class="flex-center" 
      >
        <u-empty
          mode="car"
          icon="http://cdn.uviewui.com/uview/empty/list.png"
          text="列表为空"
          style="height: 70vh" 
        />
      </view>
    </view>
  </view>
</template>

<script>
export default {
  onLoad(options) {
    this.getDetail(options.id)
  },
  data() {
    return {
      showLoading: true,
      message: {
        id: null, 
        title: '',
        content: '',
        num: null,
        region: '',
        type: ''
      },
      checkboxArr: [],
      checkedAll: false
    }
  },
  methods: {
    // 获取详情数据
    async getDetail(id) {
      const res = await this.$api({ url: '/history/getDetail', data: {id: id} })
      if(res.data.code !== 20000) uni.$u.toast(res.data.msg)
      if(res.data.code === 20000) Object.assign(this.message, res.data.data)
      this.$nextTick(() => this.showLoading = false)
      // setTimeout(() => this.showLoading = false, 200)
    },
    // 打电话
    call(phoneNum) {
      uni.makePhoneCall({
        phoneNumber: phoneNum //仅为示例
      })
    },
    // 选中状态变化
    checkboxChange(val) {
      console.log(val)
    },
    // 收藏
    changeCollected({collected, name, phone, address}) {
      if(!collected) this.addCollected({name, phone, address})
      if(collected) this.cancelCollected({name, phone, address})
    },
    // 添加收藏
    async addCollected(data) {
      const res = await this.$api({ method: 'POST', url: '/user/addCollect', data: data })
      if(res.data.code !== 20000) uni.$u.toast(res.data.msg)
      if(res.data.code === 20000) this.getDetail(this.message.id)
    },
    // 取消收藏
  },
}
</script>