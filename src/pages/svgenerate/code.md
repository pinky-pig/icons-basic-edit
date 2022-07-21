
<script setup>
  import { watch } from 'vue'
  import { useSvgenerateStore } from "../../store/svgenerate.ts";
  const store = useSvgenerateStore()

  let name = '666'
  watch(() => store.svgObj.name,() => {
    console.log(store.svgObj.name);
    name = store.svgObj.name
  })
</script>

```js
  function vitesse() {
    const foo = 'bar'
    console.log(foo)
  }
```
{{name}}

