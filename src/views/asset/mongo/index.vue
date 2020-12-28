<template>
  <div v-loading="loading" class="app-container">
    <el-card>
      <div slot="header">
        <span> Mongo列表({{ obj.total }}) </span>
      </div>
      <div>
        <el-table :data="obj.dataList" style="width: 100%">
          <el-table-column prop="name" label="名称">
            <template slot-scope="{row}">
              <CopyField :value="row.name" />
              <el-link class="el-icon-link" :href="row.web_url" target="_blank" />
            </template>
          </el-table-column>
          <el-table-column width="200" prop="instance_id" label="实例ID">
            <template slot-scope="{row}">
              <CopyField :value="row.instance_id" />
            </template>
          </el-table-column>
          <el-table-column width="80" prop="typ" label="类型" />
          <el-table-column width="50" prop="version" label="版本" />
          <el-table-column width="120" prop="db_typ" label="复制集/分片" />
          <el-table-column width="80" prop="net_typ" label="EIP/VPC" />
          <el-table-column prop="connection" label="连接字符串">
            <template slot-scope="{row}">
              <CopyField :value="row.connection" />
            </template>
          </el-table-column>
          <el-table-column width="100" prop="region_id" label="地域" />
          <el-table-column width="100" prop="zone_id" label="可用区" />
          <el-table-column fixed="right" label="操作" width="80">
            <template slot-scope="{row}">
              <router-link
                :to="{name: 'MongoDetail', params:{ id: row.id }}"
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
import url from '@/api/asset/mongo/url'
import {
  getMongoListApi as getObjListApi
} from '@/api/asset/mongo'
export default {
  name: 'Mongo',
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
