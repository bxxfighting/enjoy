<template>
  <div>
    <el-card>
      <div slot="header">
        <span> 域名列表({{ obj.total }}) </span>
      </div>
      <div>
        <el-table :data="obj.dataList" style="width: 100%">
          <el-table-column prop="domain.fullname" label="域名">
            <template slot-scope="{row}">
              <CopyField :value="row.domain.fullname" />
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="80">
            <template slot-scope="{row}">
              <router-link
                :to="{name: 'DomainDetail', params:{ id: row.domain.id }}"
              >
                <el-button size="mini" type="text" style="margin-right: 8px"> 查看 </el-button>
              </router-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import CopyField from '@/components/Field/CopyField'
import {
  getSlbDomainListApi as getObjListApi
} from '@/api/asset/slb'
export default {
  name: 'DomainList',
  components: { CopyField },
  props: {
    objId: {
      required: true,
      type: Number
    }
  },
  data() {
    return {
      obj: {
        loading: false,
        total: 0,
        dataList: [],
        filter: {
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
      data['obj_id'] = this.objId
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
