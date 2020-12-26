<template>
  <div>
    <el-card>
      <div slot="header">
        <span> Topic列表({{ obj.total }}) </span>
      </div>
      <div>
        <el-table :data="obj.dataList" style="width: 100%">
          <el-table-column prop="name" label="名称">
            <template slot-scope="{row}">
              <CopyField :value="row.name" />
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" />
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import CopyField from '@/components/Field/CopyField'
import permission from '@/directive/permission/index.js'
import url from '@/api/asset/rocket/url'
import {
  getRocketTopicListApi as getObjListApi
} from '@/api/asset/rocket'
export default {
  name: 'RocketTopicList',
  directives: { permission },
  components: { CopyField },
  props: {
    objId: {
      required: true,
      type: Number
    }
  },
  data() {
    return {
      url,
      obj: {
        loading: false,
        total: 0,
        dataList: [],
        form: {
          objId: null,
          show: false,
          status: 'update'
        },
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
      data['rocket_id'] = this.objId
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
