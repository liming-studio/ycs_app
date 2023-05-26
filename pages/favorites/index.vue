<template>
  <view class="min-h-screen pt-navbar bg-gray-100">
    <u-navbar title="我的收藏" autoBack>
			<view slot="right">
				<u-button
          v-if="list.length > 0"
          :text="multiple ? '取消' : '批量操作'"
          shape="circle"
          size="small"
          @click="changeMultiple"
        />
			</view>
		</u-navbar>
    <u-loading-page :loading="showLoading" />
    <view v-if="!showLoading">
      <view 
        v-if="!list || list.length === 0"
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
        class="p-12"
        :class="multiple ? 'pb-48' : 'pb-4'"
      >
        <view 
          v-for="(item, index) in list"
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
                <view class="ml-4 text-lg" style="margin-top: -4px;">{{ item.name }}</view>
              </view>
              <view 
                v-if="item.phone" 
                class="mt-4 text-gray-500"
                :class="multiple ? 'ml-24' : 'ml-4'"
              >
                {{ item.phone }}
              </view>
            </view>
            <view class="mt-4 flex justify-end items-center">
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
              <!-- 删除 -->
              <view 
                class="ml-6"
                @click="cancelCollect(item.id)"  
              >
                <u-button 
                  type="error" 
                  text="取消收藏"
                  shape="circle"
                  size="small" 
                  plain
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
          <!-- <view>
            <u-button
              text="删除"
              type="error"
              shape="circle"
              :disabled="checkedList.length === 0"
              @click="cancelCollectAll" 
            />
          </view> -->
          <view class="ml-6">
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
</template>

<script>
import { throttle, cloneDeep } from 'lodash'
import BasePagination from '@/components/BasePagination.vue'

export default {
  components: {
    BasePagination
  },
  data() {
    return {
      showLoading: true,
      multiple: false, 
      list: [],
      checkedAll: false,
      checkedList: []
    }
  },
  onLoad() {
    this.getList()
  },
  methods: {
    async getList() {
      const res = await this.$api({ url: '/user/getCollectPage111' })
      if(res.data.code !== 20000) uni.$u.toast(res.data.msg)
      if(res.data.code === 20000) {
        this.list = res.data.data
        this.$nextTick(() => this.showLoading = false)
      }
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
      this.checkedList = this.checkedAll ? cloneDeep(this.list) : []
      this.$nextTick(() => uni.hideLoading())
    },
    // 切换子选项
    changeSubChecked(item) {
      if(this.multiple) {
        uni.showLoading({ title: '操作中' })
        if(!this.checkObjectInArray(this.checkedList, item).found) {
          this.checkedList.push(item)
          if(this.checkedList.length === this.list.length) this.checkedAll = true
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
    // 取消收藏（单条数据）
    cancelCollect: throttle(
      async function(id) {
        const res = await this.$api({ url: '/user/cancelCollect', data: {id: id}})
        if(res.data.code !== 20000) uni.$u.toast(res.data.msg)
        if(res.data.code === 20000) {
          uni.$u.toast('操作成功')
          this.showLoading = true
          this.getList()
        }
      }, 500, {
        leading: true,
        trailing: false
      }
    ),
    // 取消收藏（全部数据）
    // cancelCollectAll: throttle(
    //   async function(id) {
    //     const res = await this.$api({ 
    //       url: '/user/cancelCollectBatch', 
    //       data: {collids: this.checkedList.map(item => item.id)}
    //     })
    //     if(res.data.code !== 20000) uni.$u.toast(res.data.msg)
    //     if(res.data.code === 20000) {
    //       uni.$u.toast('操作成功')
    //       this.showLoading = true
    //       this.getList()
    //     }
    //   }, 500, {
    //     leading: true,
    //     trailing: false
    //   }
    // )

    // 导入通讯录
    addPhoneContact: throttle(
      function() {
        uni.showLoading({ title: '导入中' })
        let that = this
        this.checkedList.forEach((item, index) => {
          uni.addPhoneContact({
            nickName: '',
            lastName: `A-${item.name}`,
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
    )
  }
}
</script>