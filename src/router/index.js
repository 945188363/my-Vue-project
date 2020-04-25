import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Upload from '@/components/Upload'
import Index from '@/components/Index'
import ApiManager from '@/components/api/ApiManager'

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
        }
      ]
    }
  ]
})
