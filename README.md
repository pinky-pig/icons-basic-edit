<p align='center'>
  <img src='https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/images20220816114227.png' alt='icon-basic-edit - svg icon editor' width='300'/>
  <img src='https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/images20220816114403.png' alt='icon-basic-edit - svg icon editor' width='300'/>
</p>

- part one 编辑生成svg icon：https://yqnn.github.io/svg-path-editor/
- part two svg动画：https://svgartista.net/


[icons-basic-edit](https://github.com/pinky-pig/icons-basic-edit.git) 目的是为了学习[Vu3](https://cn.vuejs.org/guide/introduction.html)、[Vite](https://vitejs.dev/) 、[Svg](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial)等，基于[@antfu](https://github.com/antfu)的 [vitesse](https://github.com/antfu/vitesse) 模板所开发的编辑 icon 的工具。

## 技术点

- 🚑 [Iconify](https://iconify.design)

- 🐱‍🏍 [VirtualList](https://vueuse.org/core/usevirtuallist/#usevirtuallist)

- 🚛 [OnClickOutSide](https://vueuse.org/core/onclickoutside/#onclickoutside)

- 🛺 [Starport](https://github.com/antfu/vue-starport.git)

- 🚢 [GSAP](https://greensock.com/gsap/)

- 🚀 [Svg](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial)

  - Svg-描边动画（Stroke）

  - Svg-路径动画（Path）

  - Svg-变形动画（Morph）

- ⛵ [Matrix-矩阵变形]()

- 🚟 [Bézier-曲线]()


### Icons
使用的图标库为开源图标库[Iconify](https://iconify.design)，从这些图标集中选择使用[🔍Icônes](https://icones.netlify.app/)。本项目中是[carbon](https://icones.netlify.app/collection/carbon)图标集。

```bash
pnpm i @iconify/json
pnpm i @iconify-json/carbon
```
获取全部carbon集合中全部的图标
```js
async function getIcon() {
  const { lookupCollections, locate } = require('@iconify/json')
  const iconSets = await lookupCollections()
  const prefixes = Object.keys(iconSets)
  // 所有的icon
  prefixes
    .map((prefix) => {
      const item = iconSets[prefix]
      // prefix: name (total icons)
      return `${prefix}: ${item.name} (${item.total} icons)`
    })
    .join('\n')

  // Get location of Taber Icons JSON file
  // const tabler = locate('tabler');
  const carbon = locate('carbon')
  return carbon
}

router.get('/fetchSvgFromIconify', async (req, res) => {
  path = await getIcon()
  const file = require(path)
  res.send(file)
})
```

### Vueuse
@antfu开源的工具函数，在项目中运用起来很方便😘。


待补充。。。

接下来的功能：开发svg编辑器和svg动画编辑
- 新建svg标尺和网格背景面板
- 新增svg路径，每一项是每一条路径，在网格中移动编辑
- 选中每一项，可为其添加GSAP动画
