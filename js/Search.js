const env = {
    versionAlgoSearch: "v2"
}

function init () {
    
    document.querySelector("#searchInput")
        .addEventListener("search", searchData)
}

function searchData (event) {
    new Search(event.target.value)
}

function Search (input) {
    this.searchInput = input.toLowerCase()
    this.look()
}

Search.prototype.look = function () {
    console.log(this.searchInput);
    this.algorithmSearch(env.versionAlgoSearch)
}

Search.prototype.algorithmSearch = function(version = "v1") {
    const data = (versionAlgoSearch[version] || versionAlgoSearch.v1)(this.searchInput)

    const recipeElement = document.querySelector("#recipes")
    const recipe = recipeElement.querySelectorAll(".recipe")

    recipes.map (recipe => {

        const recipeElement = document.getElementsByClassName("recipe-"+recipe.id)[0]

        recipeElement.style.display = "none"

    })

    data.map (recipe => {
        const recipeElement = document.getElementsByClassName("recipe-"+recipe.id)[0]

        recipeElement.style.display = ""
    })

}

const versionAlgoSearch = {

    v1: (searchInput) => {
        filterRecipes = recipes.filter(item => {
            return (
                item.name.toLowerCase().includes(searchInput) || item.appliance.toLowerCase().includes(searchInput) || item.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchInput)) || item.ustensils.some(ustensil => ustensil.toLowerCase().includes(searchInput))
            );
        });
        return filterRecipes;
    },

    v2: (searchInput) => {
        // TODO: GET RECIPES
        const data = [];
        for (let i = 0; i < recipes.length; i++) {
            const item = recipes[i];
            if (item.name.toLowerCase().includes(searchInput) || item.appliance.toLowerCase().includes(searchInput) || item.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchInput)) || item.ustensils.some(ustensil => ustensil.toLowerCase().includes(searchInput))) {
                data.push (item);
            }
        }

        filterRecipes = data;

        return filterRecipes;
    }
}

init()