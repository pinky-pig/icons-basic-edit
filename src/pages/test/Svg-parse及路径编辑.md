上一版本更新了背景
这一版本需要添加将 svg parse
1.svg d parse => MLHVZCSQTA
2.分段不同的路径
3.将其在背景板中展示出来
4.可双向选择，列表 <=> 画布
5.可编辑路径

这里做的是，首先第一步将 svg 路径通过正则匹配出来各个命令。
一个猜想，是否可以先渲染，然后通过 XPath 获取各命令（circle、rect、path...），但是path里面的命令（M、L...）还是需要正则匹配

## 正则表达式
> 阮一峰正则学习网站 http://javascript.ruanyifeng.com/stdlib/regexp.html
> 1.实例方法： test、exec
> 2.字符串的实例方法： match、 search、 replace、 split
> 3.匹配规则： 字面量字符和元字符、 转义字符、 特殊字符 、 字符类、 预定义模式、 重复类、 量词符、 贪婪模式、 修饰符、 组匹配

### 位置字符 ^ 和 $

> ^ 表示字符串的开始位置
> $ 表示字符串的结束位置

```ts
// test必须出现在开始位置
/^test/.test('test123') // true

// test必须出现在结束位置
/test$/.test('new test') // true

// 从开始位置到结束位置只有test
/^test$/.test('test') // true
/^test$/.test('test test') // false
```

> ^ 除了标志开头之外，还有一层意思，取反，要有中括号内写^才是取反
```ts
// /[^abc]/ 匹配除了a b c 之外的所有字符
/[^abc]/.test('hello world') // true
/[^abc]/.test('bbc') // false
// 当不使用全局匹配时，match 仅返回第一次匹配成功的结果
'hello world'.match(/[^abc]/g) //  ["h","e","l","l","o"," ","w","o","r","l","d"]
'hello world'.match(/[^abc]/) //   ["h"]
```

### 量词符 ? * +

> ?-- 问号表示某个模式出现0次或1次，等同于{0, 1}。
> *-- 星号表示某个模式出现0次或多次，等同于{0,}。
> +-- 加号表示某个模式出现1次或多次，等同于{1,}。

```ts
// t 出现0次或1次
/t?est/.test('test') // true
/t?est/.test('est') // true

// t 出现1次或多次
/t+est/.test('test') // true
/t+est/.test('ttest') // true
/t+est/.test('est') // false

// t 出现0次或多次
/t*est/.test('test') // true
/t*est/.test('ttest') // true
/t*est/.test('tttest') // true
/t*est/.test('est') // true
```



### 字符类 [] ^ -
字符类（class）表示有一系列字符可供选择，只要匹配其中一个就可以了。所有可供选择的字符都放在方括号内，比如[xyz] 表示x、y、z之中任选一个匹配。

```ts
/[abc]/.test('hello world') // false
/[abc]/.test('apple') // true
```

（1）脱字符（^）

如果方括号内的第一个字符是[^]，则表示除了字符类之中的字符，其他字符都可以匹配。比如，[^xyz]表示除了x、y、z之外都可以匹配。
```ts
/[^abc]/.test('hello world') // true
/[^abc]/.test('bbc') // false
```
上面代码中，字符串hello world不包含字母a、b、c中的任一个，所以返回true；字符串bbc不包含a、b、c以外的字母，所以返回false。

如果方括号内没有其他字符，即只有[^]，就表示匹配一切字符，其中包括换行符。相比之下，点号作为元字符（.）是不包括换行符的。
```ts
var s = 'Please yes\nmake my day!';

s.match(/yes.*day/) // null
s.match(/yes[^]*day/) // [ 'yes\nmake my day']
```

上面代码中，字符串s含有一个换行符，点号不包括换行符，所以第一个正则表达式匹配失败；第二个正则表达式[^]包含一切字符，所以匹配成功。

> 注意，脱字符只有在字符类的第一个位置才有特殊含义，否则就是字面含义。

（2）连字符（-）

某些情况下，对于连续序列的字符，连字符（-）用来提供简写形式，表示字符的连续范围。比如，[abc]可以写成[a-c]，[0123456789]可以写成[0-9]，同理[A-Z]表示26个大写字母。

```ts
/a-z/.test('b') // false
/[a-z]/.test('b') // true
```
上面代码中，当连字号（dash）不出现在方括号之中，就不具备简写的作用，只代表字面的含义，所以不匹配字符b。只有当连字号用在方括号之中，才表示连续的字符序列。

以下都是合法的字符类简写形式。
```ts
[0-9.,]
[0-9a-fA-F]
[a-zA-Z0-9-]
[1-31]

```
上面代码中最后一个字符类[1-31]，不代表1到31，只代表1到3。





### 组匹配 ()

> (注意，使用组匹配时，不宜同时使用g修饰符，否则match方法不会捕获分组的内容)[http://javascript.ruanyifeng.com/stdlib/regexp.html#toc11]

```ts
// 第一个模式没有括号，结果+只表示重复字母d，第二个模式有括号，结果+就表示匹配fred这个词。
/fred+/.test('fredd') // true
/(fred)+/.test('fredfred') // true
```


## 分析正则表达式

```ts
const kCommandTypeRegex = /^[\t\n\f\r ]*([MLHVZCSQTAmlhvzcsqta])[\t\n\f\r ]*/;
const kFlagRegex = /^[01]/;
const kNumberRegex = /^[+-]?(([0-9]*\.[0-9]+)|([0-9]+\.)|([0-9]+))([eE][+-]?[0-9]+)?/;
const kCoordinateRegex = kNumberRegex;
const kCommaWsp = /^(([\t\n\f\r ]+,?[\t\n\f\r ]*)|(,[\t\n\f\r ]*))/;
```

<p align='center'>
  <img style="background:white" src='https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/images20220822150310.png' alt='kCommandTypeRegex' />
</p>
kCommandTypeRegex：用来匹配 svg d 的命令 ，简言之就是 匹配以空格换行等开头的（可重复0或多次）然后是[MLHVZCSQTAmlhvzcsqta]骑宠一个的字符串，M、 L、 H、 V、 C、 S、 Q、 T、 A、 Z 。=> ^ 代表字符串要以这个开头；[\t\n\f\r ] 匹配满足其中一项就行，*是量词符，{0,}，表示重复0或多次空格或换行等；([MLHVZCSQTAmlhvzcsqta])代表匹配 svg 的 d 命令。

kFlagRegex：匹配以0或者1开头的字符串。

<p align='center'>
  <img style="background:white" src='https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/images20220822150502.png' alt='kNumberRegex' />
</p>
kNumberRegex：用来匹配数字的。^[+-]? 代表着匹配正负数，以+ 或- 开头，？有0次或1次；`(([0-9]*\.[0-9]+)|([0-9]+\.)|([0-9]+))`  组匹配，满足 `([0-9]*\.[0-9]+)`或者`([0-9]+\.)`或者`([0-9]+)`匹配带不带小数点及后面的数字；`([eE][+-]?[0-9]+)?`科学计数法。

<p align='center'>
  <img style="background:white" src='https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/images20220822150555.png' alt='kNumberRegex' />
</p>
kCommaWsp：用来匹配`,`，[\t\n\f\r ]+ 代表空格或换行{0,,} ,`,?[\t\n\f\r ]*)`代表`,`0或者1次。
