import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';

import { List, ListItem, ListItemText } from '@material-ui/core'

function MapList (props) {
const history = useHistory()
const [maps, setMaps] = useState([])

const handleClick = (id) => {
  axios.get(`/api/maps/${id}`)
    .then(res => {
      const {map, markers} = res.data
      const formattedMarkers = markers.map(marker => {
        return {
          ...marker,
          coords: marker.coords.split(',').map(x => parseFloat(x))
        }
      })
      const formattedMap = {
        ...map, 
        center: map.center.split(',').map(x => parseFloat(x)),
        markers: formattedMarkers
      }
      props.setMapData(formattedMap);
      history.push('/')
    })
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