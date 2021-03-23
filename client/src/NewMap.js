import { useState } from 'react'
import { useHistory } from 'react-router'

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import NewMapController from './NewMapController'
import AddMarker from './AddMarker'

function NewMap(props) {
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

  const handleNameChange = (name) => {
    props.setMapData({
      ...props.mapData,
      title: name
    })
  }

  const saveMap = () => {
    // update Map title

    console.log(props.mapData)
  }

  return (
    <div style={{height: '600px', width: '600px'}}>
      <input value={props.mapData.title} onChange={e => handleNameChange(e.target.value)} />
      <MapContainer style={{height: '400px', width: '90%'}} center={props.mapData.center} zoom={13} scrollWheelZoom={false}>
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
    <h3 onClick={saveMap}>save map</h3>
  </div>
  )
}

export default NewMap;