const sendDataWithImages = async (data, files) => {
    try {
        const formData = new FormData();

        // Ajoutez les données JSON à FormData
        formData.append('jsonData', JSON.stringify(data));

        // Ajoutez les fichiers image à FormData
        files.forEach((file, index) => {
            formData.append(`image${index}`, file);
        });

        // Effectuez la requête POST avec Axios
        const response = await axios.post(`${apiUrl}/votre-endpoint-api`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};


