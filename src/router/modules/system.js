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
      path: 'ldap',
      component: () => import('@/views/system/ldap'),
      name: 'Ldap',
      meta: { title: 'LDAP配置', noCache: false, icon: 'el-icon-s-ticket', sign: 'ldap' }
    },
    {
      path: 'aliyun_key',
      component: () => import('@/views/asset/aliyun_key'),
      name: 'AliyunKey',
      meta: { title: '阿里云Key', noCache: false, icon: 'el-icon-key', sign: 'aliyun_key' }
    },
    {
      path: 'asset',
      component: () => import('@/views/asset/asset'),
      name: 'Asset',
      meta: { title: '资产模块管理', noCache: false, icon: 'el-icon-s-cooperation', sign: 'asset' }
    },
    {
      path: 'region',
      component: () => import('@/views/asset/region'),
      name: 'Asset',
      meta: { title: '地域管理', noCache: false, icon: 'el-icon-map-location', sign: 'region' }
    },
    {
      path: 'environment',
      component: () => import('@/views/business/environment'),
      name: 'Environment',
      meta: { title: '环境管理', noCache: false, icon: 'el-icon-paperclip', sign: 'environment' }
    },
    {
      path: 'berry_type',
      component: () => import('@/views/system/berry_type'),
      name: 'BerryType',
      meta: { title: '任务类型管理', noCache: false, icon: 'el-icon-guide', sign: 'berry_type' }
    },
    {
      path: 'gitlab_server',
      component: () => import('@/views/system/gitlab_server'),
      name: 'GitlabServer',
      meta: { title: 'Gitlab服务', noCache: false, icon: 'el-icon-wallet', sign: 'gitlab_server' }
    },
    {
      path: 'jenkins_server',
      component: () => import('@/views/system/jenkins_server'),
      name: 'JenkinsServer',
      meta: { title: 'Jenkins服务', noCache: false, icon: 'el-icon-suitcase-1', sign: 'jenkins_server' }
    },
    {
      path: 'language',
      component: () => import('@/views/system/language'),
      name: 'Language',
      meta: { title: '编程语言', noCache: false, icon: 'el-icon-magic-stick', sign: 'language' }
    },
    {
      path: 'language/:id(\\d+)',
      component: () => import('@/views/system/language/detail'),
      name: 'LanguageDetail',
      hidden: true,
      meta: { title: '编程语言详情', noCache: false, sign: 'language', activeMenu: '/system/language' }
    },
    {
      path: 'berry_type/:id(\\d+)',
      component: () => import('@/views/system/berry_type/detail'),
      name: 'BerryTypeDetail',
      hidden: true,
      meta: { title: '任务类型详情', noCache: false, sign: 'berry_type', activeMenu: '/system/berry_type' }
    },
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
      meta: { title: '用户详情', noCache: false, sign: 'user', activeMenu: '/system/user' }
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
      meta: { title: '角色详情', noCache: false, sign: 'role', activeMenu: '/system/role' }
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
      meta: { title: '部门详情', noCache: false, sign: 'department', activeMenu: '/system/department' }
    },
    {
      path: 'mod',
      component: () => import('@/views/system/mod'),
      name: 'Mod',
      meta: { title: '模块管理', noCache: false, icon: 'el-icon-set-up', sign: 'mod' }
    },
    {
      path: 'mod/:id(\\d+)',
      component: () => import('@/views/system/mod/detail'),
      name: 'ModDetail',
      hidden: true,
      meta: { title: '模块详情', noCache: false, sign: 'mod', activeMenu: '/system/mod' }
    }
  ]
}

export default systemRouter
