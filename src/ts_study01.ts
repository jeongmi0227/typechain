// 인터페이스는  js로 변환되지않는다
// Object를 파라메타로 넘겨줄때는 아래와같이 정의
interface Human{
    name:string;
    age:number;
    gender:string;
}
const person={
    name:"jeongmi",
    age:18,
    gender:"female"
   
}

const sayHi=(person:Human):string=>{
    return `Hello ${person.name}, you are ${person.age}, you are a ${person.gender}!`;
}

console.log(sayHi(person));
export{};

