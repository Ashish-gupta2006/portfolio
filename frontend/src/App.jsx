import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
function App() {
  const [count, setCount] = useState(0)

const getRequest = async()=>{
   try {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL);
      console.log("Response Data:", response.data);
      alert(`Data from backend: ${JSON.stringify(response.data)}`);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch data from backend");
    }
}
  return (
    <>
      <button type="submit" onClick={getRequest}>click</button>
    </>
  );
}

export default App
