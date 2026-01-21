-- Table des utilisateurs (contient les infos de connexion)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('student', 'mentor', 'admin')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE
);

-- Table des profils (informations personnelles et académiques)
CREATE TABLE profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    profile_picture_url VARCHAR(500),
    bio TEXT,
    phone VARCHAR(20),
    
    -- Informations académiques
    current_status VARCHAR(50) CHECK (current_status IN ('lyceen', 'etudiant_l1', 'etudiant_l2', 'etudiant_l3', 'master', 'doctorat', 'diplome')),
    institution VARCHAR(255),
    field_of_study VARCHAR(100), -- Domaine d'études (Médecine, Droit, Info, etc.)
    specialization VARCHAR(100), -- Spécialité (Cardio, Droit International, Web Dev, etc.)
    year_of_study INTEGER,
    expected_graduation_year INTEGER,
    
    -- Pour les mentors seulement
    is_available_for_mentoring BOOLEAN DEFAULT TRUE,
    mentoring_experience TEXT,
    skills TEXT[], -- Tableau de compétences
    availability TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des relations de mentoring
CREATE TABLE mentorship_relationships (
    id SERIAL PRIMARY KEY,
    mentor_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    student_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'completed', 'cancelled')),
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    started_at TIMESTAMP,
    ended_at TIMESTAMP,
    goals TEXT, -- Objectifs du mentoring
    notes TEXT
);

-- Table des messages
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    relationship_id INTEGER REFERENCES mentorship_relationships(id) ON DELETE CASCADE,
    sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table pour les sujets/filières
CREATE TABLE fields (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    category VARCHAR(50) -- Ex: 'Sante', 'Droit', 'Informatique', 'Commerce'
);

-- Table pour les établissements
CREATE TABLE institutions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    type VARCHAR(50), -- 'Universite', 'Ecole', 'Lycee'
    city VARCHAR(100),
    website VARCHAR(255)
);

-- Insertion de données de test
INSERT INTO fields (name, category, description) VALUES
('Médecine', 'Santé', 'Études médicales et paramédicales'),
('Droit', 'Droit', 'Droit privé, public, international'),
('Informatique', 'Sciences', 'Développement, data science, cybersécurité'),
('Commerce', 'Commerce', 'Écoles de commerce, management'),
('Ingénierie', 'Sciences', 'Écoles d''ingénieurs'),
('Psychologie', 'Sciences humaines', 'Psychologie clinique, sociale, cognitive'),
('Architecture', 'Art', 'Architecture, urbanisme');

INSERT INTO institutions (name, type, city) VALUES
('Université Paris Descartes', 'Université', 'Paris'),
('Panthéon-Sorbonne', 'Université', 'Paris'),
('EPITA', 'École', 'Paris'),
('HEC Paris', 'École', 'Paris'),
('Polytechnique', 'École', 'Palaiseau');

-- Création d'index pour améliorer les performances
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_profiles_field ON profiles(field_of_study);
CREATE INDEX idx_mentorship_mentor ON mentorship_relationships(mentor_id);
CREATE INDEX idx_mentorship_student ON mentorship_relationships(student_id);
CREATE INDEX idx_messages_relationship ON messages(relationship_id);
CREATE INDEX idx_messages_sender ON messages(sender_id);