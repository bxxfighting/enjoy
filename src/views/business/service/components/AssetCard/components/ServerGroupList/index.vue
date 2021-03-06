<template>
  <div>
    <el-card shadow="never">
      <div slot="header">
        <span> 服务器组列表({{ obj.total }}) </span>
        <el-button v-permission="[url.createServiceServerGroupUrl]" icon="el-icon-plus" type="text" size="small" style="float: right; padding: 3px 0;" @click="handleCreateObj">
          添加
        </el-button>
      </div>
      <div>
        <el-table :data="obj.dataList" style="width: 100%">
          <el-table-column prop="name" label="名称">
            <template slot-scope="{row}">
              <CopyField :value="row.server_group.name" />
            </template>
          </el-table-column>
          <el-table-column prop="slb" label="所属SLB">
            <template slot-scope="{row}">
              <router-link
                :to="{name: 'SlbDetail', params:{ id: row.server_group.slb.id }}"
              >
                <el-button size="mini" type="text" style="margin-right: 8px">{{ row.server_group.slb.name }}</el-button>
              </router-link>
            </template>
          </el-table-column>
          <el-table-column prop="typ" label="类型">
            <template slot-scope="{row}">
              <CopyField :value="String(row.server_group.typ_desc)" />
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="{row}">
              <el-tag v-if="row.status===10">{{ row.status_desc }} </el-tag>
              <el-tag v-else-if="row.status===20" type="success">{{ row.status_desc }} </el-tag>
              <el-tag v-else-if="row.status===40" type="warning">{{ row.status_desc }} </el-tag>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="160">
            <template slot-scope="{row}">
              <router-link
                :to="{name: 'ServerGroupDetail', params:{ id: row.server_group.id }}"
              >
                <el-button size="mini" type="text" style="margin-right: 8px"> 查看 </el-button>
              </router-link>
              <el-popconfirm title="确定删除?" @onConfirm="deleteObj(row.server_group.id)">
                <el-button slot="reference" v-permission="[url.deleteServiceServerGroupUrl]" size="mini" type="text">
                  删除
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="obj.total>0" :total="obj.total" :page.sync="obj.filter.page_num" :limit.sync="obj.filter.page_size" @pagination="getObjList" />
      </div>
    </el-card>
    <ObjDialog
      :service-id="service_id"
      :environment-id="environment_id"
      :status.sync="obj.form.status"
      :show.sync="obj.form.show"
      @success="getObjList"
    />
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js'
import Pagination from '@/components/Pagination'
import CopyField from '@/components/Field/CopyField'
import { isKong } from '@/utils/validate'
import ObjDialog from './components/ObjDialog'
import url from '@/api/business/service/url'
import {
  getServiceServerGroupListApi as getObjListApi,
  deleteServiceServerGroupApi as deleteObjApi
} from '@/api/business/service'
export default {
  name: 'ServerGroupList',
  directives: { permission },
  components: { Pagination, CopyField, ObjDialog },
  props: {
    serviceId: {
      required: true,
      type: Number
    },
    environmentId: {
      required: true,
      type: Number
    }
  },
  data() {
    return {
      url,
      service_id: this.serviceId,
      environment_id: this.environmentId,
      obj: {
        loading: false,
        total: 0,
        dataList: [],
        filter: {
          page_num: 1,
          page_size: 20
        },
        form: {
          obj_id: this.objId,
          show: false,
          status: 'create'
        }
      }
    }
  },
  watch: {
    serviceId: function() {
      this.service_id = this.serviceId
    },
    environmentId: function() {
      this.environment_id = this.environmentId
      this.getObjList()
    }
  },
  created() {
    this.getObjList()
  },
  activated() {
    this.getObjList()
  },
  methods: {
    getObjList() {
      if (isKong(this.environment_id) === true || this.environment_id === 0) {
        return
      }
      this.obj.loading = true
      const data = this.obj.filter
      data['obj_id'] = this.service_id
      data['environment_id'] = this.environment_id
      data['typ'] = 'slb_server_group'
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
        obj_id: this.serviceId,
        environment_id: this.environmentId,
        typ: 'slb_server_group',
        asset_obj_id: obj_id
      }
      deleteObjApi(data).then(resp => {
        if (resp.code === 0) {
          this.$notify({
            message: '操作成功',
            type: 'success',
            duration: 2000
          })
          this.getObjList()
        }
      })
    }
  }
}
</script>
