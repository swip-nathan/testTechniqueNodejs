// Imports
var models = require ('../../models');

// Routes
module.exports = {
    // DELETE
    deleteUser: (req,res) => {
        // requete
        models.User.findOne({
            attributes:['id'],
            where: {id:req.params.id}
        })
        .then( userFound =>{
            if (userFound){
                    models.User.destroy({ where: { id: req.params.id } })
                    .then ( deletedUser =>
                        res.status(200).json({
                            'success': 'utilisateur supprimé',
                            'id': req.params.id
                        })
                    )
                    .catch( err => res.status(500).json({'error': 'vous ne pouvez pas supprimer cet utilisateur' }))

            }else {
                return res.status(400).json({'error': 'cet utilisateur n\'existe pas !' });
            }
        })
        .catch( err => res.status(500).json({'error': 'impossible de supprimer l\'utilisateur' }))
    }
}