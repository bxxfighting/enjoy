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
      meta: { title: '用户管理', noCache: false, icon: 'el-icon-user', sign: 'user' }
    },
    {
      path: 'user/:id(\\d+)',
      component: () => import('@/views/system/user/detail'),
      name: 'UserDetail',
      hidden: true,
      meta: { title: '用户详情', noCache: false, sign: 'user' }
    },
    {
      path: 'role',
      component: () => import('@/views/system/role'),
      name: 'Role',
      meta: { title: '角色管理', noCache: false, icon: 'el-icon-lock', sign: 'role' }
    },
    {
      path: 'role/:id(\\d+)',
      component: () => import('@/views/system/role/detail'),
      name: 'RoleDetail',
      hidden: true,
      meta: { title: '角色详情', noCache: false, sign: 'role' }
    },
    {
      path: 'department',
      component: () => import('@/views/system/department'),
      name: 'Department',
      meta: { title: '部门管理', noCache: false, icon: 'tree', sign: 'department' }
    },
    {
      path: 'department/:id(\\d+)',
      component: () => import('@/views/system/department/detail'),
      name: 'DepartmentDetail',
      hidden: true,
      meta: { title: '部门详情', noCache: false, sign: 'department' }
    },
    {
      path: 'mod',
      component: () => import('@/views/system/mod'),
      name: 'Mod',
      meta: { title: '模块管理', noCache: false, icon: 'el-icon-set-up', sign: 'mod' }
    }
  ]
}

export default systemRouter
