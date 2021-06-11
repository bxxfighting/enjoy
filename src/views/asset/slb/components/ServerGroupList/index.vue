<template>
  <div>
    <el-card>
      <div slot="header">
        <span> 服务器组列表({{ obj.total }}) </span>
      </div>
      <div>
        <el-table :data="obj.dataList" style="width: 100%">
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="instance_id" label="实例ID">
            <template slot-scope="{row}">
              <CopyField :value="row.instance_id" />
            </template>
          </el-table-column>
          <el-table-column prop="typ_desc" label="类型" />
          <el-table-column prop="ecs_count" label="ECS数量" />
          <el-table-column fixed="right" label="操作" width="160">
            <template slot-scope="{row}">
              <router-link
                :to="{name: 'ServerGroupDetail', params:{ id: row.id }}"
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
  getSlbServerGroupListApi as getObjListApi
} from '@/api/asset/slb'
export default {
  name: 'ServerGroupList',
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
      data['slb_id'] = this.objId
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
