const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const debugMode = import.meta.env.REACT_DEBUG_MODE === 'true';

export const api = async (apiDetailRoad, method = 'GET', data = {}) => {
    const requestOptions = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors',
    };

    if (method !== 'GET') {
        // Inclure le corps de requête uniquement si ce n'est pas une requête GET
        requestOptions.body = JSON.stringify(data);
    }
    console.log('apiDetailRoad:', apiDetailRoad);

    try {
        const response = await fetch(`https://46.101.3.222:8000${apiDetailRoad}`, requestOptions);
        return await response.json();
    } catch (error) {
        console.log('apiDetailRoad:', apiDetailRoad);
        throw error;
    }
};
