
/* Layout */
import Layout from '@/layout'
const router = [
    {
        path: '/account',
        component: Layout,
        redirect: '/account/index',
        name: 'Account',
        meta: { title: '资金管理', icon: 'password' },
        children: [
            {
                path: 'index',
                name: 'Accountindex',
                component: () => import('@/views/account/index'),
                meta: { title: '资金明细', icon: 'money' }
            },
            {
                path: 'rechargecheck',
                name: 'Rechargecheck',
                component: () => import('@/views/account/rechargecheck'),
                meta: { title: '充值审核', icon: 'skill' }
            },
            {
                path: 'returncash',
                name: 'Returncash',
                component: () => import('@/views/account/returncash'),
                meta: { title: '返现管理', icon: 'documentation' }
            },
            {
                path: 'collection',
                name: 'Collection',
                component: () => import('@/views/account/collection'),
                meta: { title: '收款卡账户管理', icon: 'list' }
            },
        ]
    },

]

export default router