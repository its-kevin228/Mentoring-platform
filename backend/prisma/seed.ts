import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const passwordHash = await bcrypt.hash('password123', 10);

    const mentorsData = [
        {
            email: 'amandine@unimentor.fr',
            firstName: 'Amandine',
            lastName: 'LEROY',
            role: UserRole.MENTOR,
            isVerified: true,
            profile: {
                institution: 'Université Paris Panthéon-Assas',
                fieldOfStudy: 'Droit Public',
                studyLevel: 'Master 2',
                bio: 'Passionnée par le droit administratif et les concours de la fonction publique.',
                skills: ['Droit', 'Concours', 'Méthodologie'],
            }
        },
        {
            email: 'thomas@unimentor.fr',
            firstName: 'Thomas',
            lastName: 'DUBOIS',
            role: UserRole.MENTOR,
            isVerified: true,
            profile: {
                institution: 'Sorbonne Université',
                fieldOfStudy: 'Informatique / IA',
                studyLevel: 'Doctorant',
                bio: 'Chercheur en deep learning, je peux vous aider sur les maths et le code.',
                skills: ['Informatique', 'Recherche', 'Mathématiques'],
            }
        },
        {
            email: 'sarah@unimentor.fr',
            firstName: 'Sarah',
            lastName: 'BENALI',
            role: UserRole.MENTOR,
            isVerified: true,
            profile: {
                institution: 'Université de Lille',
                fieldOfStudy: 'Économie & Gestion',
                studyLevel: 'L3',
                bio: 'Ancienne présidente d’asso, je vous guide sur la vie étudiante et les bourses.',
                skills: ['Gestion', 'Vie Associative', 'Bourses'],
            }
        }
    ];

    console.log('Seeding mentors...');

    for (const data of mentorsData) {
        const { profile, ...userData } = data;
        await prisma.user.upsert({
            where: { email: userData.email },
            update: {},
            create: {
                ...userData,
                passwordHash,
                profile: {
                    create: profile
                }
            },
        });
    }

    console.log('Seeding completed.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
