export default  [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'hzz'],
    routes: [
      { path: '/', redirect: '/welcome/home' },
      {
        path: '/welcome',
        icon: 'smile',
        name: 'welcome',
        routes: [
          {
            path: '/welcome/home',
            name: 'jobSpace',
            icon: 'profile',
            component: './Article/index',
          },
          {
            path: '/admin',
            name: 'admin',
            icon: 'crown',
            component: './Admin',
            authority: ['admin'],
          },
          {
            component: './404',
          },
        ],
      },
      {
        path: '/userMg',
        name: 'userMg',
        icon: 'usergroup-add',
        routes: [
          {
            path: '/userMg/list',
            name: 'list',
            icon:'profile',
            component: './userMg/list',
          },
        ],
      },
      {
        path: '/article',
        name: 'article',
        icon: 'code',
        routes: [
          {
            path: '/article/addArt',
            name: 'addArt',
            icon:'file-markdown',
            component: './addArt/index',
          },
          {
            path: '/article/artList',
            name: 'artList',
            icon:'file-image',
            component: './addArt/list',
          },
        ],
      },
      {
        path: '/tag',
        name: 'label',
        icon: 'tags',
        routes: [
          {
            path: '/tag/list',
            name: 'labelList',
            icon:'profile',
            component: './tag/index',
          },

        ],
      },
      {
        path: '/category',
        name: 'category',
        icon: 'database',
        routes: [
          {
            path: '/category/index',
            name: 'categoryList',
            icon:'container',
            component: './category/index',
          },

        ],
      },
      {
        path: '/timeAxis',
        name: 'timeAxis',
        icon: 'history',
        routes: [
          {
            path: '/timeAxis/index',
            name: 'timeAxisindex',
            icon:'audit',
            component: './timeAxis/index',
          },

        ],
      },
      {
        path: '/leaveMsg',
        name: 'leaveMsg',
        icon: 'mail',
        routes: [
          {
            path: '/leaveMsg/index',
            name: 'leaveMsgIndex',
            icon:'form',
            component: './leaveMsg/index',
          },

        ],
      },
    ],
  },
  {
    component: './404',
  },
]
