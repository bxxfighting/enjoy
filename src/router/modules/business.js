import Layout from '@/layout'

const router = {
  path: '/business',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Business',
  meta: {
    title: '业务管理',
    icon: 'el-icon-setting'
  },
  children: [
    {
      path: 'project',
      component: () => import('@/views/business/project'),
      name: 'Project',
      meta: { title: '项目管理', noCache: false, icon: 'el-icon-user', sign: 'project' }
    },
    {
      path: 'project/:id(\\d+)',
      component: () => import('@/views/business/project/detail'),
      name: 'ProjectDetail',
      hidden: true,
      meta: { title: '项目详情', noCache: false, sign: 'project', activeMenu: '/business/project' }
    },
    {
      path: 'service',
      component: () => import('@/views/business/service'),
      name: 'Service',
      meta: { title: '服务管理', noCache: false, icon: 'el-icon-user', sign: 'service' }
    },
    {
      path: 'service/:id(\\d+)',
      component: () => import('@/views/business/service/detail'),
      name: 'ServiceDetail',
      hidden: true,
      meta: { title: '服务详情', noCache: false, sign: 'service', activeMenu: '/business/service' }
    }
  ]
}

export default router
