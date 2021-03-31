import { useState } from 'react'
import { useHistory } from 'react-router'

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import DeleteIcon from '@material-ui/icons/Delete';

import NewMapController from './NewMapController'
import AddMarker from './AddMarker'
import axios from 'axios'

function EditMap(props) {
  const history = useHistory();
  const [mapName, setMapName] = useState('name your map');

  const setMarkerPopup = (e, index) => {
    const markerCopy = [...props.mapData.markers];
    const updatedMarker = {...markerCopy[index]}
    updatedMarker.popup = e.target.value
    markerCopy[index] = updatedMarker
    // will need to debounce this
    props.setMapData({
      ...props.mapData,
      markers: markerCopy
    })
  }
  
  const deleteMarker = (index) => {
    const markerCopy = [...props.mapData.markers];
    markerCopy.splice(index, 1)
    props.setMapData({
      ...props.mapData,
      markers: markerCopy
    })
  }

  const handleNameChange = (name) => {
    props.setMapData({
      ...props.mapData,
      title: name
    })
  }

  const saveMap = (id) => {
    // update Map title
    const formattedMarkers = props.mapData.markers.map(marker => {
      return {
        ...marker,
        coords: marker.coords.join(',')
      }
    })
    const formattedMap = {
      ...props.mapData,
      center: props.mapData.center.join(','),
      markers: formattedMarkers
    }
    axios.put(`/api/maps/${id}`, formattedMap)
      .then((res) => {
        console.log('map updated')
        props.getMapData();
        history.push('/home')
      })
      .catch((err) => {
        console.log('err', err)
      })
  }

  return (
    <div className='mapContainerL'>
      <input value={props.mapData.title} onChange={e => handleNameChange(e.target.value)} />
      <MapContainer style={{height: '85%', width: '85%'}} center={props.mapData.center} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      {
        props.mapData.markers.map((marker, index) => {
          return(
            <Marker key={index} position={marker.coords}>
              <Popup>
                <input onChange={(e) => setMarkerPopup(e, index)} value={marker.popup} autoFocus/>
                <DeleteIcon onClick={() => deleteMarker(index)} />
              </Popup>
            </Marker>
          )
        })
      }
      <NewMapController mapData={props.mapData}/>
      <AddMarker mapData={props.mapData} setMapData={props.setMapData} />
    </MapContainer>
    <h3 onClick={() => saveMap(props.mapData.id)}>save map</h3>
  </div>
  )
}

export default EditMap;