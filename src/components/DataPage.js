import React, { useContext } from 'react';
import Home from './Home';
import { myData } from '../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DataPage() {
  let { energyData, setEnergyData } = useContext(myData);
  let navigate = useNavigate()

  let handleDelete = async (id) => {
    try {
      let result = await axios.delete(`http://localhost:9000/data/delete/${id}`);
      console.log(result.message)
      if(result.data.ok){
        setEnergyData(energyData.filter(data => data._id !== id));
      }
      else{
        alert(result.data.response);
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  let handleEdit = (id) => {
    console.log(`Editing data with ID: ${id}`);
    navigate(`/edit/${id}`);
  };

  return (
    <Home>
      <div className="data-div">
      <p className="table-title m-4 fs-3 h4 fw-bold text-uppercase" style={{textAlign:"center"}}>Energy Consumption Data</p>
      <button className='ms-3 mb-4' onClick={()=>navigate("/add")}>+ Add</button>
        {energyData.length ? (
          <table className="table">
            
            <thead>
              <tr>
                <th>S.No</th>
                <th>Time</th>
                <th>Usage (kWh)</th>
                <th>Device</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {energyData.map((data, ind) => (
                <tr key={ind}>
                  <td>{ind + 1}</td>
                  <td>{data.timing.slice(0, 10)}</td>
                  <td>{data.usage}</td>
                  <td>{data.deviceName}</td>
                  <td>
                    <button onClick={() => handleEdit(data._id)}  className='btns'>Edit</button>
                    <button onClick={() => handleDelete(data._id)} className='btns'>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>
            <p className="text-center">No data available</p>
          </div>
        )}
      </div>
    </Home>
  );
}

export default DataPage;
