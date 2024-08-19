import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home({children}) {
    let navigate = useNavigate()
    return (
        <div className='home-div'>
            <div className='nav-bar'>
                <div className='nav-bar d-flex justify-content-between align-items-center p-1' style={{ height: "100px", background: "#00325E" }}>
                    <div className='d-flex' style={{gap:"15px"}}>
                    <p style={{ color: "white", fontWeight: "600", fontSize: "16px", marginTop: "6px", border:"1px solid white", padding:"8px", cursor:"pointer" }} onClick={()=>navigate("/")}>Home</p>
                    <p style={{ color: "white", fontWeight: "600", fontSize: "16px", marginTop: "6px", border:"1px solid white", padding:"8px 14px", cursor:"pointer" }} onClick={()=>navigate("/data")}>Data</p>
                    </div>
                    <button className='btn' style={{ background: "red", color: "white", fontSize:"16px" }}>Logout</button>
                </div>
            </div>
            <div className='main'>
                {children}
            </div>
        </div>
    )
}

export default Home