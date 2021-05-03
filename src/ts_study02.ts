// class vs interface ts만사용할경우 interface
// 만약 ts를 react,node등 같이 사용한다면 class 사용
// private 일경우 클래스 밖에서 수정불가 
class Human{
    public name:string;
    //private age:number;
    public age:number;
    public gender:string;

    constructor(name:string,age:number,gender?:string){
        this.name=name;
        this.age=age;
        this.gender=gender;
    }
}
const jm=new Human('jeongmi', 18,'female');


const sayHi=(person:Human):string=>{
    return `Hello ${person.name}, you are ${person.age}, you are a ${person.gender}!`;
}

console.log(sayHi(jm));
export{};

