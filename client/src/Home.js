import axios from "axios";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { UserContext } from "./UserContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Map from './Map'
import MapList from './MapList'
import NewMap from './NewMap'
import EditMap from './EditMap'

function Home (props) {
  const history = useHistory()
  const user = useContext(UserContext).user
  const [mapData, setMapData] = useState({
    title: 'here\'s a map, click +NEWMAP to make your own ',
    center: [51.505, -0.09],
    markers: [
      {coords: [51.505, -0.09], popup: 'best coffee'}, 
      {coords: [51.500, -0.09], popup: 'second best coffee'}
    ]
  })  
  const [maps, setMaps] = useState()

  const handleClick = (id) => {
    axios.get(`/api/maps/${id}`)
      .then(res => {
        const {map, markers} = res.data
        const formattedMarkers = markers.map(marker => {
          return {
            ...marker,
            coords: marker.coords.split(',').map(x => parseFloat(x))
          }
        })
        const formattedMap = {
          ...map, 
          center: map.center.split(',').map(x => parseFloat(x)),
          markers: formattedMarkers
        }
        setMapData(formattedMap);
        history.push('/home')
      })
  }
 
  const getMapData = () => {
    axios.get('/api/maps')
    .then(res => {
      setMaps(res.data.maps)
      res.data.maps.length > 0 && handleClick(res.data.maps[0].id)
    })
  }

  

  const logout = () => {
    axios.post('/api/logout')
    .then(response => {
      props.handleLogout();
      history.push('/')
    })
  }

  

  return (
    <Router>
      <Switch>
        <Route path="/add">
          <div className='homeContainer'>
            {user &&
            <>
              <div className='nav'>
                <h3>Hi {user.name},</h3>
                <button className='button' onClick={logout}>SIGN OUT</button>
              </div> 
              <div className='mapContainer'>
                <NewMap mapData={mapData} setMapData={setMapData} getMapData={getMapData}/>
                <MapList setMapData={setMapData} mapdata={mapData} maps={maps} getMapData={getMapData}/>
              </div>
            </>
            }
          </div>
        </Route>
        <Route path="/edit">
          <div className='homeContainer'>
            {user &&
            <> 
              <div className='nav'>
                <h3>Hi {user.name},</h3>
                <button className='button' onClick={logout}>SIGN OUT</button>
              </div> 
              <div className='mapContainer'>
                <EditMap mapData={mapData} setMapData={setMapData} getMapData={getMapData}/>
                <MapList setMapData={setMapData} mapdata={mapData} maps={maps} getMapData={getMapData}/>
              </div>
            </>
            }
          </div>
        </Route>
        <Route path="/home">
          <div className='homeContainer'>
            {user &&
            <> 
              <div className='nav'>
                <h3>Hi {user.name},</h3>
                <button className='button' onClick={logout}>SIGN OUT</button>
              </div> 
              <div className='mapContainer'>
                <Map mapData={mapData} setMapData={setMapData}/>
                <MapList setMapData={setMapData} mapdata={mapData} maps={maps} getMapData={getMapData}/>
              </div>
            </>
            }
          </div>
        </Route>
      </Switch>
    </Router>
  )
}

export default Home;