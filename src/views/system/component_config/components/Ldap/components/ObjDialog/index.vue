<template>
  <el-dialog :title="titleMap[status]" :visible.sync="visible" :close-on-click-modal="false" @open="open" @close="$emit('update:show', false)">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="服务地址" prop="host">
        <el-input v-model="form.host" />
      </el-form-item>
      <el-form-item label="管理员DN" prop="admin_dn">
        <el-input v-model="form.admin_dn" />
      </el-form-item>
      <el-form-item label="管理员密码" prop="admin_password">
        <el-input v-model="form.admin_password" />
      </el-form-item>
      <el-form-item label="用户基础DN" prop="member_base_dn">
        <el-input v-model="form.member_base_dn" />
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
  updateLdapConfigApi as updateObjApi,
  getLdapConfigApi as getObjApi
} from '@/api/component/ldap'
export default {
  name: 'FormDialog',
  props: {
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
        host: '',
        admin_dn: '',
        admin_password: '',
        member_base_dn: ''
      },
      rules: {
        host: [{ required: true, message: '请输入服务地址', trigger: 'blur' }],
        admin_dn: [{ required: true, message: '请输入管理员DN', trigger: 'blur' }],
        admin_password: [{ required: true, message: '请输入管理员密码', trigger: 'blur' }],
        member_base_dn: [{ required: true, message: '请输入用户基础DN', trigger: 'blur' }]
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
      const data = {}
      getObjApi(data).then(resp => {
        if (resp.code === 0) {
          this.form = resp.data
        }
        this.loading = false
      })
    },
    resetForm() {
      this.form.host = ''
      this.form.admin_dn = ''
      this.form.admin_password = ''
      this.form.member_base_dn = ''
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
