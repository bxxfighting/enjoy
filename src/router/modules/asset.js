import Layout from '@/layout'

const router = {
  path: '/asset',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Asset',
  meta: {
    title: '资产管理',
    icon: 'el-icon-money'
  },
  children: [
    {
      path: 'ecs',
      component: () => import('@/views/asset/ecs'),
      name: 'Ecs',
      meta: { title: 'ECS管理', noCache: false, icon: 'el-icon-refrigerator', sign: 'ecs' }
    },
    {
      path: 'ecs/:id(\\d+)',
      component: () => import('@/views/asset/ecs/detail'),
      name: 'EcsDetail',
      hidden: true,
      meta: { title: 'ECS详情', noCache: false, sign: 'ecs', activeMenu: '/asset/ecs' }
    },
    {
      path: 'slb',
      component: () => import('@/views/asset/slb'),
      name: 'Slb',
      meta: { title: 'SLB管理', noCache: false, icon: 'el-icon-s-operation', sign: 'slb' }
    },
    {
      path: 'slb/:id(\\d+)',
      component: () => import('@/views/asset/slb/detail'),
      name: 'SlbDetail',
      hidden: true,
      meta: { title: 'SLB详情', noCache: false, sign: 'slb', activeMenu: '/asset/slb' }
    },
    {
      path: 'slb/server/group/:id(\\d+)',
      component: () => import('@/views/asset/server_group/detail'),
      name: 'ServerGroupDetail',
      hidden: true,
      meta: { title: '服务器组详情', noCache: false, sign: 'slb', activeMenu: '/asset/slb' }
    },
    {
      path: 'rds',
      component: () => import('@/views/asset/rds'),
      name: 'Rds',
      meta: { title: 'RDS管理', noCache: false, icon: 'el-icon-truck', sign: 'rds' }
    },
    {
      path: 'rds/:id(\\d+)',
      component: () => import('@/views/asset/rds/detail'),
      name: 'RdsDetail',
      hidden: true,
      meta: { title: 'RDS详情', noCache: false, sign: 'rds', activeMenu: '/asset/rds' }
    },
    {
      path: 'rds/database/:id(\\d+)',
      component: () => import('@/views/asset/rds/components/Database/detail'),
      name: 'RdsDatabaseDetail',
      hidden: true,
      meta: { title: 'Database详情', noCache: false, sign: 'rds', activeMenu: '/asset/rds' }
    },
    {
      path: 'rds/account/:id(\\d+)',
      component: () => import('@/views/asset/rds/components/Account/detail'),
      name: 'RdsAccountDetail',
      hidden: true,
      meta: { title: '数据库账号详情', noCache: false, sign: 'rds', activeMenu: '/asset/rds' }
    },
    {
      path: 'redis',
      component: () => import('@/views/asset/redis'),
      name: 'Redis',
      meta: { title: 'Redis管理', noCache: false, icon: 'el-icon-cloudy', sign: 'redis' }
    },
    {
      path: 'redis/:id(\\d+)',
      component: () => import('@/views/asset/redis/detail'),
      name: 'RedisDetail',
      hidden: true,
      meta: { title: 'Redis详情', noCache: false, sign: 'redis', activeMenu: '/asset/redis' }
    },
    {
      path: 'mongo',
      component: () => import('@/views/asset/mongo'),
      name: 'Mongo',
      meta: { title: 'Mongo管理', noCache: false, icon: 'el-icon-dessert', sign: 'mongo' }
    },
    {
      path: 'mongo/:id(\\d+)',
      component: () => import('@/views/asset/mongo/detail'),
      name: 'MongoDetail',
      hidden: true,
      meta: { title: 'Mongo详情', noCache: false, sign: 'mongo', activeMenu: '/asset/mongo' }
    },
    {
      path: 'domain',
      component: () => import('@/views/asset/domain'),
      name: 'Domain',
      meta: { title: '域名管理', noCache: false, icon: 'el-icon-bangzhu', sign: 'domain' }
    },
    {
      path: 'domain/:id(\\d+)',
      component: () => import('@/views/asset/domain/detail'),
      name: 'DomainDetail',
      hidden: true,
      meta: { title: '域名详情', noCache: false, sign: 'domain', activeMenu: '/asset/domain' }
    },
    {
      path: 'rocket',
      component: () => import('@/views/asset/rocket'),
      name: 'Rocket',
      meta: { title: 'Rocket管理', noCache: false, icon: 'el-icon-fork-spoon', sign: 'rocket' }
    },
    {
      path: 'rocket/:id(\\d+)',
      component: () => import('@/views/asset/rocket/detail'),
      name: 'RocketDetail',
      hidden: true,
      meta: { title: 'Rocket详情', noCache: false, sign: 'rocket', activeMenu: '/asset/rocket' }
    }
  ]
}

export default router
