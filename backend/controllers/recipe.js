const Recipes = require("../models/recipe");
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/images'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + file.originalname.replace(/\s+/g, '-');
        cb(null, uniqueSuffix);
    }
});

const upload = multer({ storage: storage });

const getRecipes = async (request, response) => {
    const recipes = await Recipes.find();
    return response.json(recipes);
};

const getRecipe = async (request, response) => {
    const recipe = await Recipes.findById(request.params.id);
    response.json(recipe);
};

const addRecipe = async (request, response) => {
    console.log(request.user)
    try {
        const { title, ingredients, instruction, time } = request.body;

        if (!title || !ingredients || !instruction) {
            return response.status(400).json({ message: "Required fields cannot be empty" });
        }

        if (!request.file) {
            return response.status(400).json({ message: "Cover image is required" });
        }

        const newRecipe = await Recipes.create({
            title, ingredients, instruction, time, coverImage: request.file.filename,
            createdBy: request.user.id
        });

        return response.status(201).json(newRecipe);
    } catch (error) {
        console.error("Error adding recipe:", error);
        return response.status(500).json({ message: "Internal Server Error" });
    }
};

const editRecipe = async (request, response) => {
    const { title, ingredients, instruction, time } = request.body;
    const recipe = await Recipes.findById(request.params.id)
    try {
        if (recipe) {
            let coverImage= request.file?.filename ? request.file?.filename : recipe.coverImage
            await Recipes.findByIdAndUpdate(request.params.id, {...request.body,coverImage}, { new: true });
            return response.json({ title, ingredients, instruction, time });
        } else {
            return response.status(404).json({ message: "Recipe not found" });
        }
    } catch (error) {
        console.error("Error editing recipe:", error);
        return response.status(500).json({ message: "Internal Server Error" });
    }
};

const deleteRecipe = async (request, response) => {
    try {
        await Recipes.deleteOne({_id: request.params.id})
        response.json({status:"ok"})
    }
    catch (err){
        return response.status(400).json({message:"error"})
    }
};

module.exports = { getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe, upload };