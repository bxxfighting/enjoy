<template>
  <div v-loading="loading" class="app-container">
    <el-card>
      <div slot="header">
        <span> 地域列表({{ obj.total }}) </span>
      </div>
      <div>
        <el-table :data="obj.dataList" style="width: 100%">
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="instance_id" label="实例ID">
            <template slot-scope="{row}">
              <CopyField :value="row.instance_id" />
            </template>
          </el-table-column>
          <el-table-column prop="endpoint" label="接入点" />
          <el-table-column prop="status_desc" label="状态">
            <template slot-scope="{row}">
              <el-tag
                v-if="row.status==10"
                type="success"
              >{{ row.status_desc }} </el-tag>
              <el-tag
                v-else-if="row.status==20"
                type="danger"
              >{{ row.status_desc }} </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="160"
          >
            <template slot-scope="{row}">
              <el-popconfirm v-if="row.status===20" v-permission="[url.setRegionStatusUrl]" title="确定启用?" @onConfirm="setObjStatus(row.id, 10)">
                <el-button slot="reference" size="mini" type="text" style="margin-right: 8px">
                  启用
                </el-button>
              </el-popconfirm>
              <el-popconfirm v-else-if="row.status===10" v-permission="[url.setRegionStatusUrl]" title="确定禁用?" @onConfirm="setObjStatus(row.id, 20)">
                <el-button slot="reference" size="mini" type="text" style="margin-right: 8px">
                  禁用
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="obj.total>0" :total="obj.total" :page.sync="obj.filter.page_num" :limit.sync="obj.filter.page_size" @pagination="getObjList" />
      </div>
    </el-card>
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js'
import Pagination from '@/components/Pagination'
import CopyField from '@/components/Field/CopyField'
import url from '@/api/asset/region/url'
import {
  setRegionStatusApi as setObjStatusApi,
  getRegionListApi as getObjListApi
} from '@/api/asset/region'
export default {
  name: 'Region',
  components: { Pagination, CopyField },
  directives: { permission },
  data() {
    return {
      url,
      loading: false,
      obj: {
        total: 0,
        dataList: [],
        obj_id: null,
        filter: {
          page_num: 1,
          page_size: 10
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
    getObjList() {
      this.loading = true
      const data = this.obj.filter
      getObjListApi(data).then(resp => {
        if (resp.code === 0) {
          this.obj.dataList = resp.data.data_list
          this.obj.total = resp.data.total
        }
        this.loading = false
      })
    },
    setObjStatus(obj_id, status) {
      this.loading = true
      const data = {
        obj_id: parseInt(obj_id),
        status: status
      }
      setObjStatusApi(data).then(resp => {
        if (resp.code === 0) {
          this.$notify({
            message: '操作成功',
            type: 'success',
            duration: 2000
          })
          this.getObjList()
        } else {
          this.loading = false
        }
      })
    }
  }
}
</script>
