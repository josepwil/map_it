import { useMapEvents } from "react-leaflet";

function AddMarker(props) {

  const map = useMapEvents({
    click(e) {
      const {lat, lng} = e.latlng;
      props.setMapData({
        ...props.mapData,
        center: [lat, lng],
        markers: [...props.mapData.markers, {coords: [lat, lng], popup: ''}]
      })
    }
  })

  return null
}

export default AddMarker;