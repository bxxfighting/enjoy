<template>
  <el-dialog :title="titleMap[status]" :visible.sync="visible" :close-on-click-modal="false" @open="open" @close="$emit('update:show', false)">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="部门" prop="department_id">
        <DepartmentField :obj-id.sync="form.department_id" obj-name="" :regain.sync="regain" />
      </el-form-item>
      <el-form-item label="类型" prop="typ">
        <el-select v-model="form.typ">
          <el-option
            v-for="item in typ.dataList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
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
  createDepartmentUserApi as createObjApi
} from '@/api/system/department'
import DepartmentField from '@/components/Field/DepartmentField'
export default {
  name: 'FormDialog',
  components: { DepartmentField },
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
      form: {
        user_id: parseInt(this.objId),
        department_id: null,
        typ: 20
      },
      rules: {
        department_id: [{ required: true, message: '请选择部门', trigger: 'blur' }],
        typ: [{ required: true, message: '请选择类型', trigger: 'change' }]
      },
      typ: {
        dataList: [
          { name: '部门负责人', value: 10 },
          { name: '普通成员', value: 20 }
        ]
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
    },
    resetForm() {
      this.form.user_id = parseInt(this.objId)
      this.form.department_id = ''
      this.form.typ = 20
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
