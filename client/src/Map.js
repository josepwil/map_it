import { useHistory } from 'react-router'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import MapController from './MapController'

function Map(props) {
  const history = useHistory();  
  const handleClick = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      
      props.setMapData({
        title: 'new map',
        center: [latitude, longitude],
        markers: []
      })
    }) 
    history.push('/add')
   }

  return(
    <div className='mapContainerL'>
      <h3>{props.mapData.title}</h3>
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
                  {marker.popup}
                </Popup>
              </Marker>
            )
          })
        }
        <MapController mapData={props.mapData}/>
      </MapContainer>
      <h3 className='mapAction' onClick={handleClick}>+NEWMAP</h3>
    </div>
  )
}

export default Map;