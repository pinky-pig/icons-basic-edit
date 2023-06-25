/**
 * 上一版本更新了背景
 * 这一版本需要添加将 svg parse
 * 1.svg d parse => MLHVZCSQTA
 * 2.分段不同的路径
 * 3.将其在背景板中展示出来
 * 4.可双向选择，列表 <=> 画布
 * 5.可编辑路径
 */
const kCommandTypeRegex = /^[\t\n\f\r ]*([MLHVZCSQTAmlhvzcsqta])[\t\n\f\r ]*/
const kFlagRegex = /^[01]/
const kNumberRegex = /^[+-]?(([0-9]*\.[0-9]+)|([0-9]+\.)|([0-9]+))([eE][+-]?[0-9]+)?/
const kCoordinateRegex = kNumberRegex
const kCommaWsp = /^(([\t\n\f\r ]+,?[\t\n\f\r ]*)|(,[\t\n\f\r ]*))/

const kGrammar: { [key: string]: RegExp[] } = {
  M: [kCoordinateRegex, kCoordinateRegex],
  L: [kCoordinateRegex, kCoordinateRegex],
  H: [kCoordinateRegex],
  V: [kCoordinateRegex],
  Z: [],
  C: [kCoordinateRegex, kCoordinateRegex, kCoordinateRegex, kCoordinateRegex, kCoordinateRegex, kCoordinateRegex],
  S: [kCoordinateRegex, kCoordinateRegex, kCoordinateRegex, kCoordinateRegex],
  Q: [kCoordinateRegex, kCoordinateRegex, kCoordinateRegex, kCoordinateRegex],
  T: [kCoordinateRegex, kCoordinateRegex],
  A: [kNumberRegex, kNumberRegex, kCoordinateRegex, kFlagRegex, kFlagRegex, kCoordinateRegex, kCoordinateRegex],
}

export class SvgParser {
  /**
   * 将命令后面的路径筛选出来
   * @param type 命令类型，M、 L、 H、 V、 C、 S、 Q、 T、 A、 Z
   * @param path 全部的 svg 路径
   * @param cursor 当前命令在 path的 对应的指针下标
   */
  static components(type: string, path: string, cursor: number): [number, string[][]] {
    // 获取对应命令后面的参数
    const expectedRegexList = kGrammar[type.toUpperCase()]

    const components: string[][] = []
    while (cursor <= path.length) {
      const component: string[] = [type]
      for (const regex of expectedRegexList) {
        // 根据上一步获取的参数进行匹配
        const match = path.slice(cursor).match(regex)

        if (match !== null) {
          // push 数组里
          component.push(match[0])
          // 指针移动位置
          cursor += match[0].length
          // 匹配空格换行等符号，移动指针下标
          const ws = path.slice(cursor).match(kCommaWsp)
          if (ws !== null)
            cursor += ws[0].length
        }
        else if (component.length === 1) {
          return [cursor, components]
        }
        else {
          throw new Error(`malformed path (first error at ${cursor})`)
        }
      }
      components.push(component)
      if (expectedRegexList.length === 0)
        return [cursor, components]

      if (type === 'm')
        type = 'l'

      if (type === 'M')
        type = 'L'
    }
    throw new Error(`malformed path (first error at ${cursor})`)
  }

  /**
   * 将 path 遍历 slice ，匹配对应的命令。
   * match(kCommandTypeRegex) 匹配命令，SvgParser.components 将其数字筛选出来
   * @param path svg path 路径
   * @returns 转换后的路径
   */
  public static parse(path: string): string[][] {
    let cursor = 0 // 当前的指针在全部的 path 的下标
    let tokens: string[][] = []
    while (cursor < path.length) {
      const match = path.slice(cursor).match(kCommandTypeRegex)
      if (match !== null) {
        const command = match[1]
        cursor += match[0].length
        const componentList = SvgParser.components(command, path, cursor)
        cursor = componentList[0]
        // tokens 数组，路径数组 -- [['M', '4', '8'],['L', '10', '1']]
        tokens = [...tokens, ...componentList[1]]
      }
      else {
        throw new Error(`malformed path (first error at ${cursor})`)
      }
    }
    return tokens
  }
}
