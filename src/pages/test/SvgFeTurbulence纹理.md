## 纹理效果FeTurbulence

<p align='center'>
  <img style="background:white" src='https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/images20220825162840.png' alt='icon-basic-edit - svg icon editor' width='300' height='200' />
  <img style="background:white" src='https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/images20220825162926.png' alt='icon-basic-edit - svg icon editor' width='300' height='200' />
</p>


> https://yoksel.github.io/url-encoder/

刚开始为了实现以上效果，首先想法是，将一个svg 作为dom的背景，所以先画一个 div，一个svg
```html
<div></div>
<svg width="100%" height="100%">

</svg>
```

然后经过查询，svg有 feTurbulence 滤镜， feDiffuseLighting 灯光

[feTurbulence](http://www.qiutianaimeili.com/html/page/2021/08/2033cavfscy57b.html) 是一种湍流滤镜，根据柏林噪声来的
主要有几个参数。（这里主要使用了前三个）
- type 是对噪音的结果进行处理， turbulence / fractalNoise 。turbulence 更像湍流， fractalNoise 具有高斯效果
- baseFrequency 噪声频率，频率越高，噪声月密集。一个值的情况下 x、y 都是，两个值分别代表x、y（水平/垂直）
- numOctaves 表示八度的意思，值越大，意味着计算更多，效果更逼真
- seed 相同的 seed ， 产生的柏林噪声是相同的
- stitchTiles 定义噪声边界如何处理，经过处理，可以衔接上，看不到边界。nostitch表示噪音没有处理，会有明显边界


feDiffuseLighting 滤镜光照一个图像，使用 alpha 通道作为隆起映射。是一个 RGBA 不透明图像，取决于光的颜色、光的位置以及输入隆起映射的表面几何形状。

被照射的几何物体的确认是在指定滤镜的时候通过光照反射滤镜指定 in 属性传入 SourceGraphic来确认的。光照反射类型就是所用的光照反射滤镜，光的颜色通过定义光照反射滤镜的lighting-color属性，光源需要在光照反射滤镜内定义光源滤镜。
如果需要作用于物体上的效果。需要通过feComposite进行图形合成。

主要有几个参数
- in 指定滤镜类型
- surfaceScale 光照反射滤镜，定义图形基底的高度。可以用来控制图形与光源的距离，默认值为1
- lighting-color 灯光颜色

feDistantLight
- azimuth  就是灯光角度。指定在XY平面上（顺时针方向）的光源，在度的x轴方向的角度。
- elevation  就是灯光高度（海拔）。指定用于从XY平面中的光源朝向Z轴，在度的方向角。请注意，正Z轴指向内容

白色材质
```html
<div></div>
<svg width="100%" height="100%">
  <filter id='roughpaper'>
    <feTurbulence type="fractalNoise" baseFrequency='0.025' result='noise' numOctaves="5" />
    <feDiffuseLighting in='noise' lighting-color='#fff' surfaceScale='2'>
      <feDistantLight azimuth='45' elevation='70' />
    </feDiffuseLighting>
  </filter>
</svg>
```

```css
div{
  width:500px;
  height: 500px;
  filter: url(#roughpaper)
}
```

将其作为一个整体
```html
<svg width="100%" height="100%">
  <filter id='roughpaper'>
    <feTurbulence type="fractalNoise" baseFrequency='0.06' result='noise' numOctaves="5" />
    <feDiffuseLighting in='noise' lighting-color='#080808' surfaceScale='5'>
      <feDistantLight azimuth='75' elevation='20' />
    </feDiffuseLighting>
  </filter>
  <rect width="100%" height="100%" filter="url(#roughpaper)" style="opacity:0.18" />
</svg>
```
```css
body {
  width: 100%;
  height: 100%;
  background:#0a0a0a;
}
```

将其作为 background-image

- 将 svg 转成 base64 ，https://yoksel.github.io/url-encoder/
- 将生成的base64作为背景

```css
.header-container{
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Cfilter id='roughpaper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.025' result='noise' numOctaves='5' /%3E%3CfeDiffuseLighting in='noise' lighting-color='%23fff' surfaceScale='2'%3E%3CfeDistantLight azimuth='45' elevation='70' /%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23roughpaper)' /%3E%3C/svg%3E ");
}
```

黑暗模式和白天模式

```css
html{
  --main-background-image  :url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Cfilter id='roughpaper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.025' result='noise' numOctaves='5' /%3E%3CfeDiffuseLighting in='noise' lighting-color='%23fff' surfaceScale='2'%3E%3CfeDistantLight azimuth='45' elevation='70' /%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23roughpaper)' /%3E%3C/svg%3E ");
}
html.dark{
  --main-background-image  :url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Cfilter id='roughpaper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.06' result='noise' numOctaves='5' /%3E%3CfeDiffuseLighting in='noise' lighting-color='%23080808' surfaceScale='5'%3E%3CfeDistantLight azimuth='75' elevation='20' /%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23roughpaper)' style='opacity:0.18' /%3E%3C/svg%3E%0A");
}

.header-container{
  background-image: var(--main-background-image);
}
```
