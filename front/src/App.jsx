import { useState, useEffect } from 'react'
import {api} from "./utils/api.jsx";

function App() {

    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await api('/products/api/product');
                setData(response);
            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
            }
        };

        getData();
    }, []);

    return (
    <>
      <div>
          {data.map(value => (
              <p>{value.title}</p>
          ))}
      </div>
    </>
  )
}

export default App
