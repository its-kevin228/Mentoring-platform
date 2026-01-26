const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function apiRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    let token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };

    let response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    // Si on reçoit une 401 (Unauthorized), on tente de rafraîchir le token
    if (response.status === 401 && typeof window !== 'undefined') {
        const refreshToken = localStorage.getItem('refreshToken');

        if (refreshToken) {
            try {
                const refreshResponse = await fetch(`${API_URL}/auth/refresh`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ refreshToken }),
                });

                if (refreshResponse.ok) {
                    const { data } = await refreshResponse.json();

                    // Mettre à jour les tokens dans le localStorage
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('refreshToken', data.refreshToken);

                    // Relancer la requête initiale avec le nouveau token
                    const newHeaders = {
                        ...headers,
                        Authorization: `Bearer ${data.token}`,
                    };

                    response = await fetch(`${API_URL}${endpoint}`, {
                        ...options,
                        headers: newHeaders,
                    });
                } else {
                    // Si le refresh échoue, on déconnecte l'utilisateur
                    localStorage.removeItem('token');
                    localStorage.removeItem('refreshToken');
                    localStorage.removeItem('user');
                    window.location.href = '/login';
                }
            } catch (err) {
                // Erreur lors du refresh
                window.location.href = '/login';
            }
        }
    }

    const body = await response.json();

    if (!response.ok) {
        let errorMessage = body.error || 'Une erreur est survenue';
        // Si c'est une erreur de validation Zod avec des détails
        if (body.details && Array.isArray(body.details) && body.details.length > 0) {
            errorMessage = body.details[0].message; // On prend le premier message spécifique
        }
        throw new Error(errorMessage);
    }

    return body.data;
}
