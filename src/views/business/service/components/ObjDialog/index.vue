<template>
  <el-dialog :title="titleMap[status]" :visible.sync="visible" :close-on-click-modal="false" @open="open" @close="$emit('update:show', false)">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="唯一标识" prop="sign">
        <el-input v-model="form.sign" />
      </el-form-item>
      <el-form-item label="所属项目" prop="project_id">
        <ProjectField :obj-id.sync="form.project_id" :regain.sync="regain" />
      </el-form-item>
      <el-form-item label="编程语言" prop="language_id">
        <LanguageField :obj-id.sync="form.language_id" :regain.sync="regain" />
      </el-form-item>
      <el-form-item label="框架" prop="frame_id">
        <FrameField :obj-id.sync="form.frame_id" :language-id="form.language_id" :regain.sync="regain" />
      </el-form-item>
      <el-form-item label="代码库" prop="gitlab_id">
        <GitlabProjectField :obj-id.sync="form.gitlab_id" :obj-name="filter.gitlab.keyword" />
      </el-form-item>
      <el-form-item
        label="备注"
        prop="remark"
      >
        <el-input
          v-model="form.remark"
          type="textarea"
          :rows="4"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="opObj">确定</el-button>
        <el-button @click="cancelDialog">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import ProjectField from '@/components/Field/ProjectField'
import LanguageField from '@/components/Field/LanguageField'
import GitlabProjectField from '@/components/Field/GitlabProjectField'
import FrameField from '@/components/Field/FrameField'
import {
  createServiceApi as createObjApi,
  updateServiceApi as updateObjApi,
  getServiceApi as getObjApi
} from '@/api/business/service'
export default {
  name: 'FormDialog',
  components: { ProjectField, LanguageField, FrameField, GitlabProjectField },
  props: {
    objId: {
      type: String,
      default: null
    },
    status: {
      required: true,
      type: String
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      visible: this.show,
      regain: false,
      titleMap: {
        create: '创建',
        update: '编辑'
      },
      filter: {
        gitlab: {
          keyword: ''
        }
      },
      form: {
        project_id: null,
        language_id: null,
        frame_id: null,
        gitlab_id: null,
        name: '',
        sign: '',
        remark: ''
      },
      rules: {
        project_id: [{ required: true, message: '请输入项目', trigger: 'change' }],
        language_id: [{ required: true, message: '请选择编程语言', trigger: 'change' }],
        frame_id: [{ required: true, message: '请选择框架', trigger: 'change' }],
        gitlab_id: [{ required: true, message: '请选择代码库', trigger: 'change' }],
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        sign: [{ required: true, message: '请输入标识', trigger: 'blur' }]
      }
    }
  },
  watch: {
    show: function() {
      this.visible = this.show
    }
  },
  methods: {
    open() {
      this.regain = true
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
      this.resetForm()
      if (this.status === 'update') {
        this.getObj()
      }
    },
    getObj() {
      this.loading = true
      const data = {
        obj_id: parseInt(this.objId)
      }
      getObjApi(data).then(resp => {
        if (resp.code === 0) {
          this.form = resp.data
          this.filter.gitlab.keyword = resp.data.gitlab.name
        }
        this.loading = false
      })
    },
    resetForm() {
      this.filter.gitlab.keyword = ''
      this.form.project_id = null
      this.form.language_id = null
      this.form.frame_id = null
      this.form.gitlab_id = null
      this.form.name = ''
      this.form.sign = ''
      this.form.remark = ''
    },
    cancelDialog() {
      this.$emit('update:show', false)
    },
    opObj() {
      if (this.status === 'create') {
        this.createObj()
      } else if (this.status === 'update') {
        this.updateObj()
      }
    },
    createObj() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          const data = this.form
          createObjApi(data).then(resp => {
            if (resp.code === 0) {
              this.$emit('update:show', false)
              this.$notify({
                message: '操作成功',
                type: 'success',
                duration: 2000
              })
              this.$emit('success')
            }
            this.loading = false
          })
        }
      })
    },
    updateObj() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          const data = this.form
          data['obj_id'] = parseInt(this.objId)
          updateObjApi(data).then(resp => {
            if (resp.code === 0) {
              this.$emit('update:show', false)
              this.$notify({
                message: '操作成功',
                type: 'success',
                duration: 2000
              })
              this.$emit('success')
            }
            this.loading = false
          })
        }
      })
    }
  }
}
</script>
