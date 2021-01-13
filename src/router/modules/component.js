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
    }
  ]
}

export default router
