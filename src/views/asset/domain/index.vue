<template>
  <div v-loading="loading" class="app-container">
    <el-card>
      <div slot="header">
        <span> 域名列表({{ obj.total }}) </span>
      </div>
      <div>
        <el-table :data="obj.dataList" style="width: 100%">
          <el-table-column prop="fullname" label="名称">
            <template slot-scope="{row}">
              <CopyField :value="row.fullname" />
            </template>
          </el-table-column>
          <el-table-column prop="instance_id" label="实例ID">
            <template slot-scope="{row}">
              <CopyField :value="row.instance_id" />
            </template>
          </el-table-column>
          <el-table-column prop="typ" label="类型" />
          <el-table-column prop="rr" label="RR" />
          <el-table-column prop="value" label="Value" />
          <el-table-column prop="enabled" label="是否启用">
            <template slot-scope="{row}">
              <CopyField :value="String(row.enabled)" />
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="80">
            <template slot-scope="{row}">
              <router-link
                :to="{name: 'DomainDetail', params:{ id: row.id }}"
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
import url from '@/api/asset/domain/url'
import {
  getDomainRecordListApi as getObjListApi
} from '@/api/asset/domain'
export default {
  name: 'Domain',
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
