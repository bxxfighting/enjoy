<template>
  <div>
    <el-card>
      <div slot="header">
        <span> 服务列表({{ obj.total }}) </span>
      </div>
      <div>
        <el-table :data="obj.dataList" style="width: 100%">
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="sign" label="标识">
            <template slot-scope="{row}">
              <CopyField :value="row.sign" />
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="{row}">
              <router-link
                :to="{name: 'ServiceDetail', params:{ id: row.id }}"
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
import url from '@/api/business/project/url'
import {
  getProjectServiceListApi as getObjListApi
} from '@/api/business/project'
export default {
  name: 'ServiceList',
  directives: { permission },
  components: { Pagination, CopyField },
  props: {
    objId: {
      required: true,
      type: String
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
          page_num: 1,
          page_size: 20
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
      this.obj.loading = true
      const data = this.obj.filter
      data['obj_id'] = parseInt(this.objId)
      getObjListApi(data).then(resp => {
        if (resp.code === 0) {
          this.obj.dataList = resp.data.data_list
          this.obj.total = resp.data.total
        }
        this.obj.loading = false
      })
    }
  }
}
</script>
