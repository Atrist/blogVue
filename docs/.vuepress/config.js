const fs = require('fs')
const path = require('path')
module.exports = {
  lang: 'zh-CN',
  title: 'Atrist',
  description:
    '前端的基础知识集中, 相关业务场景的解决方案集中, 项目源码阅读过程中的一些感悟',
  base: '/',
  head: [
    [
      'meta',
      {
        name: 'google-site-verification',
        content: 'dmBwuwXMb8fdF5HD1TOPyGTFAQUzV9O9vN4Mh06slnY',
      },
    ],
    [
      'meta',
      {
        name: 'baidu-site-verification',
        content: 'code-HK08p9tJHw',
      },
    ],
  ],
  themeConfig: {
    search: false,
    nav: [
      {
        text: '基础知识',
        ariaLabel: '基础知识',
        items: [
          {
            text: '前端',
            link: '/know/front/',
            items: [
              { text: 'HTML', link: '/know/front/html/' },
              { text: 'CSS', link: '/know/front/css/' },
              { text: 'Javascript', link: '/know/front/javascript/' },
            ],
          },
          {
            text: '后端',
            link: '/know/back/',
            items: [{ text: 'NodeJs', link: '/know/back/nodejs/' }],
          },
          {
            text: '工具',
            link: '/know/tool/',
            items: [{ text: 'git', link: '/know/tool/git/' }],
          },
          { text: '算法', link: '/know/algorithm/' },
        ],
      },
      {
        text: '解决方案',
        link: '/answer/',
        activeMatch: '^/answer/',
      },
      {
        text: '源码阅读',
        link: '/code/',
        items: [
          {
            text: 'vitepress',
            link: '/code/vitepress/',
          },
          {
            text: 'npm包',
            link: '/code/npm/',
          },
        ],
      },
      {
        text: '项目集成',
        link: '/workshop/',
        items: [{ text: 'Cli', link: '/workshop/cli/' }],
      },
    ],
    sidebar: {
      '/know/front/': [
        {
          title: 'HTML',
          path: '/know/front/html/',
          collapsable: false,
          children: getFilesByPath('/know/front/html/', true),
        },
        {
          title: 'CSS',
          path: '/know/front/css/',
          collapsable: false,
          children: getFilesByPath('/know/front/css/', true),
        },
        {
          title: 'Javascript',
          path: '/know/front/javascript/',
          collapsable: false,
          children: getFilesByPath('/know/front/javascript/', true),
        },
      ],
      '/know/back/': [
        {
          title: 'NodeJs',
          path: '/know/back/nodejs/',
          collapsable: false,
          children: getFilesByPath('/know/back/nodejs/', true),
        },
      ],
      '/know/algorithm/': [
        {
          title: '算法',
          path: '/know/algorithm/',
          collapsable: false,
          children: getFilesByPath('/know/algorithm/'),
        },
      ],
      '/know/tool/': [
        {
          title: 'Git',
          path: '/know/tool/git/',
          collapsable: false,
          children: getFilesByPath('/know/tool/git/', true),
        },
      ],
      '/answer/': [
        {
          title: '前端',
          collapsable: false,
          path: '/answer/web/',
          children: ['/answer/web/拖拽.md'],
        },
        {
          title: '剑指offer',
          collapsable: false,
          path: '/answer/offer/',
          children: getFilesByPath('/answer/offer/'),
        },
        {
          title: '业务',
          collapsable: false,
          path: '/answer/business/',
          children: getFilesByPath('/answer/business/'),
        },
        {
          title: '面试',
          collapsable: false,
          path: '/answer/interview/',
          children: getFilesByPath('/answer/interview/'),
        },
      ],
      '/workshop/': [
        {
          title: 'cli',
          collapsable: false,
          path: '/workshop/cli/',
          children: getFilesByPath('/workshop/cli/', true),
        },
      ],
      '/code/': [
        {
          title: 'viepress',
          path: '/code/vitepress/',
          collapsable: false,
          children: getFilesByPath('/code/vitepress/'),
        },
        {
          title: 'NPM包',
          path: '/code/npm/',
          collapsable: false,
          sidebarDepth: 2,
          children: getFilesByPath('/code/npm/', true),
        },
      ],
    },
  },
  plugins: [
    [
      'sitemap',
      {
        hostname: 'https://atrist.github.io/',
      },
    ],
    [
      'autometa',
      {
        site: {
          name: 'Atrist',
        },
      },
    ],
    ['baidu-autopush'],
    ['seo'],
    ['code-copy'],
  ],
}

function getFilesByPath(filepath, sortFlag) {
  // 获取文件夹下面的目录
  const filePath = path.join(__dirname, '../', filepath)
  const files = fs.readdirSync(filePath)
  let res = []
  for (let file of files) {
    if (file === 'index.md') continue
    // 判断是否为文件夹
    const fileStat = fs.statSync(path.join(filePath, file))
    if (fileStat.isFile())
      res.push({ title: file.split('.md')[0], path: filepath + file })
    else continue
  }
  return sortFlag ? sort(res) : res
}
function sort(data) {
  data.sort((a, b) => {
    parseInt(a.title.split('-')[0]) - parseInt(b.title.split('-')[0])
  })
  // 标题删除 排序数字
  return data.map((item) => ({ ...item, title: item.title.split('-')[1] }))
}
