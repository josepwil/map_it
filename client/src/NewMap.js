function NewMap(props) {

  const handleClick = () => {
   navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;

    props.setMapData({
      title: 'new map',
      center: [latitude, longitude],
      markers: []
    })
   }) 
  }

  return (
    <h3 onClick={handleClick}>add new map</h3>
  )
}

export default NewMap;