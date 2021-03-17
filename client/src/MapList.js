import { useEffect, useState } from 'react';
import axios from 'axios';

function MapList () {
const [maps, setMaps] = useState([])
console.log('I am maps', maps)

useEffect(() => {
  axios.get('/api/maps')
    .then(res => {
      setMaps(res.data.maps)
    })
}, [])


  return (
    <div>
      <h3>I am the map list</h3>
      {
        maps.map((map) => {
          return (
            <h3 key={map.id}>{map.title}</h3>
          )
        })
      }
    </div>

  )
}

export default MapList;