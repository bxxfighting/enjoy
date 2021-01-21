<template>
  <div>
    <el-card shadow="never">
      <div slot="header">
        <span> 环境列表({{ obj.total }}) </span>
        <el-button v-permission="[url.createServiceEnvironmentUrl]" icon="el-icon-plus" type="text" size="small" style="float: right; padding: 3px 0;" @click="handleCreateObj">
          添加
        </el-button>
      </div>
      <div>
        <el-table :data="obj.dataList" style="width: 100%">
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="sign" label="唯一标识">
            <template slot-scope="{row}">
              <CopyField :value="row.sign" />
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="160">
            <template slot-scope="{row}">
              <el-popconfirm title="确定删除?" @onConfirm="deleteObj(row.id)">
                <el-button slot="reference" v-permission="[url.deleteServiceEnvironmentUrl]" size="mini" type="text">
                  删除
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <ObjDialog
      :obj-id="obj.form.obj_id"
      :status.sync="obj.form.status"
      :show.sync="obj.form.show"
      @success="onChange"
    />
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js'
import CopyField from '@/components/Field/CopyField'
import ObjDialog from './components/ObjDialog'
import url from '@/api/business/service/url'
import {
  getServiceEnvironmentListApi as getObjListApi,
  deleteServiceEnvironmentApi as deleteObjApi
} from '@/api/business/service'
export default {
  name: 'EnvironmentList',
  directives: { permission },
  components: { CopyField, ObjDialog },
  props: {
    objId: {
      required: true,
      type: Number
    }
  },
  data() {
    return {
      url,
      obj: {
        loading: false,
        total: 0,
        dataList: [],
        filter: {
        },
        form: {
          obj_id: this.objId,
          show: false,
          status: 'create'
        }
      }
    }
  },
  created() {
    this.getObjList()
  },
  activated() {
    this.getObjList()
  },
  methods: {
    onChange() {
      this.$emit('change')
      this.getObjList()
    },
    getObjList() {
      this.obj.loading = true
      const data = this.obj.filter
      data['obj_id'] = this.objId
      getObjListApi(data).then(resp => {
        if (resp.code === 0) {
          this.obj.dataList = resp.data.data_list
          this.obj.total = resp.data.total
        }
        this.obj.loading = false
      })
    },
    handleCreateObj() {
      this.obj.form.status = 'create'
      this.obj.form.show = true
    },
    deleteObj(obj_id) {
      this.loading = true
      const data = {
        obj_id: this.objId,
        environment_id: obj_id
      }
      deleteObjApi(data).then(resp => {
        if (resp.code === 0) {
          this.$notify({
            message: '操作成功',
            type: 'success',
            duration: 2000
          })
          this.onChange()
        }
      })
    }
  }
}
</script>
