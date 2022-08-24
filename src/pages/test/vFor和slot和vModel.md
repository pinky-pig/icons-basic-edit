
> https://stackoverflow.com/questions/67826487/how-to-use-v-model-with-v-for-array-of-strings-in-vuex-store
```html
<Command>
  <div class="h-[300px] overflow-auto cursor-default">
    <div class=" flex flex-row gap-2 mb-2 px-4 py-2 " v-for="item,index in commandList" >
      <div class="bg-orange-300 w-6">{{index}}</div>
      <div class=" max-w-4 w-4">{{item.getType()}}</div>
      <div class="w-6" v-for="value,idx in item.values" contenteditable>
        <input
          type="text"
          class="w-full text-center"
          :value="value"
          @input="v => updateCommandValue(v,index, idx)"
          @blur="inputBlur"
          @focus="inputFocus"
          />
      </div>
    </div>
  </div>
</Command>
```
