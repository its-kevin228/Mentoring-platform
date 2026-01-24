# API Documentation (Draft)

## Authentication
- `POST /api/auth/register` : Inscription d'un nouvel utilisateur (Mentor/Mentoré)
- `POST /api/auth/login` : Connexion et récupération du JWT
- `GET /api/auth/me` : Récupération du profil utilisateur connecté

## Profiles
- `GET /api/users/mentors` : Liste des mentors (avec filtres : filière, établissement)
- `GET /api/users/:id` : Détails d'un profil (Mentor ou Mentoré)
- `PUT /api/users/me` : Mise à jour de son profil académique

## Mentorship Requests
- `POST /api/requests` : Envoyer une demande de mentoring
- `GET /api/requests` : Liste des demandes reçues ou envoyées
- `PATCH /api/requests/:id` : Accepter ou refuser une demande (Status: PENDING, ACCEPTED, REJECTED)

## Messaging
- `GET /api/messages/:conversationId` : Historique d'une conversation
- `POST /api/messages` : Envoyer un message texte

## Resources
- `GET /api/resources` : Liste des ressources académiques et conseils
- `GET /api/resources/:id` : Détails d'une ressource
