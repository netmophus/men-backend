


// const express = require('express');
// const { protect, authorize } = require('../../middleware/authMiddleware');
// const { 
//   getAllSectionCards, 
//   getSectionCardById, // Ajout de cette fonction
//   createSectionCard, 
//   updateSectionCard, 
//   deleteSectionCard 
// } = require('../../controllers/Administrator/sectionCardsController');


// const router = express.Router();

// // Routes pour les cartes des sections
// router.route('/')
//   .get(getAllSectionCards) // Accessible à tous
//   .post(protect, authorize('Admin'), createSectionCard); // Accessible uniquement aux administrateurs

// router.route('/:id')
//   .get(getSectionCardById) // Nouvelle route pour récupérer une carte spécifique
//   .put(protect, authorize('Admin'), updateSectionCard) // Accessible uniquement aux administrateurs
//   .delete(protect, authorize('Admin'), deleteSectionCard); // Accessible uniquement aux administrateurs

// module.exports = router;


const express = require('express');
const { protect, authorizeRole } = require('../../middleware/authMiddleware');
const { 
  getAllSectionCards, 
  getSectionCardById, 
  createSectionCard, 
  updateSectionCard, 
  deleteSectionCard 
} = require('../../controllers/Administrator/sectionCardsController');

const router = express.Router();

// Routes for section cards
router.route('/')
  .get(getAllSectionCards) // Open to everyone
  .post(protect, authorizeRole('Admin'), createSectionCard); // Only accessible to admins

router.route('/:id')
  .get(getSectionCardById) // Open to everyone
  .put(protect, authorizeRole('Admin'), updateSectionCard) // Only accessible to admins
  .delete(protect, authorizeRole('Admin'), deleteSectionCard); // Only accessible to admins

module.exports = router;
