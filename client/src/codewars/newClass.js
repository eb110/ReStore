/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
class Game {
    constructor(name, level = 0){
        this.name = new Player(name)
        this.level = /^\d+$/g.test('' + level) ? +('' + level) : 0
        this.floors = []
    }
  }
  
  class Player {
    constructor(name = 'Player') {
        this.name = name && typeof name === 'string' && name.length > 0 ? name : 'Player'
        this.health = 100.00
        this.position = {x: 0, y: 0}
        this.damage = 10.00
        this.luck = 1.00
    }
  }
  
  class Monster {
    constructor(level) {
        this.level = level
    }
  }
  
  class Map {
    constructor(level) {
        this.level = level
    }
  }