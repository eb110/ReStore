interface IAnimal {
    name: string;
    age: number;
    legs: number;
    species: string;
    status: string;
    introduce: () => string;
  }

export class Animal implements IAnimal {
    constructor(public name: string, public age: number, public legs: number, public species: string, public status: string){}
    introduce():string {
        return`Hello, my name is ${this.name} and I am ${this.age} years old.`}
}

export class Shark extends Animal {
    constructor(name: string, age: number, status: string){
        super(name, age, 0, 'shark', status)
    }
}

export class Cat extends Animal {
    constructor(name: string, age: number, status: string){
        super(name, age, 4, 'cat', status)
    }
    introduce():string {
        return`${super.introduce()}  Meow meow!`}
}

export class Dog extends Animal {
    constructor(name: string, age: number, status: string, public master: string){
        super(name, age, 4, 'dog', status)
    }
    greetMaster():string {
       return `Hello ${this.master}` 
    }
}