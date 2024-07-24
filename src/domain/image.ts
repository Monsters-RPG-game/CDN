export default class Image {
  private readonly _name: string;

  get name(): string {
    return this._name;
  }

  constructor(name: string) {
    this._name = name;
  }
}
