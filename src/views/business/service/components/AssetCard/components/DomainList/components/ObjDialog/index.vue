<template>
  <el-dialog :title="titleMap[status]" :visible.sync="visible" :close-on-click-modal="false" @open="open" @close="$emit('update:show', false)">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="域名" prop="domain">
        <DomainField :obj-id.sync="form.asset_obj_id" :regain.sync="regain" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="opObj">确定</el-button>
        <el-button @click="cancelDialog">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import {
  createServiceDomainApi as createObjApi
} from '@/api/business/service'
import DomainField from '@/components/Field/DomainField'
export default {
  name: 'FormDialog',
  components: { DomainField },
  props: {
    serviceId: {
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
      form: {
        obj_id: this.serviceId,
        environment_id: this.environmentId,
        typ: 'domain',
        asset_obj_id: null
      },
      rules: {
        asset_obj_id: [{ required: true, message: '请选择域名', trigger: 'change' }]
      }
    }
  },
  watch: {
    show: function() {
      this.visible = this.show
    },
    serviceId: function() {
      this.form.obj_id = this.serviceId
    },
    environmentId: function() {
      this.form.environment_id = this.environmentId
    }
  },
  methods: {
    open() {
      this.regain = true
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
      this.resetForm()
    },
    resetForm() {
      this.form.obj_id = this.serviceId
      this.form.environment_id = this.environmentId
      this.form.asset_obj_id = null
    },
    cancelDialog() {
      this.$emit('update:show', false)
    },
    opObj() {
      if (this.status === 'create') {
        this.createObj()
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
    }
  }
}
</script>
