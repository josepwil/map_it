import { useMap } from 'react-leaflet'
import { useEffect } from 'react'

function MapController(props) {
  const map = useMap()
  map.setView(props.mapData.center)

  return null
}

export default MapController;