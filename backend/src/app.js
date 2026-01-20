const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route de test
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Serveur de mentoring étudiant en ligne',
        timestamp: new Date().toISOString()
    });
});

// Route pour la liste des mentors (temporaire)
app.get('/api/mentors', (req, res) => {
    const mentors = [
        {
            id: 1,
            name: "Sophie Martin",
            field: "Médecine",
            university: "Université Paris Descartes",
            year: "3ème année",
            description: "Je peux t'aider pour la PACES, l'organisation du travail et les concours médecine."
        },
        {
            id: 2,
            name: "Thomas Lefebvre",
            field: "Droit",
            university: "Panthéon-Sorbonne",
            year: "Master 1",
            description: "Spécialisé en droit international, je connais bien les débouchés et les masters."
        },
        {
            id: 3,
            name: "Léa Dubois",
            field: "Informatique",
            university: "EPITA",
            year: "2ème année",
            description: "Passionnée par le développement web et mobile, je peux t’orienter sur les bonnes écoles."
        },
        {
            id: 4,
            name: "Ahmed Ben Salah",
            field: "Génie Logiciel",
            university: "IAI-TOGO",
            year: "3ème année",
            description: "Je peux t’aider à choisir entre développement web, mobile ou data et préparer les stages."
        },
        {
            id: 5,
            name: "Clara Nguyen",
            field: "Data Science",
            university: "Université de Montréal",
            year: "Master 2",
            description: "Spécialisée en IA et data, je conseille sur les parcours, outils et projets à faire."
        },
        {
            id: 6,
            name: "Jean-Paul Koffi",
            field: "Gestion / Finance",
            university: "Université de Lomé",
            year: "Licence 3",
            description: "Je peux t’aider à comprendre les métiers de la finance et les opportunités en Afrique."
        },
        {
            id: 7,
            name: "Amina Diallo",
            field: "Marketing Digital",
            university: "ESSEC Afrique",
            year: "Master 1",
            description: "Community management, publicité en ligne et personal branding."
        },
        {
            id: 8,
            name: "David Moreau",
            field: "Ingénierie Réseaux",
            university: "INSA Lyon",
            year: "4ème année",
            description: "Réseaux, cybersécurité et systèmes : je peux t’orienter sur les certifications."
        },
        {
            id: 9,
            name: "Fatou Ndiaye",
            field: "Architecture",
            university: "Université Cheikh Anta Diop",
            year: "Master 1",
            description: "Conseils sur les écoles d’architecture et la charge de travail."
        },
        {
            id: 10,
            name: "Lucas Pereira",
            field: "Entrepreneuriat",
            university: "HEC Paris",
            year: "Programme Grande École",
            description: "Création de startup, business models et levée de fonds."
        }
    ];

    res.json(mentors);
});


// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route non trouvée' });
});

module.exports = app;