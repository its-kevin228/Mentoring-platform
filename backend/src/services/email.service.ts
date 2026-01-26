import { Resend } from 'resend';
import { env } from '../config/env';

// Initialisation de Resend avec la clé API (à ajouter dans le .env)
const resend = new Resend(env.RESEND_API_KEY || 're_123456789'); // Valeur par défaut pour éviter le crash si pas configuré

export class EmailService {
    /**
     * Envoie l'email de vérification de compte
     */
    static async sendVerificationEmail(email: string, token: string, firstName: string) {
        const verifyUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verify-email?token=${token}`;

        try {
            await resend.emails.send({
                from: 'UniMentor <onboarding@resend.dev>', // "onboarding@resend.dev" est l'email de test par défaut gratuit de Resend
                to: email,
                subject: 'Bienvenue sur UniMentor ! Vérifiez votre adresse email',
                html: `
                    <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                        <h1 style="color: #10B981; text-align: center;">Bienvenue ${firstName} ! 🎓</h1>
                        <p style="font-size: 16px; line-height: 1.5;">
                            Merci de rejoindre <strong>UniMentor</strong>. Nous sommes ravis de vous compter parmi nous pour cette aventure académique.
                        </p>
                        <p style="font-size: 16px; line-height: 1.5;">
                            Pour activer pleinement votre compte et commencer à interagir avec la communauté, merci de confirmer votre adresse email en cliquant ci-dessous :
                        </p>
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${verifyUrl}" style="background-color: #10B981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">
                                Vérifier mon email
                            </a>
                        </div>
                        <p style="font-size: 14px; color: #666;">
                            Si le bouton ne fonctionne pas, vous pouvez copier ce lien : <br>
                            <a href="${verifyUrl}" style="color: #10B981;">${verifyUrl}</a>
                        </p>
                    </div>
                `
            });
            console.log(`[EmailService] Email de vérification envoyé à ${email}`);
        } catch (error) {
            console.error('[EmailService] Erreur lors de l\'envoi de l\'email de vérification:', error);
            // On ne throw pas d'erreur ici pour ne pas bloquer l'inscription si l'email échoue
        }
    }

    /**
     * Envoie l'email de réinitialisation de mot de passe
     */
    static async sendPasswordResetEmail(email: string, token: string) {
        const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${token}`;

        try {
            await resend.emails.send({
                from: 'UniMentor <onboarding@resend.dev>',
                to: email,
                subject: 'Réinitialisation de votre mot de passe',
                html: `
                    <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                        <h2 style="color: #333;">Mot de passe oublié ?</h2>
                        <p style="font-size: 16px; line-height: 1.5;">
                            Une demande de réinitialisation de mot de passe a été effectuée pour votre compte UniMentor.
                        </p>
                        <p style="font-size: 16px; line-height: 1.5;">
                            Si vous êtes à l'origine de cette demande, cliquez sur le bouton ci-dessous pour choisir un nouveau mot de passe :
                        </p>
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${resetUrl}" style="background-color: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">
                                Réinitialiser mon mot de passe
                            </a>
                        </div>
                        <p style="font-size: 14px; color: #666;">
                            Ce lien est valide pendant 1 heure. Si vous n'avez pas demandé cette réinitialisation, ignorez simplement cet email.
                        </p>
                    </div>
                `
            });
            console.log(`[EmailService] Email de reset envoyé à ${email}`);
        } catch (error) {
            console.error('[EmailService] Erreur lors de l\'envoi de l\'email de reset:', error);
        }
    }
}
