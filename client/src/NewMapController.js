import { useMap } from 'react-leaflet'

function NewMapController(props) {
  const newMap = useMap()
  const zoomLevel = newMap.getZoom()
  console.log('~~~~~~~~~~~~~~~ ', zoomLevel)
  newMap.setView(props.mapData.center, zoomLevel)

  return null
}

export default NewMapController;