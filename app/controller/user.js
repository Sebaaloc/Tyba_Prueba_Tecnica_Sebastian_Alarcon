const express = require("express");
const error = require('../errores/errores');
const constantes = require('../constantes');
const userService = require('../services/user');
const logger = require('../logger/logger')
router = express.Router();

// Login de usuarios y obtiene token
exports.validateUser = async (req, res, next) => {
    try {
        const user = await userService.validateUser(req.body.userName, req.body.password);
        if(user === false){
            throw error(constantes.NOT_FOUND, "Err: Collaborator not found.");
        }
        logger.info(`Token created for: ${req.body.userName}`);
        res.send(user)
    } catch(err) {
        next(err)
    }
};

// Obtiene la informacion de restaurantes por ciudad
exports.getCityRestaurants = async (req, res, next) => {
    try {
        const restaurants = await userService.getRestaurantsByCity(req.params.city, req.headers.token);
        if(restaurants === false){
            throw error(constantes.FORBIDDEN, "Err: User can't acces this resource maybe token expired.");
        }
        if (restaurants.length === 0){
            throw error(constantes.NOT_FOUND, "Err: Restaurants not found.");
        }
        logger.info(`city queried: ${req.params.city}`);
        res.send(restaurants);
    } catch(err) {
        next(err)
    }
};

// Crea usuario en la BD
exports.saveUserPassword = async(req, res, next) => {
    try {
        const userCreationResponse = await userService.saveUserPassword(req);
        if(userCreationResponse === false){
            throw error(constantes.BAD_REQUEST_MONGO, "Err: User not created in MongoDB or could already exist.");
        }
        logger.info(`Collaborator created: ${req.body.userName}`);
        res.send({ message: "User created."})         
    } catch(err) {
        next(err)
    }
};

// Elimina el token de usuario quitandole acceso a las aplicaciones
exports.logOutUser = async(req, res, next) => {
    try {
        const userResponse = await userService.logOutUser(req.body.token);
        if(userResponse === false){
            throw error(constantes.BAD_REQUEST_MONGO, "Err: User not logged out maybe token expired.");
        }
        if(userResponse === null){
            throw error(constantes.NOT_FOUND, "Err: User not found for logging out.");
        }
        logger.info(`Delete token: ${req.body.token}`);
        res.send({ message: "User logged out."});        
    } catch(err) {
        next(err)
    }
}

// Obtiene las transacciones por usuario en orden de la mas nueva a la mas vieja
exports.getTransactionsByUser = async (req, res, next) => {
    try {
        const transaction = await userService.getTransactionsByUser(req.headers.token);
        if(transaction === false){
            throw error(constantes.FORBIDDEN, "Err: User can't acces this resource maybe token expired.");
        }
        if(transaction.length === 0){
            throw error(constantes.NOT_FOUND, "Err: User doesn't have any transactions.");
        }
        logger.info(`Transaction for: ${req.headers.token}`);
        res.send(transaction)
    } catch(err) {
        next(err)
    }
};
