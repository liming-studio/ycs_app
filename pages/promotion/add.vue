<template>
  <view class="w-full relative px-16">
    <!-- loading -->
    <u-loading-page :loading="showLoading" />
    <!-- content -->
    <view v-if="!showLoading">
      <u-form
        ref="uForm"
        :model="form"
        :rules="rules"
        labelPosition="left"
        labelWidth="79"
      >
        <!-- 公司名称 -->
        <u-form-item label="公司名称" borderBottom prop="companyname">
          <u-input 
            v-model="form.companyname" 
            border="none" 
            placeholder="请输入公司名称"
            clearable
          />
        </u-form-item>
        <!-- 联系方式 -->
        <u-form-item label="联系方式" borderBottom prop="contact">
          <u-input 
            v-model="form.contact"
            type="number"
            border="none" 
            placeholder="请输入您的联系方式"
            maxlength="11"
            clearable
          />
        </u-form-item>
        <!-- 推广标题 -->
        <u-form-item label="推广标题" borderBottom prop="title">
          <u-input 
            v-model="form.title" 
            border="none" 
            placeholder="请输入推广标题(最多20个字)"
            maxlength="20"
            clearable
          />
        </u-form-item>
        <!-- 选择行业 -->
        <u-form-item 
          label="选择行业" borderBottom 
          prop="industryid" 
          @click="industry.show = true"
        >
          <u-input
            v-model="industry.selText"
            disabled
            disabledColor="#ffffff"
            placeholder="请选择行业"
            border="none"
          />
          <u-icon
            slot="right"
            name="arrow-right"
          />
        </u-form-item>
        <!-- 详细描述 -->
        <u-form-item label="详细描述" borderBottom prop="content">
          <u-textarea 
            v-model="form.content" 
            placeholder="请输入详细描述"
            maxlength="150"
            count
            clearable
          />
        </u-form-item>
        <!-- 图片上传 -->
        <u-form-item label="图片上传" borderBottom prop="images">
          <u-upload
            :fileList="fileList1"
            @afterRead="afterRead"
            @delete="deletePic"
            name="1"
            multiple
            :maxCount="3"
          />
        </u-form-item>
      </u-form>
      <view class="mt-48">
        <u-button 
          type="primary" 
          shape="circle"
          :disabled="btnDisabled"
          @click="submit"
        >
          提交
        </u-button>
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
import { throttle } from 'lodash'

export default {
  data() {
    return {
      showLoading: true,
      fileList1: [],
      btnDisabled: false,
      industry: {
        show: false,
        list: [],
        selText: ''
      },
      form: {
        companyname: '',    // 公司名称
        contact: '',        // 联系方式
        industryid: '',     // 行业id
        title: '',          // 推广标题
        images: [],         // 图片
        content: '',        // 详细描述
        level: ''           // 推广级别
      },
      rules: {
        'companyname': {
          type: 'string',
					required: true,
					message: '请填写公司名称',
          trigger: ['blur', 'change']
        },
        'contact': [
          {
            required: true, 
            message: '请输入手机号',
            trigger: ['change','blur'],
          },
          {
            // 自定义验证函数，见上说明
            validator: (rule, value, callback) => {
              return uni.$u.test.mobile(value);
            },
            message: '手机号码不正确',
            trigger: ['change','blur'],
          }
        ],
        'title': {
          type: 'string',
          required: true,
          message: '请填写推广标题',
          trigger: ['blur', 'change']
        },
        'industryid': {
          type: 'number',
          required: true,
          message: '请选择所属行业',
          trigger: ['blur', 'change']
        },
        'content': {
          type: 'string',
          required: true,
          message: '请填写详细描述信息',
          trigger: ['blur', 'change']
        },
        'images': {
          validator: (rule, value, callback) => {
            return uni.$u.test.array(value) && value.length > 0
          },
          message: '至少上传一张图片',
          trigger: ['blur', 'change']
        }
      }
    }
  },
  onLoad() {
    this.getIndustryList()
  },
  methods: {
    // 获取所有行业
    async getIndustryList() {
      const res = await this.$api({ url: '/open/industry/getList'})
      if(res.data.code !== 20000) uni.$u.toast(res.data.msg)
      if(res.data.code === 20000) this.industry.list = [res.data.data]
      this.$nextTick(() => this.showLoading = false)
      // setTimeout(() => this.showLoading = false, 100)
    },
    // 选择行业
    confirmIndustry({value}) {
      this.industry.selText = value[0].name
      this.form.industryid = value[0].id
      this.industry.show = false
      this.$refs.uForm.validateField('industryid')
    },
    // 删除图片
    deletePic(event) {
      console.log(event)
      this[`fileList${event.name}`].splice(event.index, 1)
      this.form.images.splice(event.index, 1)
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
      this.btnDisabled = true
      const res = await this.$upload({url: '/open/addpic', filePath: path})
      let data = JSON.parse(res.data)
      if(data.code !== 20000) uni.$u.toast(data.msg)
      if(data.code === 20000) this.form.images.push(data.data)
      this.$nextTick(() => {
        this.$refs.uForm.validateField('images')
        this.btnDisabled = false
      })
    },
    // 提交
    submit: throttle(function() {
      this.$refs.uForm.validate().then(res => {
        uni.showLoading({ title: '上传中' })
        this.add({
          companyname: this.form.companyname,
          contact: this.form.contact,    
          industryid: this.form.industryid, 
          title: this.form.title,      
          images: JSON.stringify(this.form.images),   
          content: this.form.content,    
          level: this.form.level     
        })
			}).catch(errors => {
        uni.hideLoading()
				uni.$u.toast('填写信息不完整')
			})
    }, 500, {
      leading: true, 
      trailing: false
    }),
    async add(data) {
      const res = await this.$api({ url: '/tuiguang/add', data: data })
      uni.hideLoading()
      uni.$u.toast(res.data.msg)
      if(res.data.code === 20000) {
        this.$nextTick(() => {
          uni.navigateBack({ delta: 1 })
        })
      }
    }
  }
}
</script>