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
    console.log(centers);
  }

  useEffect(()=>{
    if(count!=1){
      getData();
    }
  },[count]);
  return (
    <>
      <div>
        <center>
            <form style={{marginTop:"100px" }}
              onSubmit={(event) => {sub(event)}}>
                <input type="text" placeholder="Enter The Pin"
                  onChange={(e)=>{setPin(e.target.value)}} />
                  <br/><br/>
                  <input type="date" 
                  onChange={(e)=>{setDate(rev(e.target.value))}} />
                  <br/><br/>
                <button type="submit">Submit</button>
            </form>
        </center>
    </div>
    <div>
        <center>
        <h2>Center Details</h2>
        <table>
          <tr>
            <th>Name</th>
            <th>Slots</th>
            <th>Age</th>
          </tr>
          {centers.map((center)=>{
            const{center_id,name,sessions}=center;
            return (
              <tr key={center_id}>
                <td>{name}</td>
                <td>{sessions[0].available_capacity}</td>
                <td>{sessions[0].min_age_limit}+</td>
              </tr>
            )
          })}
        </table>
        <br />
        <h1>
        <a href="https://selfregistration.cowin.gov.in/">Book Slot</a>
        </h1>
        </center>

    </div>
  </>
  );
}

export default App;
