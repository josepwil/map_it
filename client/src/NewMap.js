import { useHistory } from 'react-router'

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import MapController from './MapController'

function NewMap(props) {

  return (
    <div style={{height: '600px', width: '600px'}}>
    <h3>{props.mapData.title}</h3>
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
<MapController mapData={props.mapData}/>
</MapContainer>
<h3>save map</h3>
  </div>
  )
}

export default NewMap;