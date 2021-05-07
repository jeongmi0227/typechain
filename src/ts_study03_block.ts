import *  as CryptoJS from 'crypto-js';
// tsc-watch 설정 
// npm link typescript
class Block{
    // 해시값 구하기
    static calculateBlockHash=(
        index:number,
        previousHash:string,
        timestamp:number,
        data:string
        ):string=>CryptoJS.SHA256(index+previousHash+timestamp+data).toString();

    // 구조 유효성검사
    static validateStructure=(aBlock:Block):boolean=>
        typeof aBlock.index==="number" && 
        typeof aBlock.hash==="string" && 
        typeof aBlock.previousHash==="string" && 
        typeof aBlock.timestamp==="number" && 
        typeof aBlock.data==="string";


    public index:number;
    public hash:string;
    public previousHash:string;
    public data:string;
    public timestamp:number;

    constructor(
        index:number,
        hash:string,
        previousHash:string,
        data:string,
        timestamp:number
        ){
            this.index=index;
            this.hash=hash;
            this.previousHash=previousHash;
            this.data=data;
            this.timestamp=timestamp;
        }
}

const genesisBlock:Block=new Block(0,"29202032dddds29","","typescript-blockchain",123456);
let blockchain:Block[]=[genesisBlock];

const getBlockchain=():Block[]=>blockchain;

// 최근 block가져오기
const getLatestBlock=():Block=>blockchain[blockchain.length-1];

const getNewTimeStamp=():number=>Math.round(new Date().getTime()/1000);

// 신규 block 생성
const createNewBlock=(data:string):Block=>{
    const previousBlock:Block=getLatestBlock();
    const newIndex:number=previousBlock.index+1;
    const newTimestamp:number=getNewTimeStamp();
    const newHash:string=Block.calculateBlockHash(
        newIndex,
        previousBlock.hash,
        newTimestamp,
        data
    );
    const newBlock:Block=new Block(
        newIndex,
        newHash,
        previousBlock.hash,
        data,
        newTimestamp
    );

    addBlock(newBlock);
    return newBlock;
};
//console.log(createNewBlock('Hello'),createNewBlock('bye bye'));

const getHashforBlock=(aBlock:Block):string=>Block.calculateBlockHash(aBlock.index,aBlock.previousHash,aBlock.timestamp,aBlock.data);
const isBlockValid=(candidateBlock:Block,previousBlock:Block):boolean=>{
    if(!Block.validateStructure(candidateBlock)){               // block 구조 체크
        return false;   
    }else if(previousBlock.index+1 !==candidateBlock.index){    // index 비교
        return false;
    }else if(previousBlock.hash!==candidateBlock.previousHash){ // 이전 hash 비교
        return false
    }else if(getHashforBlock(candidateBlock)!==candidateBlock.hash){
        return false;
    }else{
        return true;
    }
};

const addBlock=(candidateBlock:Block):void=>{
    if(isBlockValid(candidateBlock,getLatestBlock())){
        blockchain.push(candidateBlock); // block 추가
    }
}
createNewBlock("secode block");
createNewBlock("third block");
createNewBlock("fourth block");

console.log(blockchain);
export {};