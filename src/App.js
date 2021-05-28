import './App.css';
import React,{useState,useEffect} from 'react'

function App() {
  const [centers,setCenters]=useState([]);
  const [count,setCount]=useState(1);
  const [pin  , setPin] = useState("");
  const [date,setDate]=useState("");

  const sub = (e) => {
      e.preventDefault();
      setCount(count+1);
  }

  const rev=(data)=>{
    return data.toString().slice(0,10).split('-').reverse().join('-');
  }

  const getData= async()=>{
    const response=await fetch("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode="+pin+"&date="+date);
    const da=await response.json();
    setCenters(da["centers"]);
  }

  useEffect(()=>{
    if(count!==1){
      getData();
    }
  },[count]);
  return (
    <>
      <div>
        <center>
            <form style={{marginTop:"10px" }}
              onSubmit={(event) => {sub(event)}}
              className="form">
                <div className="heading">
                  WIN-COVID
                </div>
                <br/><br/><br/><br/><br/>
                <input className="pin" size="8" type="text" placeholder="Pin Code"
                  onChange={(e)=>{setPin(e.target.value)}} />
                  <br/>
                  <input type="date" className="date"
                  onChange={(e)=>{setDate(rev(e.target.value))}} />
                  <br/>
                <button type="submit" className="submit">SUBMIT</button>
            </form>
            <span className="span">*Enter Pin-code of area and date to check<br /> if the vaccine is available.</span>
        </center>
    </div>
    <div>
        <center>
        <h2><u>Center Details</u></h2>
        <table className="table" cellPadding="2vmin" cellSpacing="0">
          <thead>
            <th className="th">Name</th>
            <th className="th">Slots</th>
            <th className="th">Age</th>
          </thead>
          <tbody>
          {centers.map((center)=>{
            const{center_id,name,sessions}=center;
            return (
              <tr key={center_id}>
                <td className="td">{name}</td>
                <td className="td">{sessions[0].available_capacity}</td>
                <td>{sessions[0].min_age_limit}+</td>
              </tr>
            )
          })}
          </tbody>
        </table>
        <br />
        <h2>
        <a href="https://selfregistration.cowin.gov.in/">Book Slot</a>
        </h2>
        <div className="copy">©Rahul-Joshi</div>
        </center>
    </div>
  </>
  );
}

export default App;
