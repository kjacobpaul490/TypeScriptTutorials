

class Ingredient {
    public _name: string = "";
    private _companyName: string = "CoffeeDay";
    protected _unit: number = 2;
    protected _quantity: number = 0;
    protected _measure: string = ""

    constructor(name: string, quantity: number, measure: string) {
        this._name = name;
        this._quantity = quantity;
        this._measure = measure;
    }

    showCompanyName(): string {
        return `The company name is ${this._companyName}`;
    }

}

class IngredientDetails extends Ingredient {
    protected _muptiplier: number = 0;



    showIngredientDetails(cupsize: string): string {
        if (cupsize == "Large")
            this._muptiplier =this._unit* 1.5;
        if (cupsize == "Medium")
            this._muptiplier = this._unit*1;
        if (cupsize == "Small")
            this._muptiplier = this._unit*.5;
        return `The amount of ${this._name} used for ${cupsize} is ${this._quantity * this._muptiplier} ${this._measure} .`;

    }

}

const objIngredient = new Ingredient("Coffee Powder", 10, "grm");
console.log(objIngredient._name);
console.log(objIngredient.showCompanyName());
// objIngredient._unit; Property '_unit' is protected and only accessible within class 'Ingredient' and its subclasses.


const onjIngredientDetails = new IngredientDetails("Coffee Powder", 10, "grm");
console.log(onjIngredientDetails.showIngredientDetails("Large"));
console.log(onjIngredientDetails.showIngredientDetails("Small"));