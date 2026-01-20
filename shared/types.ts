//types partagés entre front et back

export enum UserRole {
    STUDENT = 'student',
    MENTOR = 'mentor',
    ADMIN = 'admin'
}

export enum AcademicStatus {
    HIGHSCHOOL = 'lyceen',
    FIRST_YEAR = 'etudiant_l1',
    SECOND_YEAR = 'etudiant_l2',
    THIRD_YEAR = 'etudiant_l3',
    MASTER = 'master',
    PHD = 'doctorat',
    GRADUATED = 'diplome'
}

export enum MentorshipStatus {
    PENDING = 'pending',
    ACCEPTED = 'accepted',
    CANCELLED = 'cancelled',
    COMPLETED = 'completed'
}

