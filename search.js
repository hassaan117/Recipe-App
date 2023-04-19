const searchBox = document.getElementById("search");

searchBox.addEventListener("input", event => {
    const apiKey = "69c77dd6d50a4f9681b36943951096e1";
    const partialInput = event.target.value;
    // console.log(partialInput);
    const url = `https://api.spoonacular.com/recipes/autocomplete?apiKey=${apiKey}&query=${partialInput}&number=7`;

    // Fetch the results
    if(partialInput.length >= 3){
    fetch(url)
    .then(response2 => {
        if(response2.ok){
           return response2.json();
        } else {
            throw new Error("Response not ok");
        }})
    .then(data2 => {
        const parsedLocalStorageData = JSON.parse(localStorage.getItem("data2"));
        if(!parsedLocalStorageData || JSON.stringify(parsedLocalStorageData) !== JSON.stringify(data2)){
        localStorage.setItem("data2", JSON.stringify(data2))
        console.log(data2)
        } else {
            console.log("data already present")
        }
        const getData = JSON.parse(localStorage.getItem("data2"));
        console.log(getData);
        // Render results to the dom, Click search button to display all results as cards
        renderSearchResults(getData);
        })
    .catch(error => console.error("Error:", error));
    }
});

function renderSearchResults(data){
    document.getElementById("search-suggest").innerHTML = 
    `<div class="suggest-block">
        <div class="divider"></div>
        <ul class="suggest">
        ${data.map(display => `
            <a class="search-detail-link" href="./details.html?id=${display.id}">
            <li class="suggest-li">
                <img src="./assets/search-icon.png" alt="search" class="search-suggest-icon">
                <div class="search-title">${display.title}</div>
            </li></a>`).join("")}
        </ul>
    </div>`;

    const searchInput = document.getElementById("search");
    const searchButton = document.getElementById("search-button");

    searchInput.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            // retrieve the Latest search results from local strg
            const data2 = JSON.parse(localStorage.getItem("data2"));
            searchCardsDisplay(data2);
        }
    });
    searchButton.addEventListener("click", (event) => {
        // retrieve the Latest search results from local strg
        const data2 = JSON.parse(localStorage.getItem("data2"));
        searchCardsDisplay(data2);
    });
}

function searchCardsDisplay(data){
    // console.log(data);
    if(data.length === 0){
        document.getElementById("cards-container").innerHTML = `
        <div class="notfound-recipe">
            <h2>We don't find anything matching your search.</h2>
            <p>Try changing your keyword.</p>
        </div>`;
    } else {
    apiKey = "69c77dd6d50a4f9681b36943951096e1";
    const ids = data.map(num => num.id).join(",");
    url = `https://api.spoonacular.com/recipes/informationBulk?apiKey=${apiKey}&ids=${ids}`;
    // console.log(url);
    fetch(url)
    .then(response3 => response3.json())
    .then(data3 => {
    // console.log(data3);
    var displayResults = "";
    data3.forEach(searchRecipe => {

    let extings = searchRecipe.extendedIngredients;
    let exting = extings.map(eing => eing.name).join(",");
    exSubstr = exting.substring(0, 146);
    
    displayResults +=
    `<div class="list-item">
        <div class="list-item-inner">
            <a class="list-link" href="./details.html?id=${searchRecipe.id}">
                <div class="recipe-img">
                    <div class="img-overlay"></div>
                    <img src="${searchRecipe.image}" alt="${searchRecipe.title}">
                </div>
                <div class="recipe-details">
                    <div class="recipe-name">${searchRecipe.title}</div>
                    <div class="recipe-ingredients"><span>Ingredients: </span>${exSubstr}</div>
                </div>
            </a>
        </div>
    </div>`
    });

  // Clear the local storage before setting new search data
    localStorage.removeItem("data2");
    localStorage.setItem("data2", JSON.stringify(data));
    
    document.getElementById("cards-container").innerHTML = displayResults;
})
}}


