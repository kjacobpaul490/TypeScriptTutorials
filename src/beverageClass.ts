import promptSync from 'prompt-sync';

const prompt = promptSync();

const name: string = prompt("Enter Name:");


let ingredients: string[] = [];

function getIngredients(): string[] {

    let ingredient: string = prompt("Enter the height in meters: ");
    if (ingredient != 'exit') {
        ingredients.push(ingredient);
        getIngredients()
    }
    return ingredients;
}
getIngredients();


class beverage {

    _name: string;
    _ingredients: string[];

    constructor(name: string, ingredients: string[]) {

        this._name = name;
        this._ingredients = ingredients;

    }

    procedure(): string {
        return `The beverage wht your making is ${this._name} ,the ingredents used to make are ${this._ingredients}`;
    }

}

var objbeverage = new beverage(name, ingredients);
console.log(objbeverage.procedure());