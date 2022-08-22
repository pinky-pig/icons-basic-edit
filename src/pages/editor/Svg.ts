import { SvgParser } from "./svg-parser";

export class Svg {
  path: SvgItem[];
  constructor(path: string) {
    // 将 svg path 各个命令转换成数组
    const rawPath = SvgParser.parse(path);
    this.path = rawPath.map(it => SvgItem.Make(it));
    this.refreshAbsolutePositions()
  }
  refreshAbsolutePositions() {
    let previous: SvgItem | null = null;
    let origin = new Point(0, 0);
    for (const item of this.path) {
      item.refreshAbsolutePoints(origin, previous);
      item.refreshAbsoluteControlPoints(origin, previous);

      item.absolutePoints.forEach(it => it.itemReference = item);
      item.absoluteControlPoints.forEach(it => it.itemReference = item);

      if (item instanceof MoveTo || item instanceof ClosePath) {
        origin = item.targetLocation();
      }
      previous = item;
    }
  }
}



export function formatNumber(v: number, d: number, minify = false): string {
  let result = v.toFixed(d)
    .replace(/^(-?[0-9]*\.([0-9]*[1-9])?)0*$/, '$1')
    .replace(/\.$/, '');
  if (minify) {
    result = result.replace(/^(-?)0\./, '$1.');
  }
  return result;
}

export class Point {
  constructor(
    public x: number,
    public y: number
  ) { }
}

export class SvgPoint extends Point {
  itemReference: SvgItem = new DummySvgItem();
  movable = true;
  constructor(
    x: number,
    y: number,
    movable = true
  ) {
    super(x, y);
    this.movable = movable;
  }
}
export class SvgControlPoint extends SvgPoint {
  subIndex: number = 0;
  constructor(
    point: Point,
    public relations: Point[],
    movable = true
  ) {
    super(point.x, point.y, movable);
  }
}

export abstract class SvgItem {

  constructor(values: number[], relative: boolean) {
    this.values = values;
    this.relative = relative;
  }
  relative: boolean;
  values: number[];
  previousPoint: Point = new Point(0, 0);
  absolutePoints: SvgPoint[] = [];
  absoluteControlPoints: SvgControlPoint[] = [];

  public static Make(rawItem: string[]): SvgItem {
    let result: SvgItem | undefined = undefined;
    const relative = rawItem[0].toUpperCase() !== rawItem[0];
    const values = rawItem.slice(1).map(it => parseFloat(it));
    switch (rawItem[0].toUpperCase()) {
      case MoveTo.key: result = new MoveTo(values, relative); break;
      case LineTo.key: result = new LineTo(values, relative); break;
      case HorizontalLineTo.key: result = new HorizontalLineTo(values, relative); break;
      case VerticalLineTo.key: result = new VerticalLineTo(values, relative); break;
      case ClosePath.key: result = new ClosePath(values, relative); break;
      case CurveTo.key: result = new CurveTo(values, relative); break;
      case SmoothCurveTo.key: result = new SmoothCurveTo(values, relative); break;
      case QuadraticBezierCurveTo.key: result = new QuadraticBezierCurveTo(values, relative); break;
      case SmoothQuadraticBezierCurveTo.key: result = new SmoothQuadraticBezierCurveTo(values, relative); break;
      case EllipticalArcTo.key: result = new EllipticalArcTo(values, relative); break;
    }
    if (!result) {
      throw 'Invalid SVG item';
    }
    return result;
  }

  public static MakeFrom(origin: SvgItem, previous: SvgItem, newType: string) {
    const target = origin.targetLocation();
    const x = target.x.toString();
    const y = target.y.toString();
    let values: string[] = [];
    const absoluteType = newType.toUpperCase();
    switch (absoluteType) {
      case MoveTo.key: values = [MoveTo.key, x, y]; break;
      case LineTo.key: values = [LineTo.key, x, y]; break;
      case HorizontalLineTo.key: values = [HorizontalLineTo.key, x]; break;
      case VerticalLineTo.key: values = [VerticalLineTo.key, y]; break;
      case ClosePath.key: values = [ClosePath.key]; break;
      case CurveTo.key: values = [CurveTo.key, '0', '0', '0', '0', x, y]; break;
      case SmoothCurveTo.key: values = [SmoothCurveTo.key, '0', '0', x, y]; break;
      case QuadraticBezierCurveTo.key: values = [QuadraticBezierCurveTo.key, '0', '0', x, y]; break;
      case SmoothQuadraticBezierCurveTo.key: values = [SmoothQuadraticBezierCurveTo.key, x, y]; break;
      case EllipticalArcTo.key: values = [EllipticalArcTo.key, '1', '1', '0', '0', '0', x, y]; break;
    }
    const result = SvgItem.Make(values);

    const controlPoints = origin.absoluteControlPoints;

    result.previousPoint = previous.targetLocation();
    result.absolutePoints = [target];
    result.resetControlPoints(previous);

    if ((origin instanceof CurveTo || origin instanceof SmoothCurveTo)
      && (result instanceof CurveTo || result instanceof SmoothCurveTo)) {
      if (result instanceof CurveTo) {
        result.values[0] = controlPoints[0].x;
        result.values[1] = controlPoints[0].y;
        result.values[2] = controlPoints[1].x;
        result.values[3] = controlPoints[1].y;
      }
      if (result instanceof SmoothCurveTo) {
        result.values[0] = controlPoints[1].x;
        result.values[1] = controlPoints[1].y;
      }
    }

    if ((origin instanceof QuadraticBezierCurveTo || origin instanceof SmoothQuadraticBezierCurveTo)
      && (result instanceof QuadraticBezierCurveTo)) {
      result.values[0] = controlPoints[0].x;
      result.values[1] = controlPoints[0].y;
    }

    if (newType !== absoluteType) {
      result.setRelative(true);
    }
    return result;
  }

  public refreshAbsolutePoints(origin: Point, previous: SvgItem | null) {
    this.previousPoint = previous ? previous.targetLocation() : new Point(0, 0);
    this.absolutePoints = [];
    let current = previous ? previous.targetLocation() : new Point(0, 0);
    if (!this.relative) {
      current = new Point(0, 0);
    }
    for (let i = 0; i < this.values.length - 1; i += 2) {
      this.absolutePoints.push(
        new SvgPoint(current.x + this.values[i], current.y + this.values[i + 1])
      );
    }
  }

  public setRelative(newRelative: boolean) {
    if (this.relative !== newRelative) {
      this.relative = false;
      if (newRelative) {
        this.translate(-this.previousPoint.x, -this.previousPoint.y);
        this.relative = true;
      } else {
        this.translate(this.previousPoint.x, this.previousPoint.y);
      }
    }
  }

  public refreshAbsoluteControlPoints(origin: Point, previous: SvgItem | null) {
    this.absoluteControlPoints = [];
  }

  public resetControlPoints(previousTarget: SvgItem) {
  }

  public translate(x: number, y: number, force = false) {
    if (!this.relative || force) {
      this.values.forEach((val, idx) => {
        this.values[idx] = val + (idx % 2 === 0 ? x : y);
      });
    }
  }

  public scale(kx: number, ky: number) {
    this.values.forEach((val, idx) => {
      this.values[idx] = val * (idx % 2 === 0 ? kx : ky);
    });
  }

  public targetLocation(): SvgPoint {
    const l = this.absolutePoints.length;
    return this.absolutePoints[l - 1];
  }

  public setTargetLocation(pts: Point) {
    const loc = this.targetLocation();
    const dx = pts.x - loc.x;
    const dy = pts.y - loc.y;
    const l = this.values.length;
    this.values[l - 2] += dx;
    this.values[l - 1] += dy;
  }

  public setControlLocation(idx: number, pts: Point) {
    const loc = this.absolutePoints[idx];
    const dx = pts.x - loc.x;
    const dy = pts.y - loc.y;
    this.values[2 * idx] += dx;
    this.values[2 * idx + 1] += dy;
  }

  public controlLocations(): SvgControlPoint[] {
    return this.absoluteControlPoints;
  }

  public getType(): string {
    let typeKey = (this.constructor as any).key as string;
    if (this.relative) {
      typeKey = typeKey.toLowerCase();
    }
    return typeKey;
  }

  public asStandaloneString(): string {
    return ['M',
      this.previousPoint.x,
      this.previousPoint.y,
      this.getType(),
      ...this.values
    ].join(' ');
  }

  public asString(decimals: number = 4, minify: boolean = false, trailingItems: SvgItem[] = []): string {
    const strValues = [this.values, ...trailingItems.map(it => it.values)]
      .reduce((acc, val) => acc.concat(val), [])
      .map(it => formatNumber(it, decimals, minify));
    return [this.getType(), ...strValues].join(' ');
  }
}

class DummySvgItem extends SvgItem {
  constructor() {
    super([], false);
  }
}

class MoveTo extends SvgItem {
  static readonly key = 'M';
}
class LineTo extends SvgItem {
  static readonly key = 'L';
}
class CurveTo extends SvgItem {
  static readonly key = 'C';
  public refreshAbsoluteControlPoints(origin: Point, previousTarget: SvgItem | null) {
    if (!previousTarget) {
      throw 'Invalid path';
    }
    this.absoluteControlPoints = [
      new SvgControlPoint(this.absolutePoints[0], [previousTarget.targetLocation()]),
      new SvgControlPoint(this.absolutePoints[1], [this.targetLocation()])
    ];
  }
  public resetControlPoints(previousTarget: SvgItem) {
    const a = previousTarget.targetLocation();
    const b = this.targetLocation();
    const d = this.relative ? a : new Point(0, 0);
    this.values[0] = 2 * a.x / 3 + b.x / 3 - d.x;
    this.values[1] = 2 * a.y / 3 + b.y / 3 - d.y;
    this.values[2] = a.x / 3 + 2 * b.x / 3 - d.x;
    this.values[3] = a.y / 3 + 2 * b.y / 3 - d.y;
  }
}
class SmoothCurveTo extends SvgItem {
  static readonly key = 'S';
  public refreshAbsoluteControlPoints(origin: Point, previousTarget: SvgItem | null) {
    this.absoluteControlPoints = [];
    if ((previousTarget instanceof CurveTo || previousTarget instanceof SmoothCurveTo)) {
      const prevLoc = previousTarget.targetLocation();
      const prevControl = previousTarget.absoluteControlPoints[1];
      const pts = new Point(2 * prevLoc.x - prevControl.x, 2 * prevLoc.y - prevControl.y);
      this.absoluteControlPoints.push(
        new SvgControlPoint(pts, [prevLoc], false)
      );
    } else {
      const current = previousTarget ? previousTarget.targetLocation() : new Point(0, 0);
      const pts = new Point(current.x, current.y);
      this.absoluteControlPoints.push(
        new SvgControlPoint(pts, [], false)
      );
    }
    this.absoluteControlPoints.push(
      new SvgControlPoint(this.absolutePoints[0], [this.targetLocation()]),
    );
  }
  public asStandaloneString(): string {
    return [
      'M',
      this.previousPoint.x,
      this.previousPoint.y,
      'C',
      this.absoluteControlPoints[0].x,
      this.absoluteControlPoints[0].y,
      this.absoluteControlPoints[1].x,
      this.absoluteControlPoints[1].y,
      this.absolutePoints[1].x,
      this.absolutePoints[1].y
    ].join(' ');
  }
  public resetControlPoints(previousTarget: SvgItem) {
    const a = previousTarget.targetLocation();
    const b = this.targetLocation();
    const d = this.relative ? a : new Point(0, 0);
    this.values[0] = a.x / 3 + 2 * b.x / 3 - d.x;
    this.values[1] = a.y / 3 + 2 * b.y / 3 - d.y;
  }
  public setControlLocation(idx: number, pts: Point) {
    const loc = this.absoluteControlPoints[1];
    const dx = pts.x - loc.x;
    const dy = pts.y - loc.y;
    this.values[0] += dx;
    this.values[1] += dy;
  }
}
class QuadraticBezierCurveTo extends SvgItem {
  static readonly key = 'Q';
  public refreshAbsoluteControlPoints(origin: Point, previousTarget: SvgItem | null) {
    if (!previousTarget) {
      throw 'Invalid path';
    }
    this.absoluteControlPoints = [
      new SvgControlPoint(this.absolutePoints[0], [previousTarget.targetLocation(), this.targetLocation()])
    ];
  }
  public resetControlPoints(previousTarget: SvgItem) {
    const a = previousTarget.targetLocation();
    const b = this.targetLocation();
    const d = this.relative ? a : new Point(0, 0);
    this.values[0] = a.x / 2 + b.x / 2 - d.x;
    this.values[1] = a.y / 2 + b.y / 2 - d.y;
  }
}
class SmoothQuadraticBezierCurveTo extends SvgItem {
  static readonly key = 'T';
  public refreshAbsoluteControlPoints(origin: Point, previousTarget: SvgItem | null) {
    if (!(previousTarget instanceof QuadraticBezierCurveTo || previousTarget instanceof SmoothQuadraticBezierCurveTo)) {
      const previous = previousTarget ? previousTarget.targetLocation() : new Point(0, 0);
      const pts = new Point(previous.x, previous.y);
      this.absoluteControlPoints = [
        new SvgControlPoint(pts, [], false)
      ];
    } else {
      const prevLoc = previousTarget.targetLocation();
      const prevControl = previousTarget.absoluteControlPoints[0];
      const pts = new Point(2 * prevLoc.x - prevControl.x, 2 * prevLoc.y - prevControl.y);
      this.absoluteControlPoints = [
        new SvgControlPoint(pts, [prevLoc, this.targetLocation()], false)
      ];
    }
  }
  public asStandaloneString(): string {
    return [
      'M',
      this.previousPoint.x,
      this.previousPoint.y,
      'Q',
      this.absoluteControlPoints[0].x,
      this.absoluteControlPoints[0].y,
      this.absolutePoints[0].x,
      this.absolutePoints[0].y
    ].join(' ');
  }
}

class ClosePath extends SvgItem {
  static readonly key = 'Z';
  public refreshAbsolutePoints(origin: Point, previous: SvgItem | null) {
    this.previousPoint = previous ? previous.targetLocation() : new Point(0, 0);
    this.absolutePoints = [new SvgPoint(origin.x, origin.y, false)];
  }

}
class HorizontalLineTo extends SvgItem {
  static readonly key = 'H';
  public refreshAbsolutePoints(origin: Point, previous: SvgItem | null) {
    this.previousPoint = previous ? previous.targetLocation() : new Point(0, 0);
    if (this.relative) {
      this.absolutePoints = [new SvgPoint(this.values[0] + this.previousPoint.x, this.previousPoint.y)];
    } else {
      this.absolutePoints = [new SvgPoint(this.values[0], this.previousPoint.y)];
    }
  }
  public setTargetLocation(pts: Point) {
    const loc = this.targetLocation();
    const dx = pts.x - loc.x;
    this.values[0] += dx;
  }
}
class VerticalLineTo extends SvgItem {
  static readonly key = 'V';
  public translate(x: number, y: number, force = false) {
    if (!this.relative) {
      this.values[0] += y;
    }
  }
  public scale(kx: number, ky: number) {
    this.values[0] *= ky;
  }
  public refreshAbsolutePoints(origin: Point, previous: SvgItem | null) {
    this.previousPoint = previous ? previous.targetLocation() : new Point(0, 0);
    if (this.relative) {
      this.absolutePoints = [new SvgPoint(this.previousPoint.x, this.values[0] + this.previousPoint.y)];
    } else {
      this.absolutePoints = [new SvgPoint(this.previousPoint.x, this.values[0])];
    }
  }
  public setTargetLocation(pts: Point) {
    const loc = this.targetLocation();
    const dy = pts.y - loc.y;
    this.values[0] += dy;
  }
}
class EllipticalArcTo extends SvgItem {
  static readonly key = 'A';
  public translate(x: number, y: number, force = false) {
    if (!this.relative) {
      this.values[5] += x;
      this.values[6] += y;
    }
  }
  public scale(kx: number, ky: number) {
    const a = this.values[0];
    const b = this.values[1];
    const angle = Math.PI * this.values[2] / 180.;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const A = b * b * ky * ky * cos * cos + a * a * ky * ky * sin * sin;
    const B = 2 * kx * ky * cos * sin * (b * b - a * a);
    const C = a * a * kx * kx * cos * cos + b * b * kx * kx * sin * sin;
    const F = -(a * a * b * b * kx * kx * ky * ky);
    const det = B * B - 4 * A * C;
    const val1 = Math.sqrt((A - C) * (A - C) + B * B);

    // New rotation:
    this.values[2] = B !== 0 ? Math.atan((C - A - val1) / B) * 180 / Math.PI : (A < C ? 0 : 90);

    // New radius-x, radius-y
    this.values[0] = -Math.sqrt(2 * det * F * ((A + C) + val1)) / det;
    this.values[1] = -Math.sqrt(2 * det * F * ((A + C) - val1)) / det;

    // New target
    this.values[5] *= kx;
    this.values[6] *= ky;

    // New sweep flag
    this.values[4] = kx * ky >= 0 ? this.values[4] : 1 - this.values[4];
  }
  public refreshAbsolutePoints(origin: Point, previous: SvgItem | null) {
    this.previousPoint = previous ? previous.targetLocation() : new Point(0, 0);
    if (this.relative) {
      this.absolutePoints = [new SvgPoint(this.values[5] + this.previousPoint.x, this.values[6] + this.previousPoint.y)];
    } else {
      this.absolutePoints = [new SvgPoint(this.values[5], this.values[6])];
    }
  }

  public asString(decimals: number = 4, minify: boolean = false, trailingItems: SvgItem[] = []): string {
    if (!minify) {
      return super.asString(decimals, minify, trailingItems);
    } else {
      const strValues = [this.values, ...trailingItems.map(it => it.values)]
        .map(it => it.map(it2 => formatNumber(it2, decimals, minify)))
        .map(v => `${v[0]} ${v[1]} ${v[2]} ${v[3]}${v[4]}${v[5]} ${v[6]}`);
      return [this.getType(), ...strValues].join(' ');
    }
  }
}
