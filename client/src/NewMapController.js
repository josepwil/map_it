import { useMap } from 'react-leaflet'

function NewMapController(props) {
  const newMap = useMap()
  newMap.flyTo(props.mapData.center)

  return null
}

export default NewMapController;