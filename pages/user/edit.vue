<template>
  <view class="w-full relative p-16">
    <!-- loading -->
    <u-loading-page :loading="showLoading" />
    <!-- form -->
    <view v-if="!showLoading">
      <u-form
        ref="uForm"
        :model="form"
        labelPosition="left"
        labelWidth="120"
      >
        <!-- 头像 -->
        <u-form-item label="头像" borderBottom prop="thumbnail">
          <view class="flex">
            <u-upload
              :fileList="fileList1"
              @afterRead="afterRead"
              @delete="deletePic"
              name="1"
              multiple
              width="50"
              height="50"
              :maxCount="1"
            />
          </view>
        </u-form-item>
        <!-- 用户名 -->
        <u-form-item label="用户名" borderBottom prop="name">
          <u-input 
            v-model="form.name" 
            border="none" 
            placeholder="请填写用户名"
            clearable
          />
        </u-form-item>
        <!-- 联系方式 -->
        <!-- <u-form-item label="联系方式" borderBottom prop="mobile">
          <u-input 
            v-model="form.mobile"
            type="number"
            border="none" 
            placeholder="请填写您的联系方式"
            clearable
          />
        </u-form-item> -->
      </u-form>
      <view class="mt-48 flex justify-center">
        <view class="w-180">
          <u-button type="primary" shape="circle"  @click="submit">确认修改</u-button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      showLoading: true,
      fileList1: [],    // 头像
      form: {
        thumbnail: [],        // 头像
        name: '',             // 用户名
        // mobile: '',           // 联系方式
      }
    }
  },
  onLoad() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      const res = await this.$api({ url: '/user/getMyInfo' })
      if(res.data.code !== 20000) uni.$u.toast(res.data.msg)
      if(res.data.code === 20000) {
        this.fileList1 = res.data.data.thumbnail ? [{url: res.data.data.thumbnail}] : []
        this.form.thumbnail = res.data.data.thumbnail ? [res.data.data.thumbnail] : []
        this.form.name = res.data.data.name
        // this.form.mobile = res.data.mobile
      }
      setTimeout(() => this.showLoading = false, 200)
    },
     // 删除图片
     deletePic(event) {
      this[`fileList${event.name}`].splice(event.index, 1)
      this.form.thumbnail.splice(event.index, 1)
    },
    // 选择图片
		afterRead(event) {
      let lists = [].concat(event.file)
      let fileListLen = this[`fileList${event.name}`].length
      lists.map((item) => {
        this[`fileList${event.name}`].push({
          ...item,
          status: 'uploading',
          message: '上传中'
        })
      })
      for (let i = 0; i < lists.length; i++) {
        const result = this.uploadFilePromise(lists[i].url)
        let item = this[`fileList${event.name}`][fileListLen]
        this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
          status: 'success',
          message: '',
          url: result
        }))
        fileListLen++
      }
    },
    async uploadFilePromise(path) {
      const res = await this.$upload({url: '/open/addpic', filePath: path})
      let data = JSON.parse(res.data)
      if(data.code !== 20000) uni.$u.toast(data.msg)
      if(data.code === 20000) this.form.thumbnail.push(data.data)
    },
    // 提交
    async submit(data) {
      const res = await this.$api({ 
        url: '/user/updateThumbnail', 
        data: {
          thumbnail: this.form.thumbnail && this.form.thumbnail.length > 0 ? this.form.thumbnail[0] : '',      
          name:  this.form.name,   
        } 
      })
      uni.$u.toast(res.data.msg)
      uni.reLaunch({
        url: '/pages/user/index'
      })
    }
  }
}
</script>