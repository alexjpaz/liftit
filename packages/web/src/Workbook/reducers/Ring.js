export class Ring {
  constructor(array) {
    this.array = array;
  }

  previous(value) {
    const { array } = this;
    var idx = array.indexOf(value);
    return array[(idx - 1) % array.length];
  }

  next(value) {
    const { array } = this;
    var idx = this.array.indexOf(value);
    return array[(idx + 1) % array.length];
  }

  isFirst(value) {
    const { array } = this;
    var idx = this.array.indexOf(value);
    return idx === 0;
  }

  isLast(value) {
    const { array } = this;
    var idx = this.array.indexOf(value);
    return idx === array.length-1
  }
}
