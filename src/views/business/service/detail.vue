<template>
  <div class="app-container">
    <BaseInfo :obj-id="String($route.params.id)" />
    <el-divider content-position="left">服务配置</el-divider>
    <el-tabs v-model="tab.active" @tab-click="changeTab">
      <el-tab-pane v-for="item in tab.tab_list" :key="item.name" :label="item.label" :name="item.name" />
    </el-tabs>
    <div v-if="tab.active === 'department'">
      <DepartmentList :obj-id="parseInt($route.params.id)" />
    </div>
    <div v-else-if="tab.active === 'user'">
      <UserList :obj-id="parseInt($route.params.id)" />
    </div>
    <div v-else-if="tab.active === 'environment'">
      <EnvironmentList :obj-id="parseInt($route.params.id)" @change="onChangeEnvironments" />
    </div>
    <div v-else-if="tab.active === 'asset'">
      <AssetList :obj-id="parseInt($route.params.id)" @change="onChangeAssets" />
    </div>
    <el-divider content-position="left">资产配置</el-divider>
    <el-card>
      <div slot="header">
        <EnvironmentSwitch :service-id="parseInt($route.params.id)" :environment-id.sync="environmentId" :regain.sync="environment.regain" />
      </div>
      <div>
        <AssetCard :service-id="parseInt($route.params.id)" :environment-id="environmentId" :regain.sync="asset.regain" />
      </div>
    </el-card>
  </div>
</template>

<script>
import BaseInfo from './components/BaseInfo'
import UserList from './components/UserList'
import DepartmentList from './components/DepartmentList'
import EnvironmentList from './components/EnvironmentList'
import EnvironmentSwitch from './components/EnvironmentSwitch'
import AssetList from './components/AssetList'
import AssetCard from './components/AssetCard'
export default {
  name: 'ServiceDetail',
  components: { BaseInfo, UserList, DepartmentList, EnvironmentList, AssetList, EnvironmentSwitch, AssetCard },
  data() {
    return {
      obj: {
        loading: false,
        name: ''
      },
      environmentId: 0,
      environment: {
        regain: false
      },
      asset: {
        regain: false
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
    },
    onChangeEnvironments() {
      this.environment.regain = true
    },
    onChangeAssets() {
      this.asset.regain = true
    }
  }
}
</script>

<style>
.el-card {
  border: none;
}
</style>
