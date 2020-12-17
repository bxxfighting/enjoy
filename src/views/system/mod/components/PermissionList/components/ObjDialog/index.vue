<template>
  <el-dialog :title="titleMap[status]" :visible.sync="visible" :close-on-click-modal="false" @open="open" @close="$emit('update:show', false)">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
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
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="唯一标识" prop="sign">
        <el-input v-model="form.sign" />
      </el-form-item>
      <el-form-item label="排序值" prop="rank">
        <el-input v-model="form.rank" />
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
  createPermissionApi as createObjApi
} from '@/api/system/permission'
export default {
  name: 'FormDialog',
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
        mod_id: parseInt(this.objId),
        typ: 10,
        name: '',
        sign: '',
        rank: 0
      },
      rules: {
        typ: [{ required: true, message: '请选择类型', trigger: 'change' }],
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        sign: [{ required: true, message: '请输入标识', trigger: 'blur' }],
        rank: [{ required: true, message: '请输入排序值', trigger: 'blur' }]
      },
      typ: {
        dataList: [
          { name: '操作权限', value: 10 },
          { name: '数据权限', value: 20 }
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
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
      this.resetForm()
    },
    resetForm() {
      this.form.typ = 10
      this.form.name = ''
      this.form.sign = ''
      this.form.rank = 0
      this.form.mod_id = parseInt(this.objId)
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
