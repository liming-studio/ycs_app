<template>
  <view class="w-full relative px-16">
    <u-form
      ref="uForm"
      :model="form"
      :rules="rules"
      labelPosition="left"
      labelWidth="80"
    >
      <!-- 公司名称 -->
      <u-form-item label="公司名称：" borderBottom prop="companyname">
				<u-input 
          v-model="form.name" 
          border="none" 
          placeholder="请输入公司名称"
          clearable
        />
			</u-form-item>
      <!-- 联系方式 -->
      <u-form-item label="联系方式：" borderBottom prop="contact">
				<u-input 
          v-model="form.contact"
          type="number"
          border="none" 
          placeholder="请输入联系方式"
          clearable
        />
			</u-form-item>
      <!-- 推广标题 -->
      <u-form-item label="推广标题：" borderBottom prop="title">
				<u-input 
          v-model="form.title" 
          border="none" 
          placeholder="请输入推广标题"
          clearable
        />
			</u-form-item>
      <!-- 详细描述 -->
      <u-form-item label="详细描述：" borderBottom prop="content">
				<u-textarea 
          v-model="form.content" 
          placeholder="请输入详细描述"
          maxlength="150"
          count
          clearable
        />
			</u-form-item>
       <!-- 图片上传 -->
       <u-form-item label="图片上传：" borderBottom prop="images">
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
      <u-button type="primary" shape="circle"  @click="submit">提交</u-button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      fileList1: [],
      form: {
        companyname: '',    // 公司名称
        industryid: '',     // 行业id
        contact: '',        // 联系方式
        level: '',          // 推广级别
        title: '',          // 推广标题
        images: [],         // 图片
        content: ''         // 详细描述
      },
      rules: {
        'companyname': {
          type: 'string',
					required: true,
					message: '请填写公司名称',
					trigger: ['blur', 'change']
        }
      }
    }
  },
  methods: {
    // 删除图片
    deletePic(event) {
      this[`fileList${event.name}`].splice(event.index, 1)
    },
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
      console.log(res)
    },
    submit() {
			this.$refs.uForm.validate().then(res => {
				uni.$u.toast('校验通过')
			}).catch(errors => {
				uni.$u.toast('校验失败')
			})
		}
  }
}
</script>