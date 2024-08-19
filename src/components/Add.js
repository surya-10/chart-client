import React, { useContext, useState } from 'react'
import Home from './Home'
import { myData } from '../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Add() {
    let navigate = useNavigate()
    let { energyData, setEnergyData, setMsg, msg } = useContext(myData);
    let [btn, setBtn] = useState("Create");
    let [disable, setDisbale] = useState(false);
    let [data, setData] = useState({
        deviceName:"",
        timing:"",
        usage:""
    })

    function handleSubmit(e){
        e.preventDefault();
        addData(data);
    }

    let addData = async (newData) => {
        setBtn("Adding...")
        try {
          let result = await axios.post('http://localhost:9000/data/create-data', newData);
          
          if (result.data.ok) {
            console.log('Data added successfully:');
            setMsg(!msg);
            navigate("/data");
          } else {
            console.error('Error adding data:', result.data.response);
            alert(result.data.response);
            return null;
          }
        } catch (error) {
          console.error('Server error:', error);
          alert('Server error. Please try again later.');
          return null;
        }
        finally{
            setBtn("Create");

        }
      };

    function handleChange(e){
        let {name, value} = e.target;
        setData(prevState=>({
            ...prevState,
            [name]:value
        }))
    }
  return (
    <Home>
        <div className='add-data d-flex justify-content-center align-items-center min-vh-100'>
            <div className='inp-forms'>
                <p className='h4 m-3'>Add Energy Consumption</p>
                <form onSubmit={handleSubmit}>
                    <div className='d-flex flex-column justify-content-center' style={{gap:"20px", width:"350px"}}>
                        <div>
                            <input type='text' placeholder='device name' name='deviceName'
                            value={data.device}
                            onChange={handleChange}
                            required/>
                        </div>
                        <div>
                            <input type='number' placeholder='Enter power' name='usage'
                            value={data.usage}
                            onChange={handleChange}
                            required/>
                        </div>
                        <div>
                            <input type='date' placeholder='date' name='timing' required
                            value={data.timing}
                            onChange={handleChange}/>
                        </div>
                        <div>
                            <button disabled={disable}>{btn}</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </Home>
  )
}

export default Add