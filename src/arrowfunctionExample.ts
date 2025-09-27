import promptSync from 'prompt-sync';

const prompt = promptSync();


const weight: number = Number(prompt("Enter the weight in kgs: "));
const height: number = Number(prompt("Enter the height in meters:"));



const BMICatogery=(_weight:number,_height:number):string=>{

let _bMICal=BMICal(_weight,_height)
let result:string="";

switch(true){

    case _bMICal<18:
        result="Under weight";
        break;
    case _bMICal>=18 && _bMICal<25:
        result="Normal weight";
        break;
    case _bMICal>=25 && _bMICal<30:
        result="Overweight";
        break;
    default:
        result="Obese";
        break;
}

return result;
}
const BMICal=(_weight:number,_height:number):number => _weight/(_height*_height);

//console.log((weight>0 && height>0)? BMICal(weight,height):"Invalid Heigth or weight ,  Heigth or weight>0");

console.log((weight>0 && height>0)? BMICatogery(weight,height):"Invalid Heigth or weight ,  Heigth or weight>0");