// const express = require('express');
// const { createAcademicYear, getActiveAcademicYear, setActiveAcademicYear } = require('../controllers/academicYearController');
// const router = express.Router();

// router.post('/', createAcademicYear);  // Créer une nouvelle année académique
// router.get('/active', getActiveAcademicYear);  // Récupérer l'année académique active
// router.put('/active/:yearId', setActiveAcademicYear);  // Définir une année académique comme active

// module.exports = router;


// const express = require('express');
// const { getAcademicYears, createAcademicYear } = require('../controllers/academicYearController');
// const router = express.Router();

// router.get('/', getAcademicYears);  // Endpoint pour récupérer les années académiques
// router.post('/', createAcademicYear);  // Endpoint pour créer une nouvelle année académique

// module.exports = router;





const express = require('express');
const { getAcademicYears, createAcademicYear, toggleActiveAcademicYear, getActiveAcademicYear } = require('../controllers/academicYearController');
const router = express.Router();

router.get('/', getAcademicYears);  // Endpoint pour récupérer les années académiques
router.post('/', createAcademicYear);  // Endpoint pour créer une nouvelle année académique
router.patch('/:id/toggle-active', toggleActiveAcademicYear);  // Endpoint pour activer une année académique
router.get('/active', getActiveAcademicYear);  // Endpoint pour récupérer l'année académique active
module.exports = router;
