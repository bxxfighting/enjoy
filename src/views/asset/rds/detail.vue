<template>
  <div class="app-container">
    <BaseInfo :obj-id="parseInt($route.params.id)" />
    <el-tabs v-model="tab.active" @tab-click="changeTab">
      <el-tab-pane v-for="item in tab.tab_list" :key="item.name" :label="item.label" :name="item.name" />
    </el-tabs>
    <div v-if="tab.active === 'database'">
      <DatabaseList :obj-id="parseInt($route.params.id)" />
    </div>
    <div v-else-if="tab.active === 'account'">
      <AccountList :obj-id="parseInt($route.params.id)" />
    </div>
  </div>
</template>

<script>
import BaseInfo from './components/BaseInfo'
import DatabaseList from './components/DatabaseList'
import AccountList from './components/AccountList'
export default {
  name: 'RdsDetail',
  components: { BaseInfo, DatabaseList, AccountList },
  data() {
    return {
      obj: {
        loading: false,
        name: ''
      },
      tab: {
        tab_list: [
          { name: 'database', label: '数据库' },
          { name: 'account', label: '账号' }
        ],
        active: 'database'
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
