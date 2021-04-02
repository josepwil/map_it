import { useState } from 'react'
import { useHistory } from 'react-router'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import NewMapController from './NewMapController'
import AddMarker from './AddMarker'
import axios from 'axios'

function NewMap(props) {
  const history  = useHistory();
  const [error, setError] = useState('')
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

  const handleNameChange = (name) => {
    props.setMapData({
      ...props.mapData,
      title: name
    })
  }

  const saveMap = () => {
    if(!props.mapData.title) {
      setError('please enter a name for your map')
      return 0;
    }
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

    axios.post('/api/maps', formattedMap)
      .then((res) => {
        console.log('map created')
        props.getMapData();
        history.push('/home')
      })
      .catch((err) => {
        console.log('err', err)
      })
  }

  return (
    <div className='mapContainerL'>
      <input autoFocus value={props.mapData.title} onChange={e => handleNameChange(e.target.value)} />
        {error && <h4 style={{color: 'red', margin: '0 0 1rem 0'}}>{error}</h4>}
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
                {/* needs work */}
                {<input onChange={(e) => setMarkerPopup(e, index)} value={marker.popup} autoFocus/>}
              </Popup>
            </Marker>
          )
        })
      }
      <NewMapController mapData={props.mapData}/>
      <AddMarker mapData={props.mapData} setMapData={props.setMapData} />
    </MapContainer>
    <h3 className='mapAction' onClick={saveMap}>SAVE MAP</h3>
  </div>
  )
}

export default NewMap;