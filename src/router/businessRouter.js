
/* Layout */
import Layout from '@/layout'
const router = [
    {
        path: '/business',
        component: Layout,
        redirect: '/business/index',
        name: 'Business',
        meta: { title: '分销员管理', icon: 'form' },
        children: [
            {
                path: 'index',
                name: 'Businessindex',
                component: () => import('@/views/business/index'),
                meta: { title: '分销员列表', icon: 'form' }
            },
            // {
            //     path: 'shop',
            //     name: 'Shop',
            //     component: () => import('@/views/business/shop'),
            //     meta: { title: '店铺列表', icon: 'tree' }
            // }
        ]
    },
    {
        path: '/mission',
        component: Layout,
        redirect: '/mission/index',
        name: 'Mission',
        meta: { title: '订单管理', icon: 'example' },
        children: [
            // {
            //     path: 'index',
            //     name: 'Index',
            //     component: () => import('@/views/mission/index'),
            //     meta: { title: '订单列表', icon: 'table' }
            // },
            {
                path: 'order',
                name: 'Order',
                component: () => import('@/views/mission/order'),
                meta: { title: '订单列表', icon: 'tree' }
            }
        ]
    },
]

export default router