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
    (versionAlgoSearch[version] || versionAlgoSearch.v1)(this.searchInput)
}

const versionAlgoSearch = {

    v1: (searchInput) => {
        console.time("time_test_algo_search")
        recipes.filter(item => {
            const recipe = document.getElementsByClassName(`recipe-${item.id}`)[0]
            if (item.name.toLowerCase().includes(searchInput)
            || item.appliance.toLowerCase().includes(searchInput)
            || item.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchInput))
            || item.ustensils.some(ustensil => ustensil.toLowerCase().includes(searchInput))) {
                recipe.style.display = ""
            } else {
                recipe.style.display = "none"
            }
        })
        console.timeEnd("time_test_algo_search")
    },

    v2: (searchInput) => {
        console.time("v2_timer")
        // TODO: GET RECIPES
        const recipesElement = document.getElementById("recipes")
        const recipe = recipesElement.getElementsByClassName("recipe")
        for (let i = 0; i < recipe.length; i++) {
            const element = recipe[i];
            const recipe_info = {
                id: parseInt(element.classList[1].split('-')[1]),
            }
            const recipe_item = find(recipe_info.id)
            if (recipe_item.name.toLowerCase().includes(searchInput)
            || recipe_item.appliance.toLowerCase().includes(searchInput)
            || recipe_item.ustensils.some(ustensil => ustensil.toLowerCase().includes(searchInput))
            || recipe_item.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchInput))) {
                element.style.display = ""
            } else {
                element.style.display = "none"
            }
        }

        console.timeEnd("v2_timer")
    }
}

init()