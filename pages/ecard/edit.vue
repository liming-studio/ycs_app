<template>
  <view class="w-full relative p-16">
    <!-- loading -->
    <u-loading-page :loading="showLoading" />
    <!-- content -->
    <view v-if="!showLoading">
      <u-form
        ref="uForm"
        :model="form"
        :rules="rules"
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
        <!-- 姓名 -->
        <u-form-item label="姓名" borderBottom prop="name">
          <u-input 
            v-model="form.name" 
            border="none" 
            placeholder="请填写姓名"
            clearable
          />
        </u-form-item>
        <!-- 联系方式 -->
        <u-form-item label="对外联系号码" borderBottom prop="mobile">
          <u-input 
            v-model="form.mobile"
            type="number"
            border="none" 
            placeholder="请填写您的对外联系号码"
            clearable
          />
        </u-form-item>
        <!-- 微信号 -->
        <u-form-item label="微信号" borderBottom prop="wechatcode">
          <u-input 
            v-model="form.wechatcode" 
            border="none" 
            placeholder="请填写您的微信号"
            clearable
          />
        </u-form-item>
        <!-- 职位 -->
        <u-form-item label="职位" borderBottom prop="position">
          <u-input 
            v-model="form.position" 
            border="none" 
            placeholder="请填写职位"
            clearable
          />
        </u-form-item>
        <!-- 公司名称 -->
        <u-form-item label="公司名称" borderBottom prop="companyname">
          <u-input 
            v-model="form.companyname" 
            border="none" 
            placeholder="请填写公司名称"
            clearable
          />
        </u-form-item>
        <!-- 主营业务 -->
        <u-form-item 
          label="主营业务" 
          borderBottom 
          prop="industryid" 
          @click="industry.show = true"
        >
          <u-input
            v-model="industry.selText"
            disabled
            disabledColor="#ffffff"
            placeholder="请选择主营业务"
            border="none"
          />
          <u-icon
            slot="right"
            name="arrow-right"
          />
        </u-form-item>
        <!-- 公司地址 -->
        <u-form-item label="公司地址" borderBottom prop="companyaddress">
          <u-input 
            v-model="form.companyaddress" 
            border="none" 
            placeholder="请填写公司地址"
            clearable
          />
        </u-form-item>
        <!-- 公司简介 -->
        <u-form-item label="公司简介" borderBottom prop="companycontent">
          <u-input 
            v-model="form.companycontent" 
            border="none" 
            placeholder="请填写公司简介"
            clearable
          />
        </u-form-item>
        <!-- 微信二维码 -->
        <u-form-item label="上传微信二维码" borderBottom prop="wechat">
          <view class="flex">
            <u-upload
              :fileList="fileList2"
              @afterRead="afterRead"
              @delete="deletePic"
              name="2"
              multiple
              :maxCount="1"
            />
          </view>
        </u-form-item>
      </u-form>
      <view class="mt-48">
        <u-button type="primary" shape="circle"  @click="submit">提交</u-button>
      </view>
      <u-picker 
        :show="industry.show" 
        :columns="industry.list"
        keyName="name"
        @cancel="industry.show = false"
        @confirm="confirmIndustry"
      />
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        showLoading: true,
        fileList1: [],    // 头像
        fileList2: [],
        industry: {
          show: false,
          list: [],
          selText: ''
        },
        form: {
          thumbnail: [],        // 头像
          name: '',             // 姓名
          mobile: '',           // 对外联系号码
          wechatcode: '',       // 微信号
          position: '',         // 职位
          companyaddress: '',   // 公司地址
          companycontent: '',   // 公司简介
          companyname: '',      // 公司名称
          industryid: '',       // 主营业务
          wechat: [],           // 上传微信二维码
        },
        rules: {
          'thumbnail': {
            type: 'array',
            required: true,
            message: '请上传头像',
            trigger: ['blur', 'change']
          },
          'name': {
            type: 'string',
            required: true,
            message: '请输入姓名',
            trigger: ['blur', 'change']
          },
          'mobile': {
            type: 'string',
            required: true,
            message: '请输入对外联系号码',
            trigger: ['blur', 'change']
          },
          'companyname': {
            type: 'string',
            required: true,
            message: '请输入公司名称',
            trigger: ['blur', 'change']
          },
          'industryid': {
            type: 'number',
            required: true,
            message: '请选择公司主营业务',
            trigger: ['blur', 'change']
          }
        }
      }
    },
    onLoad(options) {
      this.getIndustryList()
      this.getDetail()
    },
    methods: {
      // 获取详情信息
      async getDetail() {
        const res = await this.$api({ url: '/card/getDetail' })
        if(res.data.code !== 20000) uni.$u.toast(res.data.msg)
        if(res.data.code === 20000) {
          this.fileList1 = [{ url: JSON.parse(res.data.data.thumbnail)[0] }]
          this.fileList2 = [{ url: JSON.parse(res.data.data.wechat)[0] }]
          this.form.thumbnail = JSON.parse(res.data.data.thumbnail)
          this.form.name = res.data.data.name
          this.form.mobile = res.data.data.mobile
          this.form.wechatcode = res.data.data.wechatcode
          this.form.position = res.data.data.position
          this.form.companyaddress = res.data.data.companyaddress
          this.form.companycontent = res.data.data.companycontent
          this.form.companyname = res.data.data.companyname
          this.form.industryid = res.data.data.industryid
          this.industry.selText = res.data.data.industry
          this.form.wechat = JSON.parse(res.data.data.wechat)
        }
        setTimeout(() => this.showLoading = false, 100)
      },
      // 获取所有行业
      async getIndustryList() {
        const res = await this.$api({ url: '/open/industry/getList'})
        if(res.data.code !== 20000) uni.$u.toast(res.data.msg)
        if(res.data.code === 20000) this.industry.list = [res.data.data]
      },
      // 选择行业
      confirmIndustry({value}) {
        this.industry.selText = value[0].name
        this.form.industryid = value[0].id
        this.industry.show = false
      },
      // 删除图片
      deletePic(event) {
        console.log(event)
        this[`fileList${event.name}`].splice(event.index, 1)
        if(event.name === '1') this.form.thumbnail.splice(event.index, 1)
        if(event.name === '2') this.form.wechat.splice(event.index, 1)
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
          const result = this.uploadFilePromise(lists[i].url, event.name)
          let item = this[`fileList${event.name}`][fileListLen]
          this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
            status: 'success',
            message: '',
            url: result
          }))
          fileListLen++
        }
      },
      async uploadFilePromise(path, name) {
        const res = await this.$upload({url: '/open/addpic', filePath: path})
        let data = JSON.parse(res.data)
        if(data.code !== 20000) uni.$u.toast(data.msg)
        if(data.code === 20000) {
          if(name === '1') this.form.thumbnail.push(data.data)
          if(name === '2') this.form.wechat.push(data.data)
        }
      },
      // 提交
      submit() {
        this.$refs.uForm.validate().then(res => {
          this.edit({            
            thumbnail: JSON.stringify(this.form.thumbnail),      
            name:  this.form.name,           
            mobile: this.form.mobile,          
            wechatcode: this.form.wechatcode,      
            position: this.form.position,       
            companyaddress: this.form.companyaddress,
            companycontent: this.form.companycontent,
            companyname: this.form.companyname,    
            industryid: this.form.industryid,   
            wechat: JSON.stringify(this.form.wechat),     
          })
        }).catch(errors => {
          uni.$u.toast('填写信息不完整')
        })
      },
      async edit(data) {
        const res = await this.$api({ method: 'POST', url: '/card/updateCard', data: data })
        uni.$u.toast(res.data.msg)
        uni.setStorage({ key: 'promotionActive', data: 2 }) // 1推荐 2我的推广
        uni.reLaunch({
          url: '/pages/ecard/index'
        })
      }
    },
  }
</script>