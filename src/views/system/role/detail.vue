<template>
  <div class="app-container">
    <BaseInfo :obj-id="String($route.params.id)" />
    <el-tabs v-model="tab.active" @tab-click="changeTab">
      <el-tab-pane v-for="item in tab.tab_list" :key="item.name" :label="item.label" :name="item.name" />
    </el-tabs>
    <div v-if="tab.active === 'user'">
      <UserList :obj-id="String($route.params.id)" />
    </div>
  </div>
</template>

<script>
import BaseInfo from './components/BaseInfo'
import UserList from './components/UserList'
export default {
  name: 'RoleDetail',
  components: { BaseInfo, UserList },
  data() {
    return {
      obj: {
        loading: false,
        name: ''
      },
      tab: {
        tab_list: [
          { name: 'user', label: '用户列表' },
        ],
        active: 'user'
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
