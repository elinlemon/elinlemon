import { isEqual } from "lodash";

export class ShoppingCart {

    constructor() {
        this.menuItems = [];
        this.totalPrice = 0;

        this.menuItemId = 1;
    }

    addMenuItem(menuItem) {
        menuItem.order = this.menuItems.length + 1;
        
        // assign an id to this menu item so that we can separate between identical ingredients among different menu items
        menuItem.id = this.menuItemId;
        this.menuItemId += 1;

        this.menuItems.push(menuItem);
        this.totalPrice += menuItem.totalPrice;
    }
  //ASK tysk
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

    // returns a list of ingredients without any duplicates
    // instead, for every ingredient a "count" attribute is added
    getPrintableIngredientList() {
        let countPerIngredientId = {};

        // determine count per ingredient
        for (let ingredient of this.ingredients) {
            let id = ingredient.ingredient_id;

            let foo = countPerIngredientId[id];

            // if we haven't seen this ingredient, set the count to 1
            if (typeof(countPerIngredientId[id]) === 'undefined') {
                countPerIngredientId[id] = 1;
                continue;
            }

            // otherwise, increment count
            countPerIngredientId[id] += 1;
        }

        let uniqueIngredients = _.uniqBy(this.ingredients, 'ingredient_id');

        // set the count as an additional field for every unique ingredient
        for (let uq of uniqueIngredients) {
            let id = uq.ingredient_id;
            let count = countPerIngredientId[id];
            uq["count"] = count;
        }

        return uniqueIngredients;
    }
}