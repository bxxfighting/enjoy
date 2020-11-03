<template>
  <div class="app-container">
    <BaseInfo :obj-id="String($route.params.id)" />
    <el-tabs v-model="tab.active" @tab-click="changeTab">
      <el-tab-pane v-for="item in tab.tab_list" :key="item.name" :label="item.label" :name="item.name" />
    </el-tabs>
    <div v-if="tab.active === 'role'">
      <RoleList :obj-id="String($route.params.id)" />
    </div>
    <div v-else-if="tab.active === 'department'">
      <DepartmentList :obj-id="String($route.params.id)" />
    </div>
  </div>
</template>

<script>
import BaseInfo from './components/BaseInfo'
import RoleList from './components/RoleList'
import DepartmentList from './components/DepartmentList'
export default {
  name: 'UserDetail',
  components: { BaseInfo, RoleList, DepartmentList },
  data() {
    return {
      obj: {
        loading: false,
        name: ''
      },
      tab: {
        tab_list: [
          { name: 'role', label: '角色列表' },
          { name: 'department', label: '部门列表' }
        ],
        active: 'role'
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
