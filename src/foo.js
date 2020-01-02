export default class Fo{
  constructor(name){
    this.name=name
  }
  hello(){
    return `welcome, ${this.name}!`
  }
  say(){
    return `${this.name}, did you love dogs?`
  }
}
