# 🚑vue3使用GSAP

```bash
pnpm i gsap
```


第一个参数可以是类名、id名，也可以是dom
第二行：.to()方法，gsap核心方法，类似于css动画中的to，简单来说就是根据后面设置的参数，确定元素最终显示什么效果。第一个参数是绑定需要动画的元素，可以是类名或者id。此处为类名为‘star’的星星图案。
第三行：duration参数，设置动画时间
第四行：scale参数，可以设置元素最终放大到多少倍。random是一个随机函数，达到的效果就是不同的元素，动画最终的效果会形成不同大小的星星。
第五行：repeat参数，设置动画重复的次数，-1表示无限重复。
第六行：yoyo参数，悠悠参数，开启后会自动形成一个往复的动画，有利于动画衔接。
第七行：opacity参数，设置元素最终的透明度。
repeat：动画重复的次数。
repeatDelay：两次重复之间的间隔时间（以秒为单位）。
yoyo：如果为true，则每次重复播放都会前后交替进行。
delay：时间轴开始之前的延迟（以秒为单位）。
onComplete：时间线播放完毕后调用的函数。
var tl = gsap.timeline({
  repeat: 1, 
  yoyo: true, 
  onRepeat: onRepeatHandler,
  onComplete: onCompleteHandler
});
