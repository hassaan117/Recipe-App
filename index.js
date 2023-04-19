fetch('https://api.spoonacular.com/recipes/complexSearch?apiKey=69c77dd6d50a4f9681b36943951096e1&cuisine=italian&maxFat=25&fillIngredients=true&sort=popularity&number=9')
.then(response => response.json())
.then(data => {
  localStorage.setItem("data", JSON.stringify(data))
//   console.log(data);
})
.catch(error => console.error(error));

const parsedData = JSON.parse(localStorage.getItem("data"));
console.log(parsedData.results);
let arr = parsedData.results;
arr.forEach(recipe => {

  let ingArr = recipe.missedIngredients;
  let ingredients = ingArr.map(ming => ming.originalName).join(",");
  ingSbstr = ingredients.substring(0, 146);
  
  document.getElementById("cards-container").innerHTML += 
`<div class="list-item">
    <div class="list-item-inner">
        <a class="list-link" href="./details.html?id=${recipe.id}">
            <div class="recipe-img">
                <div class="img-overlay"></div>
                <img src="${recipe.image}" alt="${recipe.title}">
            </div>
            <div class="recipe-details">
                <div class="recipe-name">${recipe.title}</div>
                <div class="recipe-ingredients"><span>Ingredients: </span>${ingSbstr}</div>
            </div>
        </a>
    </div>
</div>`;
});
