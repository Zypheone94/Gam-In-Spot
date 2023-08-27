const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const debugMode = import.meta.env.REACT_DEBUG_MODE === 'true';

export const api = async (apiDetailRoad, method = 'GET', data = {}) => {
    const requestOptions = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            // Autres en-têtes si nécessaires, comme les en-têtes d'authentification
        },
        body: JSON.stringify(data), // Convertit l'objet data en JSON
    };

    try {
        const response = await fetch(`${apiUrl}/${apiDetailRoad}`, requestOptions);
        return await response.json();
    } catch (error) {
        throw error;
    }
};
