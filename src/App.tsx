import { useEffect, useState } from 'react';
import { supabase } from './utils/supabaseClient.js'

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    async function getSensorData() {
      const { data, error } = await supabase.from('sensor_readings').select()
      if (error) {
        console.error(error)
        return
      }
      const json = Object.entries(data).map(([key, value]) => (
        <li key={key}>
          <strong>{key}:</strong> 
          {typeof value === 'object' && value !== null
          ? JSON.stringify(value)
          : value}
        </li>
      ))
      setData(json)
    }

    getSensorData()
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <ul>
        {data}
      </ul>
    </div>
  );
}

export default App;
