import { useState } from 'react'
import { useHistory } from 'react-router'

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import NewMapController from './NewMapController'
import AddMarker from './AddMarker'

function NewMap(props) {
  const [mapName, setMapName] = useState('name your map');

  return (
    <div style={{height: '600px', width: '600px'}}>
      <input value={mapName} onChange={e => setMapName(e.target.value)} />
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
                {marker.popup}
              </Popup>
            </Marker>
          )
        })
      }
      <NewMapController mapData={props.mapData}/>
      <AddMarker mapData={props.mapData} setMapData={props.setMapData} />
    </MapContainer>
    <h3>save map</h3>
  </div>
  )
}

export default NewMap;