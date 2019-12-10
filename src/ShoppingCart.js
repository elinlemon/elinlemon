import {
    isEqual
} from "lodash";

export class ShoppingCart {

    constructor() {
        this.menuItems = [];
        this.totalPrice = 0;
    }

    addMenuItem(menuItem) {
        menuItem.order = this.menuItems.length + 1;
        this.menuItems.push(menuItem);
        this.totalPrice += menuItem.totalPrice;
    }

    removeMenuItem(menuItem) {
        for (let i = 0; i < this.menu.length; i++) {
            let current = this.ingredients[i];

            if (isEqual(current, menuItem)) {
                this.menuItems.splice(i, 1);
                this.totalPrice -= menuItem.totalPrice;
                break;
            }
        }
    }
}


export class MenuItem {

    constructor() {
        this.totalPrice = 0;
        this.ingredients = [];
    }

    addIngredient(ingredient) {
        this.ingredients.push(ingredient);
        this.totalPrice += ingredient.selling_price;
    }

    removeIngredient(ingredient) {
        for (let i = 0; i < this.ingredients.length; i++) {
            let current = this.ingredients[i];

            if (isEqual(current, ingredient)) {
                this.ingredients.splice(i, 1);
                this.totalPrice -= ingredient.selling_price;
                break
            }
        }
    }

    getPrintableIngredientList() {
        let uniqueIngredients = _.uniqBy(this.ingredients, 'ingredient_id');

        for (let uq in uniqueIngredients) {

            console.log(uq);

        }


        return "foo";


        /*
        return initial ingredient object but add "count" attribute
        */

    }
}