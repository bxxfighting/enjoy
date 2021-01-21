<template>
  <el-dialog :title="titleMap[status]" :visible.sync="visible" :close-on-click-modal="false" @open="open" @close="$emit('update:show', false)">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="端口号" prop="port">
        <el-input v-model="form.port" style="width: 200px" />
      </el-form-item>
      <el-form-item label="解析类型" prop="dns_typ">
        <DnsTypField :value.sync="form.dns_typ" />
      </el-form-item>
      <el-form-item label="制品类型" prop="artifact_typ">
        <ArtifactTypField :value.sync="form.artifact_typ" />
      </el-form-item>
      <el-form-item label="部署类型" prop="deploy_typ">
        <DeployTypField :value.sync="form.deploy_typ" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="opObj">确定</el-button>
        <el-button @click="cancelDialog">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import DnsTypField from '../DnsTypField'
import ArtifactTypField from '../ArtifactTypField'
import DeployTypField from '../DeployTypField'
import {
  updateServiceConfigApi as updateObjApi,
  getServiceConfigApi as getObjApi
} from '@/api/business/service'
export default {
  name: 'FormDialog',
  components: { DnsTypField, ArtifactTypField, DeployTypField },
  props: {
    objId: {
      required: true,
      type: Number
    },
    environmentId: {
      required: true,
      type: Number
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
      },
      form: {
        port: '',
        dns_typ: '',
        artifact_typ: '',
        deploy_typ: ''
      },
      rules: {
        port: [{ required: true, message: '请输入端口号', trigger: 'blur' }],
        dns_typ: [{ required: true, message: '请选择解析类型', trigger: 'change' }],
        artifact_typ: [{ required: true, message: '请选择制品类型', trigger: 'change' }],
        deploy_typ: [{ required: true, message: '请选择部署类型', trigger: 'change' }]
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
        obj_id: this.objId,
        environment_id: this.environmentId
      }
      getObjApi(data).then(resp => {
        if (resp.code === 0) {
          this.form = resp.data
        }
        this.loading = false
      })
    },
    resetForm() {
      this.form.port = ''
      this.form.dns_typ = ''
      this.form.artifact_typ = ''
      this.form.deploy_typ = ''
    },
    cancelDialog() {
      this.$emit('update:show', false)
    },
    opObj() {
      if (this.status === 'update') {
        this.updateObj()
      }
    },
    updateObj() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          const data = this.form
          data['obj_id'] = parseInt(this.objId)
          data['environment_id'] = parseInt(this.environmentId)
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
