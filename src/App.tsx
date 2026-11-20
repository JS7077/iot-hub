import { useEffect, useState } from 'react';
import { supabase } from './utils/supabaseClient.js'
import Chart, { type ChartData } from './Chart.js';

function App() {
  const [data, setData] = useState<ChartData[]>([])
  const [hours, setHours] = useState(12)

  useEffect(() => {
    async function getSensorData() {
      const { data: result, error } = await supabase.from('sensor_readings').select()
      if (error) {
        console.error(error)
        return
      }
      const temp = result.map((x): ChartData => {
        return {
          tempF: x.raw_payload.temp_f,
          time: x.recorded_at
        }
      })
      setData(temp)
    }

    getSensorData()
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      Hour range:
      <input type='number' value={hours} onChange={(e) => setHours(e.target.valueAsNumber)}/>
      <Chart data={data} hourRange={hours}/>
    </div>
  );
}

export default App;
