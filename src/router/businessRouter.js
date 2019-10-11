
/* Layout */
import Layout from '@/layout'
const router = [
    {
        path: '/goods',
        component: Layout,
        redirect: '/goods/index',
        name: 'Goods',
        meta: { title: '商品管理', icon: 'example' },
        children: [
            // {
            //     path: 'index',
            //     name: 'Index',
            //     component: () => import('@/views/mission/index'),
            //     meta: { title: '订单列表', icon: 'table' }
            // },
            {
                path: 'goods',
                name: 'Goods',
                component: () => import('@/views/goods/index'),
                meta: { title: '商品列表', icon: 'list' }
            }
        ]
    },
    {
        path: '/business',
        component: Layout,
        redirect: '/business/index',
        name: 'Business',
        meta: { title: '分销商管理', icon: 'form' },
        children: [
            // {
            //     path: 'index',
            //     name: 'Businessindex',
            //     component: () => import('@/views/business/index'),
            //     meta: { title: '有赞分销商(参考数据,无实际意义)', icon: 'form' }
            // },
            {
                path: 'index1',
                name: 'Users1',
                component: () => import('@/views/users/newindex'),
                meta: { title: '分销商列表', icon: 'peoples' }
            },
            {
                path: 'setting',
                name: 'Set',
                component: () => import('@/views/users/setting'),
                meta: { title: '分销设置', icon: 'skill' }
            }
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