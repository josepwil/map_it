import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

function Map(props) {
  const {title, center, markers} = props.mapData
  return(
    <div style={{height: '600px', width: '600px'}}>
      <h3>{title}</h3>
    <MapContainer style={{height: '400px', width: '90%'}} center={center} zoom={13} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  
  {
    markers.map((marker, index) => {
      return(
        <Marker key={index} position={marker.coords}>
          <Popup>
            {marker.popup}
          </Popup>
        </Marker>
      )
    })
}
</MapContainer>
    </div>
  )
}

export default Map;