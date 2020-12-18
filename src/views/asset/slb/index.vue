<template>
  <div v-loading="loading" class="app-container">
    <el-card>
      <div slot="header">
        <span> SLB列表({{ obj.total }}) </span>
      </div>
      <div>
        <el-table :data="obj.dataList" style="width: 100%">
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="instance_id" label="实例ID">
            <template slot-scope="{row}">
              <CopyField :value="row.instance_id" />
            </template>
          </el-table-column>
          <el-table-column prop="ip" label="IP">
            <template slot-scope="{row}">
              <CopyField :value="row.ip" />
            </template>
          </el-table-column>
          <el-table-column prop="ip_typ_desc" label="类型" />
          <el-table-column prop="region_id" label="地域" />
          <el-table-column prop="zone_id" label="可用区" />
          <el-table-column fixed="right" label="操作" width="160">
            <template slot-scope="{row}">
              <router-link
                :to="{name: 'SlbDetail', params:{ id: row.id }}"
              >
                <el-button size="mini" type="text" style="margin-right: 8px"> 查看 </el-button>
              </router-link>
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
import url from '@/api/asset/slb/url'
import {
  getSlbListApi as getObjListApi
} from '@/api/asset/slb'
export default {
  name: 'Slb',
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
    }
  }
}
</script>
