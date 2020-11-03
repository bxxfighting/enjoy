<template>
  <el-dialog :title="titleMap[status]" :visible.sync="visible" :close-on-click-modal="false" @open="open" @close="$emit('update:show', false)">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="用户" prop="user_id">
        <UserField :obj-id.sync="form.user_id" />
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
  createRoleUserApi as createObjApi
} from '@/api/system/role'
import UserField from '@/components/Field/UserField'
export default {
  name: 'FormDialog',
  components: { UserField },
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
      titleMap: {
        create: '创建',
        update: '编辑'
      },
      form: {
        user_id: null, 
        role_id: parseInt(this.objId)
      },
      rules: {
        user_id: [{ required: true, message: '请选择用户', trigger: 'blur' }]
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
        }
        this.loading = false
      })
    },
    resetForm() {
      this.form.role_id = parseInt(this.objId)
      this.form.user_id = null
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
      console.log(this.objId)
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          const data = this.form
          console.log(data)
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
