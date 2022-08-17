# Svg网格背景
> 学习 [svg-path-editor](https://yqnn.github.io/svg-path-editor/) 源码

- 网格背景
- 格子尺寸适应 svg 的大小
- 背景尺寸适应dom的尺寸

## 1.创建一个 Dom Container （父组件）

```html
<div ref="canvas" class=" flex-1 min-w-10">
  <Canvas
    :viewPortWidth="cfg.viewPortWidth"
    :viewPortHeight="cfg.viewPortHeight"
    :viewPortX="cfg.viewPortX"
    :viewPortY="cfg.viewPortY"
    :strokeWidth="strokeWidth"
    ></Canvas>
</div>
```

## 2.创建Canvas.vue组件 -- Svg格子画布 （子组件）

- 主要一个 svg 标签，和四个 line 标签。
 - svg 很显然必须的
 - 四个 line 分别代表着 x 轴、 y轴和 遍历出来的 平行于 x 轴 和 平行于 y 轴的直线
- 主要有四个值 viewPortX 、viewPortY 、viewPortWidth 、viewPortHeight
- 对于 svg 标签，有一个变量 viewBox
- 对于 line 标签， 有四个变量 x1 、y1 、 x2 、y2

```html
<template>
  <svg
    width="100%"
    height="100%"
    :viewBox="viewPortX+' '+viewPortY+' '+viewPortWidth+' '+viewPortHeight"
    >
    <line
      :x1="props.viewPortX"
      y1="0"
      :x2="props.viewPortX + props.viewPortWidth"
      y2="0"
      stroke="orange"
      fill="transparent"
      :stroke-width="strokeWidth * 4"
      />
    <line
      :x1="0"
      :y1="props.viewPortY"
      :x2="0"
      :y2="props.viewPortY + props.viewPortHeight"
      stroke="orange"
      fill="transparent"
      :stroke-width="strokeWidth * 4"
      />
    <line
      v-for="item in xGrid"
      :x1="item"
      :y1="props.viewPortY"
      :x2="item"
      :y2="props.viewPortY + props.viewPortHeight"
      stroke="#99999990"
      fill="transparent"
      :stroke-width="strokeWidth"
      />
    <line
      v-for="item in yGrid"
      :x1="props.viewPortX"
      :y1="item"
      :x2="props.viewPortX + props.viewPortWidth"
      :y2="item"
      stroke="#99999990"
      fill="transparent"
      :stroke-width="strokeWidth"
      />
  </svg>
</template>
```

## 3.父组件中计算 viewport 高宽及直线数量



```ts
let canvasWidth = 100
let canvasHeight = 100
let cfg = reactive({
  viewPortX:0,
  viewPortY:0,
  viewPortWidth:0,
  viewPortHeight:0,
})
let strokeWidth = ref(0)
```
