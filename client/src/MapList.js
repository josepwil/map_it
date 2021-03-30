import { useEffect, useState, forceUpdate } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';

import { List, ListItem, ListItemText } from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

function MapList ({ setMapData, mapData, maps, getMapData }) {
const history = useHistory()

console.log('rendering maplist')


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
      setMapData(formattedMap);
      history.push('/home')
    })
}

const deleteMap = (id) => {
  axios.delete(`/api/maps/${id}`)
    .then(res => {
      getMapData()
      history.push('/home')
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
    setMapData(formattedMap);
    history.push('/edit')
  })
}

useEffect(() => {
  getMapData()
}, [])


  return (
    <div>
      <h3>My maps</h3>
      <List>
        { maps &&
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