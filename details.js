// Get recipe id value from url parameter
let urlParams = new URLSearchParams(window.location.search);
let recipeId = urlParams.get('id');

// Fetch and render recipe details
fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=69c77dd6d50a4f9681b36943951096e1`)
.then(response => {
  if(!response.ok){
    throw new Error('Failed to fetch recipe details')
  } else {
    return response.json();
  }
})
.then(data => {
  console.log(data);
  document.getElementById("recipe-details").innerHTML = `
  <div class="details">
    <div class="details-main">
      <div class="details-img">
        <img src="${data.image}" alt="${data.ttile}" class="details-image">
      </div>
      <div class="details-detail">
        <div class="details-recipe">
          <button>RECIPE</button>
        </div>
        <h1>${data.title}</h1>
        <div class="details-info">
          <div class="details-info-left">
            <div class="details-min">
              <div>${data.readyInMinutes} min</div>
              <div>Total Time</div>
            </div>
            <div class="details-ser">
              <div>${data.servings}</div>
              <div>Servings</div>
            </div>
          </div>
          <div class="details-info-right">
            <div class="details-ing">
              <div>${data.extendedIngredients.length}</div>
              <div>Ingredients</div>
            </div>
            <div class="details-hs">
              <div>${data.healthScore}</div>
              <div>Health Score</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="details-description">${data.summary}</div>
    <div class="details-time">
      <div id="time-1">
        <div>${data.readyInMinutes}</div>
        <div>Total Time</div>
      </div>
      <div id="time-2">
        <div>${data.preparationMinutes}</div>
        <div>Prepration Time</div>
      </div>
      <div id="time-3">
        <div>${data.cookingMinutes}</div>
        <div>Cooking Time</div>
      </div>
    </div>
    <div class="ingredients-main">
      <h2>Ingredients</h2>
      <ul class="ingredients">
          ${data.extendedIngredients.map(ingredient => `<li class="ingredients-li">
          <div class="ing-title">${ingredient.nameClean}</div>
          <div class="ing-qty">${ingredient.amount}<span class="ing-unit-span">${ingredient.unit}</span></div>
          </li>`).join('')}
        </li>
      </ul>
    </div>
    <div class="instructions-main">
    <h2>Instructions</h2>
    <ul>
    ${data.analyzedInstructions[0].steps.map(step => `<li class="instructions-li">
    <div class="instructions-number">Step ${step.number}</div>
    <div class="instructions-step">${step.step}</div></li>`).join('')}
    </ul>
    </div>
  </div>
  `
})
.catch(error => {
  console.error(error);
});