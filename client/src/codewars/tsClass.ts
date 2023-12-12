export class Cuboid {
    length: number;
    width: number;
    height: number;
    constructor(length: number, width: number, height: number){
        this.length = length;
        this.width = width;
        this.height = height;
    }

    get surfaceArea(): number {
       return 1;
    }

    get volume(): number {
        return this.length * this.width * this.height;
    }
  }

  export class Cube extends Cuboid {
    constructor(side: number){
        super(side, side, side)
    }
  }