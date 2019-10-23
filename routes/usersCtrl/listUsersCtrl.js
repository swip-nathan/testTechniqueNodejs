// Imports
var models = require ('../../models');

// Routes
module.exports = {
    // LIST
    listUsers: (req,res) => {
        models.User.findAll()
        .then( usersFound =>{
            if (usersFound.length !=0){
                return res.status(200).json({usersFound});
            }else {
                return res.status(200).json({'success': 'Il n\'y a aucun utilisateur !' });
            }
        })
        .catch( err => res.status(500).json({'error': 'impossible de lister les utilisateurs' }))
    }
}