<template>
  <div class="app-container">
    <BaseInfo :obj-id="parseInt($route.params.id)" />
    <el-tabs v-model="tab.active" @tab-click="changeTab">
      <el-tab-pane v-for="item in tab.tab_list" :key="item.name" :label="item.label" :name="item.name" />
    </el-tabs>
    <div v-if="tab.active === 'server_group'">
      <ServerGroupList :obj-id="parseInt($route.params.id)" />
    </div>
    <div v-else-if="tab.active === 'domain'">
      <DomainList :obj-id="parseInt($route.params.id)" />
    </div>
  </div>
</template>

<script>
import BaseInfo from './components/BaseInfo'
import ServerGroupList from './components/ServerGroupList'
import DomainList from './components/DomainList'
export default {
  name: 'SlbDetail',
  components: { BaseInfo, ServerGroupList, DomainList },
  data() {
    return {
      obj: {
        loading: false,
        name: ''
      },
      tab: {
        tab_list: [
          { name: 'server_group', label: '服务器组' },
          { name: 'domain', label: '域名列表' }
        ],
        active: 'server_group'
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
