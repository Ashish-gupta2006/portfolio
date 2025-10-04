import {useState, useEffect} from 'react'
import axios from 'axios'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
import {GridLoader} from 'react-spinners'
const Certification = () => {
  const[certificate, setCertificate]= useState([]);
  const[loading, setLoading]= useState(true);
  const getCertificate = async()=>{
    try {
      const res = await axios.get(`${BACKEND_URL}/portfolio/certificate`);
      setCertificate(res.data.data);
    } catch (error) {
      console.log(error);
      alert("failed to fetch data");
      
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    getCertificate();
  },[]);

  return (
    <div className="mt-10 px-6 max-w-5xl mx-auto mb-10">
      {loading && (
        <div className="flex justify-center items-center h-96">
          <GridLoader color="#2563EB" size={20} />
        </div>
      ) }
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">Certifications</h1>
        <div className="h-1 w-28 bg-blue-600 rounded-xl mx-auto mt-2"></div>
      </div>
      <div className=" grid grid-cols-1 grid-rows-1 md:grid-cols-2 lg:grid-cols-3 gap-6 rounded-xl shadow-xl mt-6 p-3 ">
        {certificate.map((data) => (
          <div key={data._id} className=" border rounded-xl border-blue-600 ">
            <div className="p-2 ">
              <img
                src={data.image.url}
                alt={`certi_${data._id}`}
                className="h-64 w-full object-cover rounded-ss-xl rounded-se-lg"
              />
            </div>
            <div className=" ps-2 mt-0 mb-6">
              <h2 className="font-semibold  text-2xl mt-0 italic text-gray-700">
                {data.titel}
              </h2>
              <p className="font-medium mt-0 italic text-gray-600">
                {data.institute}
              </p>
              <p className="text-sm text-gray-600 italic">
                {data.start}&nbsp;-&nbsp;{data.end}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Certification