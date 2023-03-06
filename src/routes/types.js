const { Router } = require('express');
const { Recipe, Type } = require('../db.js');
const { Op } = require('sequelize');



const routerTypes = Router();



routerTypes.get("/", async (req , res ,next)=>{


    try{
       const types = await Type.bulkCreate([
            {name: "gluten free"},
            {name: "lacto ovo vegetarian"},
            {name: "vegan"},
            {name: "pescatarian"},
            {name: "paleolithic"},
            {name: "primal"},
            {name: "fodmap friendly"},
            {name: "dairy free"},
            {name: "whole 30"}]);


        res.send(types);
    }catch(e){

       const types = await Type.findAll();

       res.send(types);

    }

});










module.exports = routerTypes;