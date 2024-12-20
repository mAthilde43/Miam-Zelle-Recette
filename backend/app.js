//importer dotenv et express
require("dotenv").config()
const mongoose = require('mongoose');
const express = require("express")
const userRouter = require("./routes/auth.route")
const User = require('./models/User')
    
//créer l'app
const app = express();
app.use(express.json())

//connect a Mongodb 
mongoose.connect('mongodb://localhost:27017/miamzelle_recette')
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

//prefixe la route et utiliser le router
app.use("/auth", userRouter)

//définir le PORT pour le lancer
const PORT = process.env.PORT || 4005
app.listen(PORT, () => console.log("SERVER START"))





// app.use('/api/stuff', (req, res, next) => {
//     User.find()
//     .then(user => res.status(200).json(user))
//     .catch(error => res.status(400).json({error}));
// });

// app.post('/api/stuff', (req, res, next) => {
//     delete req.body._id;
//     const user = new User({
//         ...req.body
//     });
//     user.save()
//     .then(() => res.status(201).json({message: 'Objet enregistré !'}))
//     .catch(error => res.status(400).json({error}));
// })


// app.put('api/stuff/:id', (req, res, next) => {
//     User.updateOne({_id: req.params.id }, { ...req.body, _id: req.params.id})
//     .then(user => res.status(200).json({message: 'Objet modifié !'}))
//     .catch(error => res.status(400).json({error}));
// })

// app.delete('api/stuff/:id', (req, res, next) => {
//     User.deleteOne({_id: req.params.id }, { ...req.body, _id: req.params.id})
//     .then(user => res.status(200).json({message: 'Objet supprimé !'}))
//     .catch(error => res.status(400).json({error}));
// })
