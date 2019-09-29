
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
                meta: { title: '客户列表', icon: 'table' }
            },

        ]
    },
]

export default router