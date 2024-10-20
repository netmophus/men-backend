
const mongoose = require('mongoose');

const OngletContentSchema = new mongoose.Schema({
  titleContent: {
    type: String,
    required: true,
  },
  subtitleContent: {
    type: String,
    required: false,
  },
  bodyContent: {
    type: String,
    required: true,
  },
  imgContent: {
    type: String,
    required: false,
  },
  videoContent: {
    type: String,
    required: false,
  },
  ongletId: {
    type: mongoose.Schema.Types.ObjectId, // Référence à l'onglet
    ref: 'Onglet', // Assurez-vous que ceci correspond au modèle d'onglet
    required: true, // Rendre ce champ obligatoire
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('OngletContent', OngletContentSchema);
