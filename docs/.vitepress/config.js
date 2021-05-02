const fs = require('fs')

module.exports = {
  title: 'AI',
  description: "AI's Blog",
  base: '/blog/',
  themeConfig: {
    nav: [
      { text: 'web', link: '/web/', activeMatch: '^/web/' },
      {
        text: '算法',
        link: '/leetcode/',
        activeMatch: '^/leetcode/',
      },
    ],
    sidebar: {
      '/web/': getWebSidebar(),
      '/leetcode/': getLeetcodeSidebar(),
      '/': getWebSidebar(),
    },
  },
}

function getWebSidebar() {
  return [
    {
      text: 'HTML',
    },
    {
      text: 'CSS',
    },
    {
      text: 'JAVASCRIPT',
    },
    {
      text: 'REACT',
    },
  ]
}

function getLeetcodeSidebar() {
  return [
    {
      text: '数据结构',
      link: '/leetcode/dataStructure/',
      children: getCommonSidebar('/leetcode/dataStructure/'),
    },
    {
      text: '算法',
      link: '/leetcode/algorithm/',
      children: getCommonSidebar('/leetcode/algorithm/'),
    },
    {
      text: '剑指Offer',
      link: '/leetcode/offer/',
      children: getCommonSidebar('/leetcode/offer/'),
    },
    {
      text: '每日一题',
      link: '/leetcode/dayOne/',
      children: getCommonSidebar('/leetcode/dayOne', sort),
    },
  ]
}

/**
 * 排序函数
 */
function sort(dir) {
  const dirs = dir.map((item) => ({
    item: item,
    weight: parseInt(item.split('.')[0]),
  }))
  const res = dirs.sort((a, b) => a.weight - b.weight)
  return res.map((item) => item.item)
}

function getCommonSidebar(path, sort) {
  const filePath = './docs' + path
  let dirs = fs.readdirSync(filePath)
  if (sort && typeof sort === 'function') dirs = sort(dirs)
  let res = []
  for (let dir of dirs) {
    if (dir === 'index.md') continue
    res.push({
      text: dir.split('.md')[0],
      link: path + dir.split('.md')[0],
    })
  }
  return res
}
