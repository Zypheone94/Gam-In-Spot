import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/products/api/product/');
                setData(response.data);
                console.log(response.data); // Affiche les données récupérées depuis l'API
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };

        fetchData();
    }, []);


    return (
    <>
      <div>

      </div>
    </>
  )
}

export default App
