// Imports
var bcrypt = require ('bcrypt');
var models = require ('../../models');
var verifUser = require ('../../utils/verifsUser');

// Routes
module.exports = {  
    // ADD
    addUser: (req,res) => {
        // params
        var email = req.body.email;
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var password = req.body.password;
        var newsletter = req.body.newsletter;
        
        // verifications
        if (email == null || firstname == null || lastname == null || password == null){
            return res.status(400).json({'error': 'il manque des parmamètres (email, firstname, lastname, password)'});
        }
        if(verifUser.verifPass(password)){
            return res.status(400).json({'error': 'Le mot de passe doit contenir au moins 5 caractères !'});
        }
        if(!verifUser.validMail(email)){
            return res.status(400).json({'error': 'Le mail n\'est pas correct'});
        }
        // Requete
        models.User.findOne({
            attributes:['email'],
            where: {email:email}
        })
        .then( userFound => {
            if (!userFound){
                bcrypt.hash(password,5,(err,bcryptedPassword)=>{
                    var newUser= models.User.create({
                        email: email,
                        firstname: firstname,
                        lastname: lastname,
                        password: bcryptedPassword,
                        newsletter: newsletter,
                    })
                    .then ( newUser =>
                        res.status(200).json({
                            'success': 'utilisateur ajouté',
                            'userId': newUser.id
                        })
                    )
                    .catch( err => res.status(500).json({'error': 'vous ne pouvez pas ajouter cet utilisateur' }))
                });
            }else {
                return res.status(400).json({'error': 'cet utilisateur existe déjà !' });
            }
        })
        .catch( err => res.status(500).json({'error': 'impossible de vérifier cet utilisateur' }))
    }
}