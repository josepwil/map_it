import { useEffect, useState } from 'react';
import axios from 'axios';

import { List, ListItem, ListItemText } from '@material-ui/core'

function MapList () {
const [maps, setMaps] = useState([])


const handleClick = (id) => {
  console.log(id)
}

useEffect(() => {
  axios.get('/api/maps')
    .then(res => {
      setMaps(res.data.maps)
    })
}, [])


  return (
    <div>
      <h3>My maps</h3>
      <List>
        {
          maps.map((map) => {
            return (
              <ListItem button onClick={() => handleClick(map.id)} key={map.id} >
                <ListItemText primary={map.title}/>
              </ListItem>
            )
          })
        }
      </List>
    </div>

  )
}

export default MapList;