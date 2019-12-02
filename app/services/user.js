const mongoose = require('../dbconnection/dbConnectionMongo');
const user = require('../model/userInfo');
const token = require('../model/token');
const transaction = require('../model/transaction')
const uuidv4 = require('uuid/v4');
const axios = require('axios');

// Valida que el usuario exista y su contraseña ingresada sea correcta para generar token
exports.validateUser = async (userName, password) => {
    const userInfo = await user.find({userName: userName}).select("-_id -__v");  
    if (userInfo.length !== 0 && userInfo[0].password === password){
        return await saveToken(userInfo[0].userName);
    }
    return false;
}

// Obtiene la informacion de restaurantes por ciudad
exports.getRestaurantsByCity = async (city, token) => {
    const tokenReturned = await validateToken(token);
    if (tokenReturned === false){
        return false;
    }
    await transactionToSave(tokenReturned[0].userName, city)
    return axios.get(process.env.URL + city)
    .then(response => {
        return response.data.restaurants;
    })
    .catch(error => {
        return error;
    });
}

// Guarda el usuario en la BD
exports.saveUserPassword = async userInfo => {
    const exists = await validateUser2Create(userInfo.body.userName);
    if (exists === true){
        return false;
    }
    const userToSave = new user({
        userName: userInfo.body.userName,
        password: userInfo.body.password
    });
    userToSave.save()
    .then(true)
    .catch(false);
}

// Valida que el usuario a crear no exista ya
const validateUser2Create = async (userName) => {
    const userInfo = await user.find({userName: userName}).select("-_id -__v");  
    if (userInfo.length > 0){
        return true;
    }
    return false;
}

// Obtiene las transacciones del usuario
exports.getTransactionsByUser = async token => {
    const tokenData = await validateToken(token);
    if(tokenData === false){
        return false
    }
    const transactionInfo = await transaction.find({userName: tokenData[0].userName}).select("-_id -__v");  
    transactionInfo.sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
      });
    return transactionInfo;
}

// Guarda el token en la BD
const saveToken = userName => {
    const tokenID = uuidv4();
    let today = new Date();
    today.setHours(today.getHours() + 1);
    const tokenToSave = new token({
        token: tokenID,
        expiration: String(today),
        userName: userName
    });
    return tokenToSave.save()
    .then(responseToken => responseToken)
    .catch(false);
}

// Guarda las transacciones en la BD
const transactionToSave = (userName, cityQueried) => {
    const transaction2Save = new transaction({
        userName: userName,
        date: String(new Date()),
        cityQueried: cityQueried
    });
    transaction2Save.save()
    .then(true)
    .catch(false);
}

// Elimina el token de la BD inahabilitando al usuario de realizar transacciones (notese que si el token expiro no permitira acceder a recursos)
exports.logOutUser = async token2Search => {
    const tokenData = await validateToken(token2Search);
    if(tokenData === false){
        return false
    }

    return await token.find({token: token2Search}).remove()
    .then(didItDelete => {
        if(checkIfMongoDeleted(didItDelete) === true){
            return null;
        };
        return true;    
    })
    .catch(false);
}

// Verifica si elimino el token
const checkIfMongoDeleted = mongoResponse => {
    if(mongoResponse.deletedCount === 0){
        return true;
    }
    return false;
}

// Valida que el token no haya expirado
const validateToken = async token2Find => {
    const tokenInfo = await token.find({token: token2Find}).select("-_id -__v");  
    const today = new Date();
    if (tokenInfo.length === 0 ){
        return false;
    }
    if (new Date(tokenInfo[0].expiration) < today){
        return false;
    }
    return tokenInfo;
}
