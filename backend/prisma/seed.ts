import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('--- Nettoyage de la base de données ---');

    // Supprimer les données existantes pour repartir à zéro
    await prisma.message.deleteMany();
    await prisma.mentorshipRequest.deleteMany();
    await prisma.profile.deleteMany();
    await prisma.user.deleteMany();

    console.log('Base de données nettoyée avec succès.');
    console.log('Vous pouvez maintenant créer vos propres comptes via l’interface d’inscription.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
