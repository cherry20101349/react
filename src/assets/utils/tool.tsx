// // interface Human {
// //     name: string;
// //     eat(): void;
// // }
// // class Child implements Human {
// //     constructor () {

// //     }
// //     eat () {

// //     }
// //     name: 'bob'
// // }
// // class boy extends Child {

// // }
// // let bob = new boy()
// // console.log(bob)
// // type T1 = ReturnType<() => number>
// // // export  = {}
// // exports.a = 1;
// // exports.b = 2;
// // console.log(process.env)
// // (() => ({a: 1}))
// // type A {
// //     age: number
// // }\
// // class A {
// //     age: number;
// //     constructor () {
// //         this.age = 1
// //     }
// //     getValue () {
// //         console.log(this.age)
// //         setTimeout(() =>{
// //             console.log(++this.age)
// //         }, 1000);
// //     }
// //     get prop() {
// //         console.log('getter', this)
// //         return 123
// //     }
// //     set prop (val) {
// //         console.log('setter', val)
// //     }
// // }
// // let a = new A()
// // a.prop = 123
// // let a = {
// //     b: ''
// // }
// // Object.defineProperty(a, 'b', {
// //     set: function() {
// //         return 345
// //     },
// //     get: function () {
// //         return 123
// //     }
// // })
// // console.log(a)
//  class AlertDialog {
//     public static Builder(): any {
//         private mTips: string;
//         private mMessage: string;
//         private mOther: string;

//         public Builder(): void {

//         }

//         public  getmTips(): string {
//             return this.mTips;
//         }

//         public  setmTips(mTips: string): void {
//             this.mTips = mTips;
//         }

//         public getmMessage(): string {
//             return this.mMessage;
//         }

//         public  setmMessage(mMessage: string): void {
//             this.mMessage = mMessage;
//         }

//         public getmOther(): string {
//             return this.mOther;
//         }

//         public  setmOther(mOther: string): void {
//             this.mOther = mOther;
//         }

//         public AlertDialog create(context: any) {
//             AlertDialog alertDialog = new AlertDialog(context);
//             alertDialog.setmTips(mTips);
//             alertDialog.setmMessage(mMessage);
//             alertDialog.setmOther(mOther);
//             return alertDialog;
//         }
//     }

//     // public show(): void{

//     // }
//  }
// let obj1 = {
//     name: 'judy',
//     age: 18
// }
// let obj2 = {
//     name: ''
// }
// function equals (x: any, y: any) {
//     let typeX = x instanceof Object;
//     let typeY = y instanceof Object;
//     if (!typeY || !typeX) {
//         return x === y;
//     }
//     if (Object.keys(x).length !== Object.keys(y).length) {
//         return false
//     }
//     let newS = Object.keys(x)
//     for (let i in newS) {
//         let p = newS[i]
//         let tyX = x[p] instanceof Object;
//         let tyY = y[p] instanceof Object;
//         if (tyX && tyY) {
//             equals(x[p], y[p]);
//         } else if(x[p] != y[p]) {
//             return false;
//         }
//     }
//     return true;
// }
// let arr = [1,2,3,4]
// arr.forEach((item) => {
//     console.log(item)
//     if (item ==2) return false
// })
// for in  for of 
let obj1 = {
    a: 1,
    b: 2,
    c: 3
} as any
let arr1 = [2,4,6,8]
// obj1.prototype.d = 4;
// for (let i of arr1) {
//     console.log(i)
// }
// var student={
//     name:'wujunchuan',
//     age:22,
//     locate:{
//         country:'china',
//         city:'xiamen',
//         school:'XMUT'
//     }
// } as any
// @ts-ignore
// for(var key of Object.keys(student)){
//     //使用Object.keys()方法获取对象key的数组
//     console.log(key+": "+ student[key]);
// }
// let aArray = ['a',123,{a:'1',b:'2'}]
// @ts-ignore
// aArray.name = 'demo'
// for(let index in aArray){
//     console.log(`${aArray[index]}`);
// }
// for(var value of aArray){
//     console.log(value);
// }
let obj = {
    a: 1,
    b: 2,
    c: 3,
    d: 4
} 
let str = '123456'
let arr = [1,2,3,4,5,6]
// @ts-ignore
Array.prototype.sayhello = function () {
    
}
// @ts-ignore
Array.prototype.str = 'hah'
// for-of 实现对象可遍历
for (let key of Object.keys(obj)) {
    // @ts-ignore
    // console.log('key:' + obj[key])
}
// for-of 测试string
for (var key of arr) {
    // @ts-ignore
    // console.log('key:'  + key + arr[key])
}
for (let key in arr) {
    if (!Array.hasOwnProperty(key)) {
        // console.log('key:' + key)
    }
}
// @ts-ignore
for (let key of Object.keys(obj)) {
    console.log(key)
}