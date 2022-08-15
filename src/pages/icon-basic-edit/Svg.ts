
import { defineComponent, h } from 'vue-demi'
interface SvgType {
  path:string
}
export const UseSvgBorder = defineComponent<SvgType>({
  name: 'SvgBorder',
  props: ['path'] as unknown as undefined,
  setup(props, { slots }) {

    let fixedProperty = {
      'version': '1.1',
      'xmlns': 'http://www.w3.org/2000/svg',
      'width': '1em',
      'height': '1em',
      'transform': 'scale(1)',
      'stroke' : '#80a2f1',
      'stroke-width': 2,
      'stroke-linejoin': "round",
      // 'stroke-dasharray': "0.5",
      style:{
        position:'absolute',
        color:'transparent'
      }
    }
    return () => {
      // if (props.path)
        return h('svg',
          {
            ...fixedProperty
          },
          [
            h('g',
              { innerHTML:props.path },
            ),
          ],
        )
    }
  },
})
