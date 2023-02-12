let output = document.getElementById("result");
let searchButton = document.getElementById("search-btn");
let apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

searchButton.addEventListener("click", () => {
  let input = document.getElementById("user-inp").value;
  if (input.length == 0) {
    output.innerHTML = `<h3>Input Field Cannot Be Empty</h3>`;
  } else {
    fetch(apiUrl + input)
      .then((response) => response.json())
      .then((data) => {
        let mealData = data.meals[0];
        console.log(mealData);
        console.log(mealData.strMealThumb);
        console.log(mealData.strMeal);
        console.log(mealData.strArea);
        console.log(mealData.strInstructions);

        let ingredientsList = [];
        let counter = 1;
        for (let prop in mealData) {
          let ingredient = "";
          let measure = "";
          if (prop.startsWith("strIngredient") && mealData[prop]) {
            ingredient = mealData[prop];
            measure = mealData[`strMeasure` + counter];
            counter += 1;
            ingredientsList.push(`${measure} ${ingredient}`);
          }
        }
        console.log(ingredientsList);

        output.innerHTML = `
    <div class="details">
        <h2>${mealData.strMeal}</h2>
        <h4>${mealData.strArea}</h4>
    </div>    
    <img src=${mealData.strMealThumb}>
    <div id="ingredient-container"></div>
    <div id="recipe-container">
        <pre id="instructions">${mealData.strInstructions}</pre>
    </div>
    `;

        let ingredientContainer = document.getElementById("ingredient-container");
        let parentElement = document.createElement("ul");
        let recipeContainer = document.getElementById("recipe-container");

        ingredientsList.forEach((ingredient) => {
          let childElement = document.createElement("li");
          childElement.innerText = ingredient;
          parentElement.appendChild(childElement);
          ingredientContainer.appendChild(parentElement);
        });
        recipeContainer.style.display = "block";

    })
    .catch(() => {
        result.innerHTML = `<h3>Invalid Input</h3>`;
    });
  }
});
