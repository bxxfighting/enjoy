<template>
  <div class="app-container">
    <BaseInfo :obj-id="parseInt($route.params.id)" />
    <el-tabs v-model="tab.active" @tab-click="changeTab">
      <el-tab-pane v-for="item in tab.tab_list" :key="item.name" :label="item.label" :name="item.name" />
    </el-tabs>
    <div v-if="tab.active === 'topic'">
      <TopicList :obj-id="parseInt($route.params.id)" />
    </div>
    <div v-else-if="tab.active === 'group'">
      <GroupList :obj-id="parseInt($route.params.id)" />
    </div>
  </div>
</template>

<script>
import BaseInfo from './components/BaseInfo'
import TopicList from './components/TopicList'
import GroupList from './components/GroupList'
export default {
  name: 'RedisDetail',
  components: { BaseInfo, TopicList, GroupList },
  data() {
    return {
      obj: {
        loading: false,
        name: ''
      },
      tab: {
        tab_list: [
          { name: 'topic', label: 'Topic' },
          { name: 'group', label: 'Group' }
        ],
        active: 'topic'
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
