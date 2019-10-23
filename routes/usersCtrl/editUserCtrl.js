// Imports
var bcrypt = require ('bcrypt');
var models = require ('../../models');
var verifUser = require ('../../utils/verifsUser');

// Routes
module.exports = {
    // EDIT
    editUser: (req,res) => {
        models.User.findOne({
            attributes:['id','email'],
            where: {id:req.params.id}
        })
        .then( userFound =>{
            if (userFound){
                // params
                var email = req.body.email;
                var firstname = req.body.firstname;
                var lastname = req.body.lastname;
                var password = req.body.password;
                var newsletter = req.body.newsletter;

                // verifs
                if (email == null || firstname == null || lastname == null || password == null){
                    return res.status(400).json({'error': 'il manque des parmamètres (email, firstname, lastname, password)'});
                }
                if(verifUser.verifPass(password)){
                    return res.status(400).json({'error': 'Le mot de passe doit contenir au moins 5 caractères !'});
                }
                if(!verifUser.validMail(email)){
                    return res.status(400).json({'error': 'Le mail n\'est pas correct'});
                }
                // verifs mail db 
                models.User.findOne({
                    attributes:['email'],
                    where: {email:email}
                })
                .then( userExist =>{
                    if (!userExist || userFound.email == email){
                        
                        // requete
                        bcrypt.hash(password,5,(err,bcryptedPassword)=>{
                            var editUser= models.User.update({
                                email: email,
                                firstname: firstname,
                                lastname: lastname,
                                password: bcryptedPassword,
                                newsletter: newsletter,
                            },
                            { where: { id: req.params.id } })
                            .then ( editUser =>
                                res.status(200).json({
                                    'success': 'utilisateur modifié',
                                    'id': req.params.id,
                                })
                            )
                            .catch( err => res.status(500).json({'error': 'vous ne pouvez pas modifier cet utilisateur' }))
                            
                        });
                    }else {
                        return res.status(400).json({'error': 'cet utilisateur existe déjà !' });
                    }
                })

            }else {
                return res.status(400).json({'error': 'cet utilisateur n\'existe pas !' });
            }
        })
        .catch( err => res.status(500).json({'error': 'impossible de modifier l\'utilisateur' }))
    }
}