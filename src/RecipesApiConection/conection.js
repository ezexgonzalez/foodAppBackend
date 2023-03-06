const fetch = require("node-fetch");
const {
   API_KEY_1, API_KEY_2, API_KEY_3, API_KEY_4,API_KEY_5
  } = process.env;


module.exports = {

    getAllRecipes : function (recipes){


       return fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=843bcc0716944bf684275b4adfdb2328&addRecipeInformation=true&number=100`)
        .then(response => response.json())
        .then(json => {
            
           let allRecipes = json.results.concat(recipes)
            return allRecipes;
        });

    },
    getQueryRecipes : function (recipes, query){
        return fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=843bcc0716944bf684275b4adfdb2328&addRecipeInformation=true&number=100`)
        .then(response => response.json())
        .then(json => {
            
          
            let filter = json.results.filter(r => r.title.toLowerCase().includes(query.toLowerCase()));

            let filterRecipes = filter.concat(recipes);

            return filterRecipes;
        });
    },
    getRecipeById: function(id){

    
        return fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=843bcc0716944bf684275b4adfdb2328&addRecipeInformation=true&number=100`)
        .then(response => response.json())
        .then(json => {
            
            let filter = json.results.find(r => r.id === Number(id));
            return filter;
        });

    }





}