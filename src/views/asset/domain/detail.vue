<template>
  <div class="app-container">
    <BaseInfo :obj-id="parseInt($route.params.id)" />
    <el-tabs v-model="tab.active" @tab-click="changeTab">
      <el-tab-pane v-for="item in tab.tab_list" :key="item.name" :label="item.label" :name="item.name" />
    </el-tabs>
    <div v-if="tab.active === 'service'">
      <ServiceList :obj-id="parseInt($route.params.id)" />
    </div>
  </div>
</template>

<script>
import BaseInfo from './components/BaseInfo'
import ServiceList from './components/ServiceList'
export default {
  name: 'DomainDetail',
  components: { BaseInfo, ServiceList },
  data() {
    return {
      obj: {
        loading: false,
        name: ''
      },
      tab: {
        tab_list: [
          { name: 'service', label: '服务' }
        ],
        active: 'service'
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
