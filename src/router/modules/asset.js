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
    }
  ]
}

export default router
