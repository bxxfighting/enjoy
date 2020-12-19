<template>
  <div>
    <el-card>
      <div slot="header">
        <span> 服务列表({{ obj.total }}) </span>
      </div>
      <div>
        <el-table :data="obj.dataList" style="width: 100%">
          <el-table-column prop="service.name" label="服务名称" />
          <el-table-column prop="service.sign" label="服务标识">
            <template slot-scope="{row}">
              <CopyField :value="row.service.sign" />
            </template>
          </el-table-column>
          <el-table-column prop="environment.name" label="环境名称" />
          <el-table-column prop="environment.sign" label="环境标识">
            <template slot-scope="{row}">
              <CopyField :value="row.environment.sign" />
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="160">
            <template slot-scope="{row}">
              <router-link
                :to="{name: 'ServiceDetail', params:{ id: row.service.id }}"
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
  getSlbServerGroupServiceListApi as getObjListApi
} from '@/api/asset/slb'
export default {
  name: 'ServiceList',
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
