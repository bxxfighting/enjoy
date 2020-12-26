<template>
  <div>
    <el-tabs v-model="tab.active" @tab-click="changeTab">
      <el-tab-pane v-for="item in tab.tab_list" :key="item.sign" :label="item.name + '配置'" :name="item.sign" />
    </el-tabs>
    <div v-if="tab.active === 'ecs'">
      <EcsList :service-id="service_id" :environment-id="environment_id" />
    </div>
    <div v-else-if="tab.active === 'slb_server_group'">
      <ServerGroupList :service-id="service_id" :environment-id="environment_id" />
    </div>
    <div v-else-if="tab.active === 'database'">
      <DatabaseList :service-id="service_id" :environment-id="environment_id" />
    </div>
    <div v-else-if="tab.active === 'redis'">
      <RedisList :service-id="service_id" :environment-id="environment_id" />
    </div>
    <div v-else-if="tab.active === 'mongo'">
      <MongoList :service-id="service_id" :environment-id="environment_id" />
    </div>
    <div v-else-if="tab.active === 'domain'">
      <DomainList :service-id="service_id" :environment-id="environment_id" />
    </div>
    <div v-else-if="tab.active === 'rocket_topic'">
      <RocketTopicList :service-id="service_id" :environment-id="environment_id" />
    </div>
    <div v-else>
      敬请期待
    </div>
  </div>
</template>

<script>
import {
  getServiceAssetListApi as getObjListApi
} from '@/api/business/service'
import EcsList from './components/EcsList'
import ServerGroupList from './components/ServerGroupList'
import DatabaseList from './components/DatabaseList'
import RedisList from './components/RedisList'
import MongoList from './components/MongoList'
import DomainList from './components/DomainList'
import RocketTopicList from './components/RocketTopicList'

export default {
  name: 'AssetCard',
  components: { EcsList, ServerGroupList, DatabaseList, RedisList, MongoList, DomainList, RocketTopicList },
  props: {
    serviceId: {
      required: true,
      type: Number
    },
    environmentId: {
      required: true,
      type: Number
    },
    regain: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      service_id: this.serviceId,
      environment_id: this.environmentId,
      asset_id: null,
      tab: {
        tab_list: [],
        active: null
      }
    }
  },
  watch: {
    serviceId: function() {
      this.service_id = this.serviceId
    },
    environmentId: function() {
      this.environment_id = this.environmentId
    },
    regain: function() {
      if (this.regain === true) {
        this.$emit('update:regain', false)
        this.getObjList()
      }
    }
  },
  created() {
    this.getObjList()
  },
  methods: {
    changeTab(tab, event) {
      this.tab.active = tab.name
    },
    getObjList() {
      const data = {
        'obj_id': parseInt(this.service_id)
      }
      getObjListApi(data).then(resp => {
        if (resp.code === 0) {
          this.tab.tab_list = resp.data.data_list
          if (resp.data.data_list.length > 0) {
            this.tab.active = resp.data.data_list[0].sign
            this.asset_id = resp.data.data_list[0].id
          } else {
            this.tab.active = ''
            this.asset_id = null
          }
        }
      })
    }
  }
}
</script>
