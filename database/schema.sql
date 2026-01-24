-- Extension pour UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enum pour les rôles
CREATE TYPE user_role AS ENUM ('ADMIN', 'MENTOR', 'MENTORE');

-- Enum pour les statuts de demande
CREATE TYPE request_status AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'CANCELLED');

-- Table des utilisateurs
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role user_role NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table des profils académiques (complément de users)
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    institution VARCHAR(255),
    field_of_study VARCHAR(255), -- Filière
    study_level VARCHAR(50),      -- L3, M1, Doctorat, Terminale, etc.
    bio TEXT,
    academic_path TEXT,          -- Parcours détaillé
    skills TEXT[],               -- Liste de compétences/tags
    availability_info TEXT,      -- Infos sur les dispos
    is_active BOOLEAN DEFAULT TRUE,
    UNIQUE(user_id)
);

-- Table des demandes de mentoring
CREATE TABLE mentorship_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mentor_id UUID REFERENCES users(id) NOT NULL,
    mentore_id UUID REFERENCES users(id) NOT NULL,
    status request_status DEFAULT 'PENDING',
    message TEXT,                -- Message de motivation initial
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_request UNIQUE (mentor_id, mentore_id) WHERE status = 'PENDING'
);

-- Table des messages
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID REFERENCES users(id) NOT NULL,
    receiver_id UUID REFERENCES users(id) NOT NULL,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table des ressources
CREATE TABLE resources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(100),       -- Méthodologie, Orientation, Vie étudiante
    author_id UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index pour la recherche
CREATE INDEX idx_profiles_field ON profiles(field_of_study);
CREATE INDEX idx_profiles_institution ON profiles(institution);
CREATE INDEX idx_messages_conversation ON messages(sender_id, receiver_id);
