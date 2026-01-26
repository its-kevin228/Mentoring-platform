# 🚀 UniMentor - Roadmap & Checklist Post-MVP

Ce document répertorie les fonctionnalités à implémenter, les bugs à corriger et les améliorations nécessaires pour faire passer UniMentor d'un MVP à une plateforme de production.

## 🔐 1. Authentification & Sécurité (100% Terminé)
- [x] **Mot de passe oublié** : Créer la route `/api/auth/forgot-password`, générer un token unique et envoyer un email de récupération.
- [x] **Vérification d'Email** : Activer le flux de vérification pour que les utilisateurs confirment leur compte via un lien envoyé par mail.
- [x] **Gestion des Sessions (JWT)** : Mettre en place des *Refresh Tokens* pour une session plus longue et sécurisée sans reconnexions fréquentes.
- [x] **Validations Backend** : Renforcer les validations Joi/Zod pour tous les champs (format email, force du mot de passe).

## 👤 2. Profil & Expérience Utilisateur (UX)
- [ ] **Stockage Images (Cloud)** : Migrer le stockage des images (Base64 actuel) vers un service cloud comme **Cloudinary** ou **AWS S3**.
- [ ] **Liens Sociaux** : Ajouter des champs LinkedIn, GitHub ou Portfolio dans le profil.
- [ ] **Paramètres de Compte** : Permettre le changement d'email ou de mot de passe depuis le profil.
- [ ] **Suppression de compte** : Implémenter la suppression définitive des données (compliance RGPD).

## 🤝 3. Système de Mentoring
- [ ] **Planification de Sessions** : Ajouter un calendrier ou un champ "Disponibilités" pour fixer les rendez-vous entre mentor et mentonné.
- [ ] **Notifications In-App** : Système de bulles de notification pour informer d'une nouvelle demande ou d'une acceptation.
- [ ] **Notifications Email** : Envoyer automatiquement un mail lors d'une action importante sur le compte.
- [ ] **Limitation de Charge** : Permettre aux mentors de définir un nombre maximum de mentorés actifs.

## 💬 4. Messagerie & Temps Réel
- [ ] **WebSockets (Socket.io)** : Remplacer le système actuel de "polling" (qui demande les messages toutes les 5s) par du temps réel pur.
- [ ] **Indicateurs de Statut** : Afficher si l'interlocuteur est "En train d'écrire..." ou "Vu".
- [ ] **Compteur de Messages** : Badge dynamique sur l'icône de messagerie dans la Navbar.

## 🔍 5. Annuaire & Recherche
- [ ] **Recherche Instantanée** : Filtrer les mentors au clavier sans avoir à cliquer sur "Rechercher".
- [ ] **Filtres Avancés** : Filtrer par niveau d'étude (Lycéen, L1, Master...), établissement ou tags de compétences.
- [ ] **Pagination** : Gérer l'affichage par pages pour supporter des milliers de mentors sans ralentir le site.

## 📊 6. Tableaux de Bord
- [ ] **Squelettes de Chargement (Skeletons)** : Remplacer les indicateurs de chargement texte par des placeholders visuels animés.
- [ ] **Analytics simples** : Afficher au mentor le nombre de vues sur son profil ou le nombre de sessions terminées.

## 🎨 7. Design & Finitions
- [ ] **Accessibilité** : Vérifier les contrastes de couleurs et la navigation au clavier (normes WCAG).
- [ ] **Micro-animations** : Ajouter des transitions fluides sur les boutons, les modals et les changements de page.
- [ ] **SEO & OpenGraph** : Configurer les balises Meta pour un partage optimal sur les réseaux sociaux.

## 🛠️ 8. Infrastructure & Déploiement
- [ ] **Nettoyage Logs** : Supprimer les `console.log` sensibles avant la mise en production.
- [ ] **Setup CI/CD** : Automatiser le déploiement sur Vercel (Frontend) et Render/Railway (Backend).
- [ ] **Monitoring** : Installer un outil comme Sentry pour surveiller les erreurs en temps réel.

---

*Ce document est évolutif. Cochez les cases au fur et à mesure de l'avancement.*
