const express = require("express"),
    router = express.Router(),
    userController = require('../controller/user');

// LogIn y obtiene token para usuario
router.post("/user", userController.validateUser);
// Obtiene informacion de restaurantes por nombre de ciudad por ejemplo Chicago (require header de token)
router.get("/userCity/:city", userController.getCityRestaurants);
// Crea usuarios
router.post("/userSave", userController.saveUserPassword);
// Elimina el token de la BD quitando acceso a consultas al usuario (require header de token)
router.post("/userLogOut", userController.logOutUser);
// Obtiene las transacciones realizadas por el usuario a traves del token (require header de token)
router.get("/getTransactions", userController.getTransactionsByUser);

module.exports = router;
