const { Router } = require('express');
const { Recipe, Type, Step } = require('../db.js');
const { Op } = require('sequelize');
const { getAllRecipes, getQueryRecipes, getRecipeById } = require("../RecipesApiConection/conection");


const routerRecipes = Router();


routerRecipes.get("/:id", async (req, res, next) => {

    const { id } = req.params;

    try {

        const recipe = await Recipe.findByPk(id, {
            include: [{
                model: Type,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }, {
                model: Step,
            }]
        });
        console.log(recipe.toJSON());
        if (recipe) return res.json(recipe);

    } catch {
        try {
            const recipeApi = await getRecipeById(id);

            if (recipeApi) return res.json(recipeApi);

            res.status(404).json("recipe not found");
        } catch (e) {
            res.status(404).json({
                msg: "error",
                e: e
            })


        }

    }

});

routerRecipes.get("/", async (req, res, next) => {
    const { name } = req.query;

    try {
        if (name) {

            const recipes = await Recipe.findAll({
                where: {
                    title: { [Op.substring]: name }
                }
            })

            const filterRecipes = await getQueryRecipes(recipes, name);

            if (filterRecipes.length > 0) {
                return res.json(filterRecipes);
            } else {
                return res.status(404).json({
                    msg: "Recipes not Found"
                })
            }

        } else {

            const recipes = await Recipe.findAll({
                include: [{
                    model: Type,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                }]
            });

            const allRecipes = await getAllRecipes(recipes);

            return res.json(allRecipes);

        }
    }
    catch (e) {

        res.status(404).json({
            error: "No hay peticiones disponibles",
            e: e

        });
    }

});

routerRecipes.post("/", async (req, res, next) => {

    try {

        const { title, summary, types, spoonacularScore, healthScore, steps, image } = req.body;

        const recipe = await Recipe.create({
            title: title.toLowerCase(),
            summary,
            spoonacularScore,
            healthScore,
            image
        });

        const stepsCreate = [];

        await steps.forEach(async function (s) {
            stepsCreate.push(await Step.create({
                number: s.number,
                step: s.step
            }));

        }); 
        await recipe.addTypes(types);
        await recipe.addSteps(stepsCreate);

        console.log(stepsCreate.map(s => s.toJSON()));
        res.status(201).json({
            msg: "Ok"
        });
    } catch (e) {
        console.log("Error",e);
        res.status(404).json({
            msg: "Error",
            err: e
        })
    }

})


module.exports = routerRecipes;