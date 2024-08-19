import React, { useContext, useEffect, useState } from 'react'
import Home from './Home'
import { myData } from '../App';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Edit() {
    let { energyData, setEnergyData, msg, setMsg } = useContext(myData);
    let navigate = useNavigate()
    let {id} = useParams();
    let [btn, setBtn] = useState("Update");
    let [disable, setDisbale] = useState(false);
    let [data, setData] = useState({
        deviceName:"",
        timing:"",
        usage:""
    })

    useEffect(() => {
        let selectedData = energyData.find((data) => data._id === id);
        if (selectedData) {
          setData({
            deviceName: selectedData.deviceName,
            timing: selectedData.timing,
            usage: selectedData.usage
          });
        }
      }, [id, energyData]);

    function handleSubmit(e){
        e.preventDefault();
        addData(data);
    }
    let addData = async (newData) => {
        setBtn("Updating...")
        try {
          let result = await axios.put(`https://chart-server-l3wn.onrender.com/data/update/${id}`, newData);
          
          if (result.data.ok) {
            console.log('Data updated successfully:');
            setMsg(!msg);
            navigate("/data");
          } else {
            console.error('Error updating data:', result.data.response);
            alert(result.data.response);
          }
        } catch (error) {
          console.error('Server error:', error);
          alert('Server error. Please try again later.');
        }
        finally{
            setBtn("Update");

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
                <p className='h4 m-3'>Edit Energy Consumption</p>
                <form onSubmit={handleSubmit}>
                    <div className='d-flex flex-column justify-content-center' style={{gap:"20px", width:"350px"}}>
                        <div>
                            <input type='text' placeholder='device name' name='deviceName'
                            value={data.deviceName}
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

export default Edit;