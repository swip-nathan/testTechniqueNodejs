//Imports 
var express = require ('express');

//Imports users
var addUserCtrl = require ('./usersCtrl/addUserCtrl');
var listUsersCtrl = require ('./usersCtrl/listUsersCtrl');
var deleteUserCtrl = require ('./usersCtrl/deleteUserCtrl');
var editUserCtrl = require ('./usersCtrl/editUserCtrl');

// Router 
exports.router = ( () => {

    var apiRouter = express.Router();

    //Users routes
    apiRouter.route('/users/addUser/').post(addUserCtrl.addUser);
    apiRouter.route('/users/listUsers/').get(listUsersCtrl.listUsers);
    apiRouter.route('/users/editUser/:id').put(editUserCtrl.editUser);
    apiRouter.route('/users/deleteUser/:id').delete(deleteUserCtrl.deleteUser);

    return apiRouter;
})();