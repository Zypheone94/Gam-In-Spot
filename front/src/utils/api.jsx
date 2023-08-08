const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const debugMode = import.meta.env.REACT_DEBUG_MODE === 'true';

export const api = async (apiDetailRoad) => {
    try {
        const response = await fetch(`${apiUrl}/${apiDetailRoad}`);
        return await response.json();
    } catch (error) {
        throw error;
    }
}