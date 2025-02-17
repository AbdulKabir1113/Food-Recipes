const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');

let nextBtn = document.getElementById("nextBtn");
let prevBtn = document.getElementById("prevBtn");
let allDish = document.querySelectorAll(".dishs");
let  dishValue = document.querySelectorAll(".dishVal");
let count = 0;  // Added this line to initialize the count variable

//function to get recipes
const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipes...<h2>";

    try {
        
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    
    recipeContainer.innerHTML = "";
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to <span>${meal.strCategory} </span> Category</p>

        `
        const button = document.createElement('button');
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);

        // Adding EventListner to recipe button
        button.addEventListener('click', ()=>{
            openRecipePopup(meal);
        });
        recipeContainer.appendChild(recipeDiv);
    });
} 
catch (error) {
    recipeContainer.innerHTML = "Error in Fetching Recipes...<h2>";
    }
    
}

// function to fetch Ingredients and measurements
const fetchIngredients = (meal) =>{
    let ingredientsList= "";
    for(let i=1; i<=20; i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientsList;
}
const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredents:</h3>
    <ul class="ingredientsList">${fetchIngredients(meal)}</ul>
        <div class="recipeInstructions"> 
            <h3>Instructions</h3>
            <p>${meal.strInstructions}</p>
        </div>
    `
    recipeDetailsContent.parentElement.style.display = "block";
}

recipeCloseBtn.addEventListener('click', () => {
    recipeDetailsContent.parentElement.style.display = "none";
});
searchBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML = `<h2> Type the Meal in the search box </h2>`;
        return;
    }
    fetchRecipes(searchInput);
    // console.log("Button Clicked");
});

dishValue.forEach(function(dishData){
    dishData.addEventListener("click", function(){
        fetchRecipes(dishData.value)
    })
})

//slider

allDish.forEach(function(slide, index){
    slide.style.left=`${index * 100}%`
})

function myFun(){
    allDish.forEach(function(curVal){
        curVal.style.transform=`translateX(-${count * 100}%)`
    })
}

nextBtn.addEventListener("click", function(){
    count++;
    if(count == allDish.length){
        count=0;
    }
    myFun();
})

prevBtn.addEventListener("click", function(){
    count--;
    if(count == -1){
        count=allDish.length-1;
    }
    myFun();
}) 
