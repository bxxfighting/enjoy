<template>
  <div v-loading="loading" class="app-container">
    <el-card>
      <div slot="header">
        <span> 代码库列表({{ obj.total }}) </span>
        <el-button v-permission="[url.syncGitlabProjectUrl]" icon="el-icon-refresh" type="text" size="small" style="float: right; padding: 3px 0;" @click="syncObj">
          同步
        </el-button>
      </div>
      <div>
        <el-table :data="obj.dataList" style="width: 100%">
          <el-table-column prop="name" label="名称">
            <template slot-scope="{row}">
              <CopyField :value="row.name" />
            </template>
          </el-table-column>
          <el-table-column prop="web_url" label="访问地址">
            <template slot-scope="{row}">
              <CopyField :value="row.web_url" />
              <el-link class="el-icon-link" :href="row.web_url" target="_blank" />
            </template>
          </el-table-column>
          <el-table-column prop="ssh_url" label="ssh地址">
            <template slot-scope="{row}">
              <CopyField :value="row.ssh_url" />
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
import url from '@/api/component/gitlab/url'
import {
  getGitlabProjectListApi as getObjListApi,
  syncGitlabProjectApi as syncObjApi
} from '@/api/component/gitlab'
export default {
  name: 'GitlabProject',
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
    syncObj() {
      this.loading = true
      syncObjApi().then(resp => {
        if (resp.code === 0) {
          this.$notify({
            message: '操作成功',
            type: 'success',
            duration: 2000
          })
        }
        this.loading = false
      })
    }
  }
}
</script>
