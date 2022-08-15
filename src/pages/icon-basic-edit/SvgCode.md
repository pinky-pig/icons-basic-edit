---
name: code
---

<script setup>
  import { watch,ref } from 'vue'
  import { useSvgStore } from "../../store";
  const storeSvg = useSvgStore()
  const name = ref('')
  watch(() => storeSvg.selectedSvgDom, (v1, v2) => {
    if (v1?.outerHTML)
      name.value = v1.outerHTML
  })
</script>


<PreviewCode :code="name" :type="'html'" />




