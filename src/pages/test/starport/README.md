
<p align='center'>
  <img src='https://github.com/pinky-pig/pic-bed/blob/main/images/starport.jpeg?raw=true' alt='Vitesse - Opinionated Vite Starter Template' width='600'/>
</p>

## 目的

- 一个公共组件component在不同的页面A,B跳转显示。


## 简述

- 两个组件：一个真实的dom组件（Proxy组件），一个是占位的组件（Container组件）。
- Proxy组件在根节点动画移动，故不会销毁。
- 移动动画其实就是在原来的组件外，包一层div，动画样式写在这个div上。
- 移动到位置后，通过\<teleport />传送到占位的container组件处。
- 如果没有Container组件，Proxy组件就销毁。


## 开发步骤

- 一个方法，入参是组件，返回两个组件，一个Proxy组件，一个Container组件。
- Proxy组件开始移动和结束移动的事件。开始事件是传进来的触发条件，结束事件是动画结束事件。
- Proxy组件动画结束时候的样式，Container组件传入。


## 贝塞尔曲线
> https://juejin.cn/post/7000525748578549774
