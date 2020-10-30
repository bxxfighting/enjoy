import Layout from '@/layout'

const systemRouter = {
  path: '/system',
  component: Layout,
  redirect: 'noRedirect',
  name: 'System',
  meta: {
    title: '系统设置',
    icon: 'el-icon-setting'
  },
  children: [
    {
      path: 'mod',
      component: () => import('@/views/system/mod'),
      name: 'Mod',
      meta: { title: '模块管理', noCache: true, icon: 'el-icon-set-up', sign: 'mod' }
    }
  ]
}

export default systemRouter
