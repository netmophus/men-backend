


const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const establishmentRoutes = require('./routes/establishmentRoutes'); // Importer les routes pour les établissements
const classRoutes = require('./routes/classRoutes');
const subjectRoutes = require('./routes/subjectRoutes'); // Importer les routes pour les matières
const teacherRoutes = require('./routes/teacherRoutes'); // Importer les routes pour les enseignants
const studentRoutes = require('./routes/studentRoutes');
const bulletinRoutes = require('./routes/bulletinRoutes');
const sectionCardsRoutes = require('./routes/Administrator/sectionCardsRoutes');
const sectionArticlesRoutes = require('./routes/Administrator/sectionArticlesRoutes');
const ongletCartesRoutes = require('./routes/Administrator/ongletCartesRoutes'); // Importer les routes pour les onglets
const ongletContentsRoutes = require('./routes/Administrator/ongletContentsRoutes');
// Import routes
const devoirCompoRoutes = require('./routes/devoirCompoRoutes');
const academicYearRoutes = require('./routes/academicYearRoutes');
const pedagogicalResourceRoutes = require('./routes/pedagogicalResourceRoutes'); // Importer les routes pédagogiques
const chapterRoutes = require('./routes/chapterRoutes'); 
const statsRoutes = require ('./routes/statsRoutes');
const PedagogicalSubjectRoutes = require('./routes/PedagogicalSubjectRoutes');

const inscriptionBEPCRoutes = require('./routes/bepc/inscriptionBEPCRoutes');
const authBEPCRoutes = require('./routes/bepc/authBEPCRoutes');


// Charger la configuration
dotenv.config();

// Connexion à MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Configuration de CORS pour permettre les requêtes depuis localhost:3000 et localhost:3001
// app.use(cors({
//   origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'] // Autoriser les deux origines
// }));








// Configuration CORS
const corsOptions = {
  origin: function (origin, callback) {
    if (process.env.NODE_ENV === 'production') {
      // Vérifier que l'origine correspond à celle du frontend en production
      if (origin && origin === 'https://men-frontend.vercel.app') {
        callback(null, true); // Autoriser la requête
      } else {
        callback(new Error('Not allowed by CORS')); // Bloquer la requête
      }
    } else {
      // En développement, autoriser toutes les requêtes depuis localhost
      callback(null, true);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Middleware pour ajouter l'en-tête Access-Control-Allow-Credentials de manière explicite
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Origin', 'https://men-frontend.vercel.app');
  next();
});

// Gérer explicitement les requêtes OPTIONS (pré-vérification)
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'https://men-frontend.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(200);
});



// Définir les routes
app.use('/api/auth', authRoutes); // Route pour l'authentification
app.use('/api/establishment', establishmentRoutes); // Route pour les établissements
app.use('/api/classes', classRoutes); // Route pour les classes
app.use('/api/subjects', subjectRoutes); // Route pour les matières
app.use('/api/teachers', teacherRoutes); // Route pour les enseignants
app.use('/api/bulletins', bulletinRoutes); // Route pour les bulletins
app.use('/api/students', studentRoutes); // Route pour les étudiants


app.use('/api/section-cards', sectionCardsRoutes);
app.use('/api/section-articles', sectionArticlesRoutes);

// Ajouter la route pour les onglets
app.use('/api/onglets', ongletCartesRoutes); // C'est ici que la route est définie

app.use('/api/onglet-contents', ongletContentsRoutes); // Assure-toi que cette ligne est présente

// Middleware pour servir les fichiers statiques (les fichiers uploadés)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.use('/api/devoircompo', devoirCompoRoutes);


//app.use('/api/academicYears', academicYearRoutes);
app.use('/api/academic-years', academicYearRoutes); 
// Définir les routes
app.use('/api/pedagogical-resources', pedagogicalResourceRoutes);  // Route pour les ressources pédagogiques, classes et matières


app.use('/api/pedagogical-subjects', 
  PedagogicalSubjectRoutes);

app.use('/api/chapters', chapterRoutes);




// Utiliser les routes
app.use('/api/stats', statsRoutes);



//app.use('/api/pedagogical-subjects', pedagogicalSubjectRoutes);



//app.use('/api/bepc/inscription', inscriptionBEPCRoutes);
app.use('/api/bepc/inscription', inscriptionBEPCRoutes);

// Middleware pour les routes d'authentification BEPC
app.use('/api/bepc/auth', authBEPCRoutes);




// Route par défaut
app.get('/', (req, res) => {
  res.send('API en cours d\'exécution...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
