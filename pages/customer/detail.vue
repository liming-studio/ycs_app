<template>
  <view class="min-h-screen pt-navbar bg-gray-100">
    <u-navbar title="客源管理" autoBack>
			<view slot="right">
				<u-button
          v-if="message.num > 0 && message.type !== '企查拓客'"
          :text="multiple ? '取消' : '批量操作'"
          shape="circle"
          size="small"
          @click="changeMultiple"
        />
			</view>
		</u-navbar>
    <u-loading-page :loading="showLoading" />
    <view v-if="!showLoading">
      <view class="sticky top-navbar z-10">
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
      </view>
      <view 
        v-if="message.num === 0"
        class="flex-center" 
      >
        <u-empty
          mode="car"
          icon="http://cdn.uviewui.com/uview/empty/list.png"
          text="列表为空"
          style="height: 70vh" 
        />
      </view>
      <view 
        v-else
        :class="multiple ? 'pb-48' : 'pb-4'"
      >
        <view class="p-10">
          <view
            v-for="(item, index) in JSON.parse(message.content)"
            :key="index"
            class="w-full bg-white rounded-xs mb-8"
            style="box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05)"
          >
            <view class="pt-14 px-10 pb-6">
              <view @click="changeSubChecked(item)">
                <view class="flex">
                  <!-- 选择 -->
                  <view 
                    v-show="multiple"
                    class="w-18 h-18 rounded-2xl mr-4 border-1"
                    :class="{
                      'border-blue-700 bg-blue-700 flex-center': checkObjectInArray(checkedList, item).found,
                      'border-gray-300': !checkObjectInArray(checkedList, item).found
                    }"
                  >
                    <u-icon 
                      v-show="checkObjectInArray(checkedList, item).found" 
                      name="checkbox-mark" 
                      color="#ffffff" 
                      size="13"
                    />
                  </view>
                  <view 
                    class="ml-4 text-lg" 
                    style="margin-top: -4px"
                  >
                    {{ message.type === '企查拓客' ? item.companyName : item.name }}
                  </view>
                </view>
                <view 
                  v-if="item.phone" 
                  class="mt-4 text-gray-500"
                  :class="multiple ? 'ml-24' : 'ml-4'"
                >
                  {{ item.phone }}
                </view>
              </view>
              <view class="pl-24 flex justify-end items-center">
                <!-- 加微信 -->
                <view 
                  v-if="item.phone"
                  class="ml-auto"
                  @click="addWeChat(item.phone)"
                >
                  <u-button 
                    icon="weixin-fill" 
                    color="#04BE02"
                    text="加微信"
                    shape="circle"
                    size="small" 
                    plain
                  />
                </view>
                <!-- 打电话 -->
                <view 
                  v-if="item.phone"
                  class="ml-6"
                  @click="call(item.phone)"
                >
                  <u-button 
                    type="primary" 
                    icon="phone" 
                    text="打电话"
                    shape="circle"
                    size="small" 
                    plain
                  />
                </view>
                <!-- 收藏 -->
                <view v-if="message.type !== '企查拓客'" class="ml-6">
                  <u-button 
                    type="warning" 
                    text="收藏"
                    shape="circle"
                    size="small"
                    plain
                    @click="addCollected(item)"
                  />
                </view>
                <!-- 查看详情 -->
                <view v-if="message.type === '企查拓客'" class="mt-8">
                  <u-button 
                    type="primary" 
                    text="查看详情"
                    shape="circle"
                    size="small"
                    plain
                    @click="toCompanyDetail(item)"
                  />
                </view>
              </view>
            </view>
            <u-line color="#e5e7eb" />
            <view class="px-10 py-8 text-xs flex items-start">
              <u-icon name="map" color="#909193" class="mt-1" />
              <view class="ml-1 text-gray-500">{{ item.address }}</view>
            </view>
          </view>
        </view>
        <!-- 底部 -->
        <view 
          v-show="multiple"
          class="fixed bottom-0 inset-x-0 w-full h-50 bg-white flex items-center pl-20 pr-12"
          style="box-shadow: 1px 0 0 1px rgb(0 0 0 / 0.1), 1px 1px 0 1px rgb(0 0 0 / 0.1)"  
        >
          <!-- 全选 -->
          <view 
            class="flex-center"
            @click="checkedAllChange"
          >
            <view
              class="w-18 h-18 rounded-2xl mr-4 border-1"
              :class="{
                'border-blue-700 bg-blue-700 flex-center': checkedAll,
                'border-gray-300': !checkedAll
              }"
            >
              <u-icon 
                v-show="checkedAll" 
                name="checkbox-mark" 
                color="#ffffff" 
                size="13"
              />
            </view>
            <view class="ml-2">全选</view>
          </view>
          <view class="grow flex items-center justify-end">
            <view>
              <u-button
                text="导入通讯录"
                type="primary"
                shape="circle"
                :disabled="checkedList.length === 0"
                @click="addPhoneContact" 
              />
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { throttle } from 'lodash'

export default {
  onLoad(options) {
    this.pageType = options.type
    this.getDetail(options.id)
  },
  data() {
    return {
      pageType: '',
      showLoading: true,
      multiple: false,
      message: {
        id: null, 
        title: '',
        content: '',
        num: null,
        region: '',
        type: ''
      },
      checkedAll: false,
      checkedList: []
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
    // 切换多选状态
    changeMultiple() {
      this.checkedList = []
      this.multiple = !this.multiple
    },
    // 全选
    checkedAllChange() {
      uni.showLoading({ title: '操作中' })
      this.checkedAll = !this.checkedAll
      this.checkedList = this.checkedAll ? JSON.parse(this.message.content) : []
      this.$nextTick(() => uni.hideLoading())
    },
    // 切换子选项
    changeSubChecked(item) {
      if(this.multiple) {
        uni.showLoading({ title: '操作中' })
        if(!this.checkObjectInArray(this.checkedList, item).found) {
          this.checkedList.push(item)
          if(this.checkedList.length === JSON.parse(this.message.content).length) this.checkedAll = true
        } else {
          this.checkedList.splice(this.checkObjectInArray(this.checkedList, item).index, 1)
          this.checkedAll = false
        }
        this.$nextTick(() => uni.hideLoading())
      }
    },
    // 判断子选项状态
    checkObjectInArray(arr, obj) {
      const index = arr.findIndex((item) => {
        return JSON.stringify(item) === JSON.stringify(obj)
      })
      if (index !== -1) {
        return { found: true, index }
      } else {
        return { found: false, index: -1 }
      }
    },
    // 加微信（复制电话号码）
    addWeChat(code) {
      uni.setClipboardData({
        data: code,
        showToast: false,
        success: function () {
          uni.showToast({
            icon:'none',
            title: '复制成功，去微信添加吧'
          })
        }
      })
    },
    // 打电话
    call(phoneNum) {
      uni.makePhoneCall({
        phoneNumber: phoneNum
      })
    },
    // 添加收藏
    addCollected: throttle(
      async function(item) {
        const res = await this.$api({ 
          method: 'POST', 
          url: '/user/addCollect', 
          data: {
            name: item.name, 
            phone: item.phone, 
            address: item.address
          } 
        })
        uni.$u.toast(res.data.msg)
      }, 500, {
        leading: true,
        trailing: false
      }
    ),
    // 导入通讯录
    addPhoneContact: throttle(
      function() {
        uni.showLoading({ title: '导入中' })
        let that = this
        this.checkedList.forEach((item, index) => {
          uni.addPhoneContact({
            nickName: '',
            lastName: `A-${that.message.type === '企查拓客' ? item.companyName : item.name}`,
            firstName: '@云畅搜',
            remark: '',
            mobilePhoneNumber: item.phone,
            weChatNumber: '',
            success: function () {
              if(index === that.checkedList.length - 1) {
                that.multiple = false
                uni.hideLoading()
                uni.showToast({
                  title: '导入成功',
                })
              }
            },
            fail: function () {
              uni.hideLoading()
              console.log('fail');
            }
          })
        })
      }, 500, {
        leading: true,
        trailing: false
      }
    ),
    // 企查详情
    toCompanyDetail(data) {
      uni.setStorage({ key: 'companyDetail', data: data })
      uni.navigateTo({
         url: '/pages/company/detail'
      })
    }
  },
}
</script>