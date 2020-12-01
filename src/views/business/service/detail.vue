<template>
  <div class="app-container">
    <BaseInfo :obj-id="String($route.params.id)" />
    <el-tabs v-model="tab.active" @tab-click="changeTab">
      <el-tab-pane v-for="item in tab.tab_list" :key="item.name" :label="item.label" :name="item.name" />
    </el-tabs>
    <div v-if="tab.active === 'department'">
      <DepartmentList :obj-id="String($route.params.id)" />
    </div>
    <div v-else-if="tab.active === 'user'">
      <UserList :obj-id="String($route.params.id)" />
    </div>
    <div v-else-if="tab.active === 'environment'">
      <EnvironmentList :obj-id="String($route.params.id)" />
    </div>
    <div v-else-if="tab.active === 'asset'">
      <AssetList :obj-id="String($route.params.id)" />
    </div>
  </div>
</template>

<script>
import BaseInfo from './components/BaseInfo'
import UserList from './components/UserList'
import DepartmentList from './components/DepartmentList'
import EnvironmentList from './components/EnvironmentList'
import AssetList from './components/AssetList'
export default {
  name: 'ServiceDetail',
  components: { BaseInfo, UserList, DepartmentList, EnvironmentList, AssetList },
  data() {
    return {
      obj: {
        loading: false,
        name: ''
      },
      tab: {
        tab_list: [
          { name: 'department', label: '部门列表' },
          { name: 'user', label: '用户列表' },
          { name: 'environment', label: '环境列表' },
          { name: 'asset', label: '资产模块' }
        ],
        active: 'department'
      }
    }
  },
  methods: {
    changeTab(tab, event) {
      this.tab.active = tab.name
    }
  }
}
</script>

<style>
.el-card {
  border: none;
}
</style>
