interface Window {
  gsap:any,
  DrawSVGPlugin:any,
  anime:any,
}

/** 通用类型 */
declare namespace Common {
  /**
   * 策略模式
   * [状态, 为true时执行的回调函数]
   */
  type StrategyAction = [boolean, () => void]
}

/** 构建时间 */
declare const PROJECT_BUILD_TIME: string

/** ECharts */
declare module 'echarts'

/** ECharts */
declare module 'DrawSVGPlugin'

declare module '@intlify/vite-plugin-vue-i18n'
