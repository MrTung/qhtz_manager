
/* Layout */
import Layout from '@/layout'
const router = [
    {
        path: '/auth',
        component: Layout,
        redirect: '/auth/index',
        name: 'Auth',
        meta: {
            title: '系统设置',
            icon: 'nested'
        },
        children: [
            {
                path: 'account',
                name: 'Account',
                component: () => import('@/views/auth/index'),
                meta: { title: '账户列表', icon: 'table' }
            },
            {
                path: 'code',
                name: 'Code',
                component: () => import('@/views/invitation/index'),
                meta: { title: '邀请码列表', icon: 'peoples' }
            },
            {
                path: 'notice',
                name: 'notice',
                component: () => import('@/views/notice/index'),
                meta: { title: '公告列表', icon: 'email' }
            },
        ]
    },
    // {
    //     path: '/invitation',
    //     component: Layout,
    //     redirect: '/invitation/index',
    //     name: 'Invitation',
    //     meta: {
    //         title: '邀请码',
    //         icon: 'peoples'
    //     },
    //     children: [
    //         {
    //             path: 'index',
    //             name: 'Index1',
    //             component: () => import('@/views/invitation/index'),
    //             meta: { title: '邀请码列表', icon: 'peoples' }
    //         },
    //     ]
    // },
    // {
    //     path: '/notice',
    //     component: Layout,
    //     redirect: '/notice/index',
    //     name: 'Notice',
    //     meta: {
    //         title: '公告管理',
    //         icon: 'email'
    //     },
    //     children: [
    //         {
    //             path: 'notice',
    //             name: 'notice',
    //             component: () => import('@/views/notice/index'),
    //             meta: { title: '公告列表', icon: 'email' }
    //         },
    //     ]
    // },
]

export default router