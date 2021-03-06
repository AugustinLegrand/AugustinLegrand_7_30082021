let tags = {
    ingredients: [],
    appareils: [],
    ustensils: [],
    ids: {
        appareils: 1,
        ingredients: 1,
        ustensils: 1
    }
}

let editrecipes = []

/**
 * 
 * @param {string} key 
 * @param {string} value 
 */
function addTag (key, value) {

    if (tags[key.toLowerCase()].find(tag => tag.value.includes(value.toLowerCase()))) return

    const tags_element = document.getElementById("tags")

    const id = tags.ids[key.toLowerCase()] ++
    
    let tag = {
        id: id,
        value: value.toLowerCase()
    }

    tags[key.toLowerCase()].push(tag)

    // TODO: CREATE ELEMENT HTML TAG
    // * -> tag: type
    // * -> tag: id
    // * -> tag: value
    tags_element.appendChild(tagView(tag.id, key.toLowerCase(), tag.value))

    loadTag()
    filterLoad()
}

/**
 * 
 * @param {string} key 
 * @param {number} id 
 */
function removeTag (key, id) {

    const tags_element = document.getElementById("tags")

    /**
     * TODO: GET TAG WITH ID
     */
    const oldTag = tags[key.toLowerCase()].filter(tag => tag.id === id)[0]
    oldTag.id = null

    const newTags = []

    tags[key.toLowerCase()].map(tag => {
        
        if (tag.id !== null) {
            newTags.push({
                id: tag.id,
                value: tag.value
            })        
        }

    })

    tags[key.toLowerCase()] = []

    deleteTagsViews(key.toLowerCase())

    newTags.map(item => {
        tags_element.appendChild(tagView(item.id, key.toLowerCase(), item.value))        
        tags[key.toLowerCase()].push(item)
    })


    loadTag()
    filterLoad()
}

function deleteTagsViews(key) {

    const tags_element = document.getElementById("tags")
    const tag_element = tags_element.getElementsByClassName(`tag-${key.toLowerCase()}`)
    
    while (tag_element.length > 0) {
        tag_element[0].parentNode.removeChild(tag_element[0])
    }

}

function tagView (id, key, value) {

    const tag = document.createElement("div")
    tag.classList.add(`tag`, `tag-${key}`, `tag-${id}`)
    const tag_value = document.createElement("span")
    tag_value.classList.add('tag-name')
    tag_value.appendChild(document.createTextNode(value))
    const tag_close = document.createElement("img")
    tag_close.src = "./resources/icons/cancel.svg"
    tag_close.alt = `Supprimer le tag "${value}"`
    tag_close.classList.add('tag-cancel')

    tag_close.addEventListener("click", function () {
        removeTag (key, id)
    })

    tag.appendChild(tag_value)
    tag.appendChild(tag_close)

    return tag

}

/**
 * * LOAD RECIPES WITH TAGS
 */
function loadTag () {


    const ingredients = recipes.filter (recipe => {
        return tags.ingredients.every (tag => {
            return recipe["ingredients"].some (t => tag.value.toLowerCase() === t.ingredient.toLowerCase())
        })
    })

    const ustensils = ingredients.filter (recipe => {
        return tags.ustensils.every (tag => {
            return recipe["ustensils"].some (t => tag.value.toLowerCase() === t.toLowerCase())
        })
    })

    const data = ustensils.filter (recipe => {
        return tags.appareils.every (tag => {
            return recipe.appliance.toLowerCase() === tag.value.toLowerCase()
        })
    })

    recipes.map (recipe => {

        const recipeElement = document.getElementsByClassName("recipe-"+recipe.id)[0]

        recipeElement.style.display = "none"

    })

    data.map (recipe => {
        const recipeElement = document.getElementsByClassName("recipe-"+recipe.id)[0]

        recipeElement.style.display = ""
    })

}

function filterLoad () {

    const filter_ingredients = []
    const filter_appareils = []
    const filter_ustensils = []

    const ingredients = recipes.filter (recipe => {
        return tags.ingredients.every (tag => {
            return recipe["ingredients"].some (t => tag.value.toLowerCase() === t.ingredient.toLowerCase())
        })
    })

    const ustensils = ingredients.filter (recipe => {
        return tags.ustensils.every (tag => {
            return recipe["ustensils"].some (t => tag.value.toLowerCase() === t.toLowerCase())
        })
    })

    const data = ustensils.filter (recipe => {
        return tags.appareils.every (tag => {
            return recipe.appliance.toLowerCase() === tag.value.toLowerCase()
        })
    })

    data.map (recipe => {
        console.log(recipe);
        recipe.ingredients.map(it => {
            if (!filter_ingredients.includes(it.ingredient.toLowerCase())) filter_ingredients.push (it.ingredient.toLowerCase())
        })

        if (!filter_appareils.includes(recipe.appliance.toLowerCase())) filter_appareils.push(recipe.appliance.toLowerCase())

        recipe.ustensils.map (ust => {
            if (!filter_ustensils.includes(ust.toLowerCase())) filter_ustensils.push(ust.toLowerCase())
        })
    })

    // * OPTIONS FILTER INGREDIENTS

    const ingredients_element = document.querySelector(".filter-options-ingredients")
    
    ingredients_element.innerHTML = ""

    filter_ingredients.map(ingredient => {


        const ingredientElement = document.createElement("span")
        ingredientElement.classList.add("filter-option")
        ingredientElement.innerHTML = ingredient

        ingredientElement.addEventListener("click", () => {
            addTag ("ingredients", ingredient.toLowerCase())
        })
        
        ingredients_element.appendChild(ingredientElement)
        
        tags.ingredients.map (it => {
            if (it.value.toLowerCase() === ingredient.toLowerCase()) {
                ingredients_element.removeChild(ingredientElement)
            }
        })
        

    })

    // * OPTIONS FILTER APPAREILS

    const appareils_element = document.querySelector(".filter-options-appareils")
    
    appareils_element.innerHTML = ""

    filter_appareils.map(appareil => {

        const appareilElement = document.createElement("span")
        appareilElement.classList.add("filter-option")
        appareilElement.innerHTML = appareil

        appareilElement.addEventListener("click", () => {
            addTag ("appareils", appareil.toLowerCase())
        })
        
        appareils_element.appendChild(appareilElement)

        tags.appareils.map (appa => {
            if (appa.value.toLowerCase() === appareil.toLowerCase()) {
                appareils_element.removeChild(appareilElement)
            }
        })

    })

    // * OPTIONS FILTER USTENSILS

    const ustensils_element = document.querySelector(".filter-options-ustensils")
    
    ustensils_element.innerHTML = ""

    filter_ustensils.map(ustensil => {

        const ustensilElement = document.createElement("span")
        ustensilElement.classList.add("filter-option")
        ustensilElement.innerHTML = ustensil

        ustensilElement.addEventListener("click", () => {
            addTag ("ustensils", ustensil.toLowerCase())
        })
        
        ustensils_element.appendChild(ustensilElement)

        tags.ustensils.map (ust => {
            if (ust.value.toLowerCase() === ustensil.toLowerCase()) {
                ustensils_element.removeChild(ustensilElement)
            }
        })

    })

}


/**
 * ! Function inutile
 * 
 * @param {*} type 
 */
function filterViews (type) {

    const filterElement = []
    
    const elementsChoice = {
        ingredients: (recipe) => {
            tags.ingredients.every(tag => {
                return recipe ["ingredients"].some (t => tag.value.toLowerCase() === t.ingredient.toLowerCase())
            })
        },
        appareils: (recipe) => {
            tags.appareils.every(tag => {
                return recipe ["appareils"].some(t => tag.value.toLowerCase() === t.toLowerCase())
            })
        },
        ustensils: (recipe) => {
            tags.ustensils.every(tag => {
                return recipe["ustensils"].some (t => tag.value.toLowerCase() === t.toLowerCase())
            })
        }
    }
    const elements = recipes.filter (recipe => {
        return (elementsChoice[type])(recipe)
    })

    elements.map (element => {
        element[type].map (item => {
            console.log(item);
        })
    })

}