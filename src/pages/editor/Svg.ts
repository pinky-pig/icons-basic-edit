export class Point {
  constructor(
    public x:number,
    public y:number,
  ) {}
}
export class SvgPoint extends Point{
  movable = true
  constructor(
    x:number,
    y:number,
    movable = true
  ){
    super(x,y)
    this.movable = movable
  }
}
export class SvgControlPoint extends SvgPoint{
  subIndex: number = 0
  constructor(
    point: Point,
    public relations: Point[],
    movable = true
  ){
    super(point.x, point.y, movable)
  }
}
export abstract class SvgItem{
  values: number[]
  relative: boolean
  previousPoint: Point = new Point(0,0)
  absolutePoints: SvgPoint[] = []
  absoluteControlPoints: SvgControlPoint[] = []

  constructor(values:number[],relative:boolean){
    this.values = values
    this.relative = relative
  }

  public static Make(rawItem: string[]):SvgItem {
    let result: SvgItem | undefined = undefined
    const relative = rawItem[0].toUpperCase() !==rawItem[0]
    const values = rawItem.slice(1).map(it => parseFloat(it))

    switch (rawItem[0].toUpperCase()) {

      default:
        break;
    }
    if (!result) {
      throw 'Invalid SVG item'
    }
    return result
  }
}

class DummySvgItem extends SvgItem {
  constructor() {
    super([], false);
  }
}
/** 定义 d 的集中操作 */
class MoveTo extends SvgItem{
  static readonly key = 'M'
}
class LineTo extends SvgItem{
  static readonly key = "L"
}
class CurveTo extends SvgItem {
  static readonly key = 'C';
}
class SmoothCurveTo extends SvgItem{
  static readonly key = 'S'
}
class QuadraticBezierCurveTo extends SvgItem{
  static readonly key = 'Q'
}
class SmoothQuadraticBezierCurveTo extends SvgItem{
  static readonly key = 'T'
}
class ClosePath extends SvgItem{
  static readonly key = 'Z'
}
class HorizontalLineTo extends SvgItem{
  static readonly key = 'H'
}
class VerticalLineTo extends SvgItem{
  static readonly key = 'V'
}
class EllipticalArcTo extends SvgItem{
  static readonly key = 'A'
}
