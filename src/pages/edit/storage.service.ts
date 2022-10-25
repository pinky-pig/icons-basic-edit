export class StoredPath {
  name = 'default'
  path = ''
  creationDate: Date = new Date()
  changeDate: Date = new Date()
}

export class StorageStore {
  storedPaths: StoredPath[] = []
  constructor() {
    this.load()
  }

  hasPath(name: string) {
    return this.getPath(name) !== undefined
  }

  getPath(name = 'current'): StoredPath | undefined {
    return this.storedPaths.find(it => it.name === name)
  }

  removePath(name: string) {
    this.storedPaths = this.storedPaths.filter(it => it.name !== name)
    this.save()
  }

  addPath(name = 'current', path: string) {
    let p = this.getPath(name)
    if (!p) {
      p = new StoredPath()
      this.storedPaths.push(p)
      p.name = name
    }
    p.changeDate = new Date()
    p.path = path
    this.save()
  }

  isEmpty(): boolean {
    return this.storedPaths.filter(it => !!it.name).length === 0
  }

  load() {
    this.storedPaths = []
    const stored = localStorage.getItem('storedPaths')
    if (stored) {
      const parsed = JSON.parse(stored) as any[]
      parsed.forEach((it) => {
        it.creationDate = new Date(it.creationDate)
        it.changeDate = new Date(it.changeDate)
      })
      this.storedPaths = parsed
    }
  }

  save() {
    localStorage.setItem('storedPaths', JSON.stringify(this.storedPaths))
  }
}
