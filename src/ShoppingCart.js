import { isEqual, uniqBy } from "lodash";

export class ShoppingCart {

    constructor() {
        // TODO: add order location to shopping basket
        this.menuItems = [];
        this.totalPrice = 0;
    }

    isEmpty() {
        return this.menuItems.length === 0;
    }

    // being able to edit orders may cause IDs that are all over the place
    // but we want them to be in ascending order: 1, 2, 3, ...
    refreshMenuItemIds() {
        let id = 1;

        for (let i = 0; i < this.menuItems.length; i++) {
            this.menuItems[i].id = id;
            id += 1;
        }
    }

    addMenuItem(menuItem) {
        menuItem.order = this.menuItems.length + 1;
        this.menuItems.push(menuItem);
        this.refreshMenuItemIds();
        this.totalPrice += menuItem.totalPrice;
    }

    removeMenuItem(menuItem) {
        for (let i = 0; i < this.menuItems.length; i++) {
            let current = this.menuItems[i];

            if (isEqual(current, menuItem)) {
                this.menuItems.splice(i, 1);
                this.refreshMenuItemIds();
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
        this.id = null;
    }

    isEmpty() {
        return this.ingredients.length === 0;
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

            // if we haven't seen this ingredient, set the count to 1
            if (typeof(countPerIngredientId[id]) === 'undefined') {
                countPerIngredientId[id] = 1;
                continue;
            }

            // otherwise, increment count
            countPerIngredientId[id] += 1;
        }

        let uniqueIngredients = uniqBy(this.ingredients, 'ingredient_id');

        // set the count as an additional field for every unique ingredient
        for (let uq of uniqueIngredients) {
            let id = uq.ingredient_id;
            let count = countPerIngredientId[id];
            uq["count"] = count;
        }

        return uniqueIngredients;
    }
}