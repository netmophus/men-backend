


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
const ongletContentsRoutes = require('./routes/administrator/ongletContentsRoutes');
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
  origin: process.env.NODE_ENV === 'production'
    ? 'https://men-frontend.vercel.app'  // URL de votre frontend déployé
    : 'http://localhost:3000',            // URL de votre frontend en local
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));



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
