export abstract class Animal {
    abstract convertTo (someone: Animal): number
  }
  
  export class Boa extends Animal {
    convertTo = (animal: Animal): number => {
        const typek = Object.prototype.toString.call(animal)
        console.log(typek)
        console.log(animal instanceof Parrot)
        if(typek === 'Parrot')
            return 38
        return 5
    }
  }
  
  export class Parrot extends Animal {
    convertTo = (animal: Animal): number => {
        const typek = Object.prototype.toString.call(animal)
        if(typek === 'Parrot')
            return 38
        return 5
    }
  }
  
  export class Monkey extends Animal {
    convertTo = (animal: Animal): number => {
        const typek = Object.prototype.toString.call(animal)
        if(typek === 'Parrot')
            return 38
        return 5
    }
  }