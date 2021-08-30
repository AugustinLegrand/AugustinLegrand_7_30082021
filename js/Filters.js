for (const filter of document.querySelectorAll(".filter-select-wrapper")) {

    const trigger = filter.querySelector(".filter-select__trigger")
    
    if (!trigger.classList.contains("filter-open")) {
        trigger.addEventListener("click", function () {
            
            filter.querySelector(".filter-select").classList.add("filter-open")
            filter.querySelector(".arrow").classList.add("arrow-close")



        })
    }

    const input = filter.querySelector(".filter-select__trigger input")

    input.addEventListener("change", function (event) {
        event.preventDefault()

        const key = trigger.classList[1].split('-')[1]
        const value = event.target.value

        addTag (key, value)

        filter.querySelector(".filter-select").classList.remove("filter-open")
        event.target.value = ""
    })

}

window.addEventListener('click', function(e) {
    for (const select of document.querySelectorAll('.filter-select')) {
        if (!select.contains(e.target)) {
            select.classList.remove('filter-open');
        }
    }
});



function init () {
    
}

init()