import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';

import { List, ListItem, ListItemText } from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

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

const deleteMap = (id) => {
  axios.delete(`/api/maps/${id}`)
    .then(res => {
      console.log('map deleted')
      history.push('/')
    })
    .catch(err => {
      console.log('err', err)
    })
}

const editMap = (id) => {
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
    history.push('/edit')
  })
}

useEffect(() => {
  axios.get('/api/maps')
    .then(res => {
      setMaps(res.data.maps)
      console.log('changing')
    })
}, [])


  return (
    <div>
      <h3>My maps</h3>
      <List>
        {
          maps.map((map) => {
            return (
              <li>
              <ListItem button key={map.id} onClick={() => handleClick(map.id)} >
                <ListItemText primary={map.title} />
              </ListItem>
                <EditIcon onClick={() => editMap(map.id)}/>
                <DeleteForeverIcon onClick={() => deleteMap(map.id)} />
              </li>
            )
          })
        }
      </List>
    </div>

  )
}

export default MapList;