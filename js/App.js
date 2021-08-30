function init () {

    this.initArticles(recipes)
    this.initFilters()

}

/**
 * * Afficher tous les articles
 */
function initArticles (dataRecipes) {

    const recipesSection = document.getElementById("recipes")

    dataRecipes.map(item => {

        const recipe = document.createElement("article")
        recipe.classList.add("recipe", `recipe-${item.id}`)

        const recipe_background = document.createElement("div")
        recipe_background.classList.add("recipe-background")

        const recipe_body = document.createElement("div")
        recipe_body.classList.add("recipe-body")

        /**
         * * Recipe body
         */
        const recipe_title = document.createElement("h2")
        recipe_title.classList.add("recipe-title")
        recipe_title.appendChild(document.createTextNode(item.name))

        const recipe_time = document.createElement("p")
        recipe_time.classList.add("recipe-time")
        recipe_time.appendChild(document.createTextNode(item.time + " MIN"))

        const recipe_description = document.createElement("p")
        recipe_description.classList.add("recipe-description")
        recipe_description.appendChild(document.createTextNode(item.description))

        const recipe_ingredients = document.createElement("ul")
        recipe_ingredients.classList.add("recipe-ingredients")

        item.ingredients.map(ins => {
            recipe_ingredients.innerHTML += `
                <li>
                    <strong>${ins.ingredient}</strong>
                </li>
            `
        })

        recipe_body.appendChild(recipe_title)
        recipe_body.appendChild(recipe_time)
        recipe_body.appendChild(recipe_ingredients)
        recipe_body.appendChild(recipe_description)

        recipe.appendChild(recipe_background)
        recipe.appendChild(recipe_body)
        recipesSection.appendChild(recipe)

    })

}

function initFilters () {
    
    const ingredients = []
    const appareils = []
    const ustensils = []

    recipes.map (recipe => {

        recipe.ingredients.map (ingredient => {
            if (!ingredients.includes(ingredient.ingredient)) {
                ingredients.push(ingredient.ingredient)
            }
        })

        recipe.ustensils.map (ustensil => {
            if (!ustensils.includes(ustensil)) {
                ustensils.push(ustensil)
            }
        })

        if (!appareils.includes(recipe.appliance)) {
            appareils.push (recipe.appliance)
        }

    })


    const filter_ingredient = document.querySelector(".filter-options-ingredients")
    ingredients.map (ingredient => {

        const ingredientElement = document.createElement("span")
        ingredientElement.classList.add("filter-option")
        ingredientElement.innerHTML = ingredient

        ingredientElement.addEventListener("click", () => {
            addTag ("ingredients", ingredient.toLowerCase())
        })
        
        filter_ingredient.appendChild(ingredientElement)
        
    })

        const filter_appareil = document.querySelector(".filter-options-appareils")
        appareils.map (appareil => {

            filter_appareil.innerHTML += `
            <span class="filter-option">${appareil}</span>
            `

        })

        const filter_ustensil = document.querySelector(".filter-options-ustensils")
        ustensils.map (ustensil => {

            filter_ustensil.innerHTML += `
            <span class="filter-option">${ustensil}</span>
            `

        })
    
}

init()