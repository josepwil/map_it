import { useMap } from 'react-leaflet'

function MapController(props) {
  console.log('its me')
  const map = useMap()
  map.flyTo(props.mapData.center, 13)

  return null
}

export default MapController;