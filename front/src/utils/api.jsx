const apiUrl = import.meta.env.VITE_API_URL;
console.log(apiUrl)

export const api = async (apiDetailRoad, method = 'GET', data = {}) => {
    const requestOptions = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (method !== 'GET') {
        // Inclure le corps de requête uniquement si ce n'est pas une requête GET
        requestOptions.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(`https://gaminspot.games:8000/${apiDetailRoad}`, requestOptions);
        return await response.json();
    } catch (error) {
        throw error;
    }
};
