import Layout from '@/layout'

const router = {
  path: '/component',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Component',
  meta: {
    title: '组件管理',
    icon: 'el-icon-office-building'
  },
  children: [
    {
      path: 'gitlab',
      component: () => import('@/views/component/gitlab'),
      name: 'Gitlab',
      meta: { title: '代码库管理', noCache: false, icon: 'el-icon-s-finance', sign: 'gitlab' }
    },
    {
      path: 'jenkins',
      component: () => import('@/views/component/jenkins'),
      name: 'Jenkins',
      meta: { title: 'Jenkins管理', noCache: false, icon: 'el-icon-c-scale-to-original', sign: 'jenkins' }
    }
  ]
}

export default router
