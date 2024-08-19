import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import DataPage from './components/DataPage';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import Add from './components/Add';
import Edit from './components/Edit';

export let myData = createContext();

function App() {
  let [energyData, setEnergyData] = useState([]);
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState(null);
  let [msg, setMsg] = useState(false);
 
  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        const response = await axios.get('https://chart-server-l3wn.onrender.com/data/get-all', {
          cancelToken: source.token,
        });
        // setEnergyData(response.data.data);
        let sorted = response.data.data.sort((a, b) => new Date(a.timing) - new Date(b.timing));
        setEnergyData(sorted);
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          console.error('Error fetching data:', error);
          setError('Failed to fetch data');
        }
        setLoading(false);
      }
    };

    fetchData();

  }, [msg]);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="App">
      <myData.Provider value={{ energyData, setEnergyData, setMsg, msg }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/data" element={<DataPage />} />
          <Route path='add' element={<Add/>}/>
          <Route path='/edit/:id' element={<Edit/>}/>
        </Routes>
      </myData.Provider>
    </div>
  );
}

export default App;
