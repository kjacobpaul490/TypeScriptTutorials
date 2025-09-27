

abstract class Swiggy {
    readonly _orderItemName: string = "";

    constructor(orderItemName: string) {
        this._orderItemName = orderItemName;
    }
    orderedItem(): string {
        return `The Ordered item is ${this._orderItemName}`;
    }

    abstract PreparingOrder(): string;
}

class sonyDhabaRestaurant extends Swiggy {

    PreparingOrder(): string {
        return `Sony Dhaba resturant is preparing ${this._orderItemName}`;

    }

}
class bawrchiRestaurant extends Swiggy {

    PreparingOrder(): string {
        return `Bawrchi resturant is preparing ${this._orderItemName}`;

    }


}
class mefhilRestaurant extends Swiggy {

    PreparingOrder(): string {
        return `Mefhil resturant is preparing ${this._orderItemName}`;

    }
}

const objsonyDhabaRestaurant=new sonyDhabaRestaurant("Butter Chicken * 2 , Pulka * 10");
const objbawrchiRestaurant=new bawrchiRestaurant("Butter Paneer * 2 , Pulka * 3");
const objmefhilRestaurant=new mefhilRestaurant("Salad * 1 ");
console.log(objsonyDhabaRestaurant.PreparingOrder());
console.log(objbawrchiRestaurant.PreparingOrder());
console.log(objmefhilRestaurant.PreparingOrder());