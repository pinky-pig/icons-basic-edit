import{g as n,o as a,c as t,h as p}from"./index.12dd4ed4.js";const e={class:"prose prose-sm m-auto text-left"},o=p(`<p>\u4E0A\u4E00\u7248\u672C\u66F4\u65B0\u4E86\u80CC\u666F \u8FD9\u4E00\u7248\u672C\u9700\u8981\u6DFB\u52A0\u5C06 svg parse 1.svg d parse =&gt; MLHVZCSQTA 2.\u5206\u6BB5\u4E0D\u540C\u7684\u8DEF\u5F84 3.\u5C06\u5176\u5728\u80CC\u666F\u677F\u4E2D\u5C55\u793A\u51FA\u6765 4.\u53EF\u53CC\u5411\u9009\u62E9\uFF0C\u5217\u8868 &lt;=&gt; \u753B\u5E03 5.\u53EF\u7F16\u8F91\u8DEF\u5F84</p><p>\u8FD9\u91CC\u505A\u7684\u662F\uFF0C\u9996\u5148\u7B2C\u4E00\u6B65\u5C06 svg \u8DEF\u5F84\u901A\u8FC7\u6B63\u5219\u5339\u914D\u51FA\u6765\u5404\u4E2A\u547D\u4EE4\u3002 \u4E00\u4E2A\u731C\u60F3\uFF0C\u662F\u5426\u53EF\u4EE5\u5148\u6E32\u67D3\uFF0C\u7136\u540E\u901A\u8FC7 XPath \u83B7\u53D6\u5404\u547D\u4EE4\uFF08circle\u3001rect\u3001path\u2026\uFF09\uFF0C\u4F46\u662Fpath\u91CC\u9762\u7684\u547D\u4EE4\uFF08M\u3001L\u2026\uFF09\u8FD8\u662F\u9700\u8981\u6B63\u5219\u5339\u914D</p><h2>\u6B63\u5219\u8868\u8FBE\u5F0F</h2><blockquote><p>\u962E\u4E00\u5CF0\u6B63\u5219\u5B66\u4E60\u7F51\u7AD9 <a href="http://javascript.ruanyifeng.com/stdlib/regexp.html" target="_blank" rel="noopener">http://javascript.ruanyifeng.com/stdlib/regexp.html</a> 1.\u5B9E\u4F8B\u65B9\u6CD5\uFF1A test\u3001exec 2.\u5B57\u7B26\u4E32\u7684\u5B9E\u4F8B\u65B9\u6CD5\uFF1A match\u3001 search\u3001 replace\u3001 split 3.\u5339\u914D\u89C4\u5219\uFF1A \u5B57\u9762\u91CF\u5B57\u7B26\u548C\u5143\u5B57\u7B26\u3001 \u8F6C\u4E49\u5B57\u7B26\u3001 \u7279\u6B8A\u5B57\u7B26 \u3001 \u5B57\u7B26\u7C7B\u3001 \u9884\u5B9A\u4E49\u6A21\u5F0F\u3001 \u91CD\u590D\u7C7B\u3001 \u91CF\u8BCD\u7B26\u3001 \u8D2A\u5A6A\u6A21\u5F0F\u3001 \u4FEE\u9970\u7B26\u3001 \u7EC4\u5339\u914D</p></blockquote><h3>\u4F4D\u7F6E\u5B57\u7B26 ^ \u548C $</h3><blockquote><p>^ \u8868\u793A\u5B57\u7B26\u4E32\u7684\u5F00\u59CB\u4F4D\u7F6E $ \u8868\u793A\u5B57\u7B26\u4E32\u7684\u7ED3\u675F\u4F4D\u7F6E</p></blockquote><pre class="language-ts"><code class="language-ts"><span class="token comment">// test\u5FC5\u987B\u51FA\u73B0\u5728\u5F00\u59CB\u4F4D\u7F6E</span>
<span class="token operator">/</span><span class="token operator">^</span>test<span class="token operator">/</span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;test123&#39;</span><span class="token punctuation">)</span> <span class="token comment">// true</span>

<span class="token comment">// test\u5FC5\u987B\u51FA\u73B0\u5728\u7ED3\u675F\u4F4D\u7F6E</span>
<span class="token operator">/</span>test$<span class="token operator">/</span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;new test&#39;</span><span class="token punctuation">)</span> <span class="token comment">// true</span>

<span class="token comment">// \u4ECE\u5F00\u59CB\u4F4D\u7F6E\u5230\u7ED3\u675F\u4F4D\u7F6E\u53EA\u6709test</span>
<span class="token operator">/</span><span class="token operator">^</span>test$<span class="token operator">/</span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;test&#39;</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
<span class="token operator">/</span><span class="token operator">^</span>test$<span class="token operator">/</span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;test test&#39;</span><span class="token punctuation">)</span> <span class="token comment">// false</span>
</code></pre><blockquote><p>^ \u9664\u4E86\u6807\u5FD7\u5F00\u5934\u4E4B\u5916\uFF0C\u8FD8\u6709\u4E00\u5C42\u610F\u601D\uFF0C\u53D6\u53CD\uFF0C\u8981\u6709\u4E2D\u62EC\u53F7\u5185\u5199^\u624D\u662F\u53D6\u53CD</p></blockquote><pre class="language-ts"><code class="language-ts"><span class="token comment">// /[^abc]/ \u5339\u914D\u9664\u4E86a b c \u4E4B\u5916\u7684\u6240\u6709\u5B57\u7B26</span>
<span class="token operator">/</span><span class="token punctuation">[</span><span class="token operator">^</span>abc<span class="token punctuation">]</span><span class="token operator">/</span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;hello world&#39;</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
<span class="token operator">/</span><span class="token punctuation">[</span><span class="token operator">^</span>abc<span class="token punctuation">]</span><span class="token operator">/</span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;bbc&#39;</span><span class="token punctuation">)</span> <span class="token comment">// false</span>
<span class="token comment">// \u5F53\u4E0D\u4F7F\u7528\u5168\u5C40\u5339\u914D\u65F6\uFF0Cmatch \u4EC5\u8FD4\u56DE\u7B2C\u4E00\u6B21\u5339\u914D\u6210\u529F\u7684\u7ED3\u679C</span>
<span class="token string">&#39;hello world&#39;</span><span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">[^abc]</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">)</span> <span class="token comment">//  [&quot;h&quot;,&quot;e&quot;,&quot;l&quot;,&quot;l&quot;,&quot;o&quot;,&quot; &quot;,&quot;w&quot;,&quot;o&quot;,&quot;r&quot;,&quot;l&quot;,&quot;d&quot;]</span>
<span class="token string">&#39;hello world&#39;</span><span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">[^abc]</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span> <span class="token comment">//   [&quot;h&quot;]</span>
</code></pre><h3>\u91CF\u8BCD\u7B26 ? * +</h3><blockquote><p>?-- \u95EE\u53F7\u8868\u793A\u67D0\u4E2A\u6A21\u5F0F\u51FA\u73B00\u6B21\u62161\u6B21\uFF0C\u7B49\u540C\u4E8E{0, 1}\u3002 *-- \u661F\u53F7\u8868\u793A\u67D0\u4E2A\u6A21\u5F0F\u51FA\u73B00\u6B21\u6216\u591A\u6B21\uFF0C\u7B49\u540C\u4E8E{0,}\u3002 \xB1- \u52A0\u53F7\u8868\u793A\u67D0\u4E2A\u6A21\u5F0F\u51FA\u73B01\u6B21\u6216\u591A\u6B21\uFF0C\u7B49\u540C\u4E8E{1,}\u3002</p></blockquote><pre class="language-ts"><code class="language-ts"><span class="token comment">// t \u51FA\u73B00\u6B21\u62161\u6B21</span>
<span class="token operator">/</span>t<span class="token operator">?</span>est<span class="token operator">/</span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;test&#39;</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
<span class="token operator">/</span>t<span class="token operator">?</span>est<span class="token operator">/</span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;est&#39;</span><span class="token punctuation">)</span> <span class="token comment">// true</span>

<span class="token comment">// t \u51FA\u73B01\u6B21\u6216\u591A\u6B21</span>
<span class="token operator">/</span>t<span class="token operator">+</span>est<span class="token operator">/</span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;test&#39;</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
<span class="token operator">/</span>t<span class="token operator">+</span>est<span class="token operator">/</span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;ttest&#39;</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
<span class="token operator">/</span>t<span class="token operator">+</span>est<span class="token operator">/</span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;est&#39;</span><span class="token punctuation">)</span> <span class="token comment">// false</span>

<span class="token comment">// t \u51FA\u73B00\u6B21\u6216\u591A\u6B21</span>
<span class="token operator">/</span>t<span class="token operator">*</span>est<span class="token operator">/</span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;test&#39;</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
<span class="token operator">/</span>t<span class="token operator">*</span>est<span class="token operator">/</span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;ttest&#39;</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
<span class="token operator">/</span>t<span class="token operator">*</span>est<span class="token operator">/</span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;tttest&#39;</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
<span class="token operator">/</span>t<span class="token operator">*</span>est<span class="token operator">/</span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;est&#39;</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
</code></pre><h3>\u5B57\u7B26\u7C7B [] ^ -</h3><p>\u5B57\u7B26\u7C7B\uFF08class\uFF09\u8868\u793A\u6709\u4E00\u7CFB\u5217\u5B57\u7B26\u53EF\u4F9B\u9009\u62E9\uFF0C\u53EA\u8981\u5339\u914D\u5176\u4E2D\u4E00\u4E2A\u5C31\u53EF\u4EE5\u4E86\u3002\u6240\u6709\u53EF\u4F9B\u9009\u62E9\u7684\u5B57\u7B26\u90FD\u653E\u5728\u65B9\u62EC\u53F7\u5185\uFF0C\u6BD4\u5982[xyz] \u8868\u793Ax\u3001y\u3001z\u4E4B\u4E2D\u4EFB\u9009\u4E00\u4E2A\u5339\u914D\u3002</p><pre class="language-ts"><code class="language-ts"><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">[abc]</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;hello world&#39;</span><span class="token punctuation">)</span> <span class="token comment">// false</span>
<span class="token operator">/</span><span class="token punctuation">[</span>abc<span class="token punctuation">]</span><span class="token operator">/</span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;apple&#39;</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
</code></pre><p>\uFF081\uFF09\u8131\u5B57\u7B26\uFF08^\uFF09</p><p>\u5982\u679C\u65B9\u62EC\u53F7\u5185\u7684\u7B2C\u4E00\u4E2A\u5B57\u7B26\u662F[^]\uFF0C\u5219\u8868\u793A\u9664\u4E86\u5B57\u7B26\u7C7B\u4E4B\u4E2D\u7684\u5B57\u7B26\uFF0C\u5176\u4ED6\u5B57\u7B26\u90FD\u53EF\u4EE5\u5339\u914D\u3002\u6BD4\u5982\uFF0C[^xyz]\u8868\u793A\u9664\u4E86x\u3001y\u3001z\u4E4B\u5916\u90FD\u53EF\u4EE5\u5339\u914D\u3002</p><pre class="language-ts"><code class="language-ts"><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">[^abc]</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;hello world&#39;</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
<span class="token operator">/</span><span class="token punctuation">[</span><span class="token operator">^</span>abc<span class="token punctuation">]</span><span class="token operator">/</span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;bbc&#39;</span><span class="token punctuation">)</span> <span class="token comment">// false</span>
</code></pre><p>\u4E0A\u9762\u4EE3\u7801\u4E2D\uFF0C\u5B57\u7B26\u4E32hello world\u4E0D\u5305\u542B\u5B57\u6BCDa\u3001b\u3001c\u4E2D\u7684\u4EFB\u4E00\u4E2A\uFF0C\u6240\u4EE5\u8FD4\u56DEtrue\uFF1B\u5B57\u7B26\u4E32bbc\u4E0D\u5305\u542Ba\u3001b\u3001c\u4EE5\u5916\u7684\u5B57\u6BCD\uFF0C\u6240\u4EE5\u8FD4\u56DEfalse\u3002</p><p>\u5982\u679C\u65B9\u62EC\u53F7\u5185\u6CA1\u6709\u5176\u4ED6\u5B57\u7B26\uFF0C\u5373\u53EA\u6709[^]\uFF0C\u5C31\u8868\u793A\u5339\u914D\u4E00\u5207\u5B57\u7B26\uFF0C\u5176\u4E2D\u5305\u62EC\u6362\u884C\u7B26\u3002\u76F8\u6BD4\u4E4B\u4E0B\uFF0C\u70B9\u53F7\u4F5C\u4E3A\u5143\u5B57\u7B26\uFF08.\uFF09\u662F\u4E0D\u5305\u62EC\u6362\u884C\u7B26\u7684\u3002</p><pre class="language-ts"><code class="language-ts"><span class="token keyword">var</span> s <span class="token operator">=</span> <span class="token string">&#39;Please yes\\nmake my day!&#39;</span><span class="token punctuation">;</span>

s<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">yes.*day</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span> <span class="token comment">// null</span>
s<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">yes[^]*day</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span> <span class="token comment">// [ &#39;yes\\nmake my day&#39;]</span>
</code></pre><p>\u4E0A\u9762\u4EE3\u7801\u4E2D\uFF0C\u5B57\u7B26\u4E32s\u542B\u6709\u4E00\u4E2A\u6362\u884C\u7B26\uFF0C\u70B9\u53F7\u4E0D\u5305\u62EC\u6362\u884C\u7B26\uFF0C\u6240\u4EE5\u7B2C\u4E00\u4E2A\u6B63\u5219\u8868\u8FBE\u5F0F\u5339\u914D\u5931\u8D25\uFF1B\u7B2C\u4E8C\u4E2A\u6B63\u5219\u8868\u8FBE\u5F0F[^]\u5305\u542B\u4E00\u5207\u5B57\u7B26\uFF0C\u6240\u4EE5\u5339\u914D\u6210\u529F\u3002</p><blockquote><p>\u6CE8\u610F\uFF0C\u8131\u5B57\u7B26\u53EA\u6709\u5728\u5B57\u7B26\u7C7B\u7684\u7B2C\u4E00\u4E2A\u4F4D\u7F6E\u624D\u6709\u7279\u6B8A\u542B\u4E49\uFF0C\u5426\u5219\u5C31\u662F\u5B57\u9762\u542B\u4E49\u3002</p></blockquote><p>\uFF082\uFF09\u8FDE\u5B57\u7B26\uFF08-\uFF09</p><p>\u67D0\u4E9B\u60C5\u51B5\u4E0B\uFF0C\u5BF9\u4E8E\u8FDE\u7EED\u5E8F\u5217\u7684\u5B57\u7B26\uFF0C\u8FDE\u5B57\u7B26\uFF08-\uFF09\u7528\u6765\u63D0\u4F9B\u7B80\u5199\u5F62\u5F0F\uFF0C\u8868\u793A\u5B57\u7B26\u7684\u8FDE\u7EED\u8303\u56F4\u3002\u6BD4\u5982\uFF0C[abc]\u53EF\u4EE5\u5199\u6210[a-c]\uFF0C[0123456789]\u53EF\u4EE5\u5199\u6210[0-9]\uFF0C\u540C\u7406[A-Z]\u8868\u793A26\u4E2A\u5927\u5199\u5B57\u6BCD\u3002</p><pre class="language-ts"><code class="language-ts"><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">a-z</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;b&#39;</span><span class="token punctuation">)</span> <span class="token comment">// false</span>
<span class="token operator">/</span><span class="token punctuation">[</span>a<span class="token operator">-</span>z<span class="token punctuation">]</span><span class="token operator">/</span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;b&#39;</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
</code></pre><p>\u4E0A\u9762\u4EE3\u7801\u4E2D\uFF0C\u5F53\u8FDE\u5B57\u53F7\uFF08dash\uFF09\u4E0D\u51FA\u73B0\u5728\u65B9\u62EC\u53F7\u4E4B\u4E2D\uFF0C\u5C31\u4E0D\u5177\u5907\u7B80\u5199\u7684\u4F5C\u7528\uFF0C\u53EA\u4EE3\u8868\u5B57\u9762\u7684\u542B\u4E49\uFF0C\u6240\u4EE5\u4E0D\u5339\u914D\u5B57\u7B26b\u3002\u53EA\u6709\u5F53\u8FDE\u5B57\u53F7\u7528\u5728\u65B9\u62EC\u53F7\u4E4B\u4E2D\uFF0C\u624D\u8868\u793A\u8FDE\u7EED\u7684\u5B57\u7B26\u5E8F\u5217\u3002</p><p>\u4EE5\u4E0B\u90FD\u662F\u5408\u6CD5\u7684\u5B57\u7B26\u7C7B\u7B80\u5199\u5F62\u5F0F\u3002</p><pre class="language-ts"><code class="language-ts"><span class="token punctuation">[</span><span class="token number">0</span><span class="token operator">-</span><span class="token number">9.</span><span class="token punctuation">,</span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token number">0</span><span class="token operator">-</span>9a<span class="token operator">-</span>fA<span class="token operator">-</span><span class="token constant">F</span><span class="token punctuation">]</span>
<span class="token punctuation">[</span>a<span class="token operator">-</span>zA<span class="token operator">-</span><span class="token constant">Z0</span><span class="token operator">-</span><span class="token number">9</span><span class="token operator">-</span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token number">1</span><span class="token operator">-</span><span class="token number">31</span><span class="token punctuation">]</span>

</code></pre><p>\u4E0A\u9762\u4EE3\u7801\u4E2D\u6700\u540E\u4E00\u4E2A\u5B57\u7B26\u7C7B[1-31]\uFF0C\u4E0D\u4EE3\u88681\u523031\uFF0C\u53EA\u4EE3\u88681\u52303\u3002</p><h3>\u7EC4\u5339\u914D ()</h3><blockquote><p>(\u6CE8\u610F\uFF0C\u4F7F\u7528\u7EC4\u5339\u914D\u65F6\uFF0C\u4E0D\u5B9C\u540C\u65F6\u4F7F\u7528g\u4FEE\u9970\u7B26\uFF0C\u5426\u5219match\u65B9\u6CD5\u4E0D\u4F1A\u6355\u83B7\u5206\u7EC4\u7684\u5185\u5BB9)[<a href="http://javascript.ruanyifeng.com/stdlib/regexp.html#toc11" target="_blank" rel="noopener">http://javascript.ruanyifeng.com/stdlib/regexp.html#toc11</a>]</p></blockquote><pre class="language-ts"><code class="language-ts"><span class="token comment">// \u7B2C\u4E00\u4E2A\u6A21\u5F0F\u6CA1\u6709\u62EC\u53F7\uFF0C\u7ED3\u679C+\u53EA\u8868\u793A\u91CD\u590D\u5B57\u6BCDd\uFF0C\u7B2C\u4E8C\u4E2A\u6A21\u5F0F\u6709\u62EC\u53F7\uFF0C\u7ED3\u679C+\u5C31\u8868\u793A\u5339\u914Dfred\u8FD9\u4E2A\u8BCD\u3002</span>
<span class="token operator">/</span>fred<span class="token operator">+</span><span class="token operator">/</span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;fredd&#39;</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
<span class="token operator">/</span><span class="token punctuation">(</span>fred<span class="token punctuation">)</span><span class="token operator">+</span><span class="token operator">/</span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;fredfred&#39;</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
</code></pre><h2>\u5206\u6790\u6B63\u5219\u8868\u8FBE\u5F0F</h2><pre class="language-ts"><code class="language-ts"><span class="token keyword">const</span> kCommandTypeRegex <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^[\\t\\n\\f\\r ]*([MLHVZCSQTAmlhvzcsqta])[\\t\\n\\f\\r ]*</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">;</span>
<span class="token keyword">const</span> kFlagRegex <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^[01]</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">;</span>
<span class="token keyword">const</span> kNumberRegex <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^[+-]?(([0-9]*\\.[0-9]+)|([0-9]+\\.)|([0-9]+))([eE][+-]?[0-9]+)?</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">;</span>
<span class="token keyword">const</span> kCoordinateRegex <span class="token operator">=</span> kNumberRegex<span class="token punctuation">;</span>
<span class="token keyword">const</span> kCommaWsp <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^(([\\t\\n\\f\\r ]+,?[\\t\\n\\f\\r ]*)|(,[\\t\\n\\f\\r ]*))</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">;</span>
</code></pre><p align="center"><img style="background:white;" src="https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/images20220822150310.png" alt="kCommandTypeRegex"></p> kCommandTypeRegex\uFF1A\u7528\u6765\u5339\u914D svg d \u7684\u547D\u4EE4 \uFF0C\u7B80\u8A00\u4E4B\u5C31\u662F \u5339\u914D\u4EE5\u7A7A\u683C\u6362\u884C\u7B49\u5F00\u5934\u7684\uFF08\u53EF\u91CD\u590D0\u6216\u591A\u6B21\uFF09\u7136\u540E\u662F[MLHVZCSQTAmlhvzcsqta]\u9A91\u5BA0\u4E00\u4E2A\u7684\u5B57\u7B26\u4E32\uFF0CM\u3001 L\u3001 H\u3001 V\u3001 C\u3001 S\u3001 Q\u3001 T\u3001 A\u3001 Z \u3002=&gt; ^ \u4EE3\u8868\u5B57\u7B26\u4E32\u8981\u4EE5\u8FD9\u4E2A\u5F00\u5934\uFF1B[\\t\\n\\f\\r ] \u5339\u914D\u6EE1\u8DB3\u5176\u4E2D\u4E00\u9879\u5C31\u884C\uFF0C*\u662F\u91CF\u8BCD\u7B26\uFF0C{0,}\uFF0C\u8868\u793A\u91CD\u590D0\u6216\u591A\u6B21\u7A7A\u683C\u6216\u6362\u884C\u7B49\uFF1B([MLHVZCSQTAmlhvzcsqta])\u4EE3\u8868\u5339\u914D svg \u7684 d \u547D\u4EE4\u3002 <p>kFlagRegex\uFF1A\u5339\u914D\u4EE50\u6216\u80051\u5F00\u5934\u7684\u5B57\u7B26\u4E32\u3002</p><p align="center"><img style="background:white;" src="https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/images20220822150502.png" alt="kNumberRegex"></p> kNumberRegex\uFF1A\u7528\u6765\u5339\u914D\u6570\u5B57\u7684\u3002^[+-]? \u4EE3\u8868\u7740\u5339\u914D\u6B63\u8D1F\u6570\uFF0C\u4EE5+ \u6216- \u5F00\u5934\uFF0C\uFF1F\u67090\u6B21\u62161\u6B21\uFF1B\`(([0-9]*\\.[0-9]+)|([0-9]+\\.)|([0-9]+))\` \u7EC4\u5339\u914D\uFF0C\u6EE1\u8DB3 \`([0-9]*\\.[0-9]+)\`\u6216\u8005\`([0-9]+\\.)\`\u6216\u8005\`([0-9]+)\`\u5339\u914D\u5E26\u4E0D\u5E26\u5C0F\u6570\u70B9\u53CA\u540E\u9762\u7684\u6570\u5B57\uFF1B\`([eE][+-]?[0-9]+)?\`\u79D1\u5B66\u8BA1\u6570\u6CD5\u3002 <p align="center"><img style="background:white;" src="https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/images20220822150555.png" alt="kNumberRegex"></p> kCommaWsp\uFF1A\u7528\u6765\u5339\u914D\`,\`\uFF0C[\\t\\n\\f\\r ]+ \u4EE3\u8868\u7A7A\u683C\u6216\u6362\u884C{0,,} ,\`,?[\\t\\n\\f\\r ]*)\`\u4EE3\u8868\`,\`0\u6216\u80051\u6B21\u3002 <h2>\u904D\u5386 svg path</h2><ol><li>\u4E00\u4E2A\u6307\u9488\u4E0B\u6807 cursor : number</li><li>\u8DEF\u5F84\u6570\u7EC4 tokens: string[][]</li><li>\u904D\u5386\u547D\u4EE4 \u79FB\u52A8\u4E0B\u6807\uFF0C return tokens</li><li>\u6BCF\u4E00\u4E2A\u547D\u4EE4\u6709\u5BF9\u5E94\u7684\u53C2\u6570\uFF0C\u6BD4\u5982M \u6709\u4E24\u4E2A\u53C2\u6570\uFF0CL \u6709\u4E24\u4E2A\u53C2\u6570\uFF0C Z \u6CA1\u6709\u53C2\u6570</li><li>\u9488\u5BF9\u5168\u90E8\u7684 path \uFF0C\u6307\u9488\u4E00\u4E2A\u4E00\u4E2A\u5F80\u540E\u8D70\uFF0C\u8DDF\u53C2\u6570\u8FDB\u884C\u5339\u914D\uFF0C\u8DDF\u7A7A\u683C\u8FDB\u884C\u5339\u914D\uFF0C\u6700\u540E return</li></ol><h2>\u52A8\u753B\u8BBE\u8BA1\u601D\u8DEF</h2><ol><li>\u521D\u59CB\u7684svg \u2013 default</li><li>\u5F53\u524D\u7684\u7F16\u8F91\u540E\u7684svg \u2013 current</li><li>\u88AB\u622A\u56FE\u7684svg \u2013 index</li></ol>`,46),c=[o],m=[],d={__name:"Svg-parse\u53CA\u8DEF\u5F84\u7F16\u8F91",setup(l,{expose:s}){return s({frontmatter:{meta:[]}}),n({meta:[]}),(u,i)=>(a(),t("div",e,c))}};export{d as default,m as meta};
