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
    }
  ]
}

export default router
