import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Upload from '@/components/Upload'
import Index from '@/components/Index'
import ApiManager from '@/components/api/ApiManager'
import RegistryManager from '../components/registry/RegistryManager'
import LoadBalanceManager from '../components/loadbalance/LoadBalanceManager'
import Log from '../components/log/Log'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/upload',
      name: 'Upload',
      component: Upload
    },
    {
      path: '/index',
      name: 'Index',
      redirect: '/welcome',
      component: Index,
      children: [
        {
          path: '/welcome',
          component: HelloWorld
        },
        {
          path: '/apiManager',
          component: ApiManager
        },
        {
          path: '/registryManager',
          component: RegistryManager
        },
        {
          path: '/loadBalanceManager',
          component: LoadBalanceManager
        },
        {
          path: '/logManager',
          component: Log
        }
      ]
    }
  ]
})
