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
      path: 'user',
      component: () => import('@/views/system/user'),
      name: 'User',
      meta: { title: '用户管理', noCache: true, icon: 'el-icon-user', sign: 'user' }
    },
    {
      path: 'role',
      component: () => import('@/views/system/role'),
      name: 'Role',
      meta: { title: '角色管理', noCache: true, icon: 'el-icon-lock', sign: 'role' }
    },
    {
      path: 'department',
      component: () => import('@/views/system/department'),
      name: 'Department',
      meta: { title: '部门管理', noCache: true, icon: 'tree', sign: 'department' }
    },
    {
      path: 'mod',
      component: () => import('@/views/system/mod'),
      name: 'Mod',
      meta: { title: '模块管理', noCache: true, icon: 'el-icon-set-up', sign: 'mod' }
    }
  ]
}

export default systemRouter
