
/* Layout */
import Layout from '@/layout'
const router = [
    {
        path: '/users',
        component: Layout,
        redirect: '/users/index',
        name: 'User',
        meta: { title: '客户管理', icon: 'user' },
        children: [
            {
                path: 'index',
                name: 'Users',
                component: () => import('@/views/users/index'),
                meta: { title: '有赞客户列表', icon: 'table' }
            },
            {
                path: 'index1',
                name: 'Users1',
                component: () => import('@/views/users/newindex'),
                meta: { title: '自有客户列表', icon: 'peoples' }
            }
        ]
    },
]

export default router