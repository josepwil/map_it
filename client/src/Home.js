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
  console.log('rendering home')

  const history = useHistory()
  const user = useContext(UserContext).user
  const [mapData, setMapData] = useState({
    title: 'Best Pizza spots in London',
    center: [51.505, -0.09],
    markers: [
      {coords: [51.505, -0.09], popup: 'dominos'}, 
      {coords: [51.500, -0.09], popup: 'pizza hut'}
    ]
  })  
  const [maps, setMaps] = useState()

  const getMapData = () => {
    axios.get('/api/maps')
    .then(res => {
      setMaps(res.data.maps)
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
          <div>
            {user &&
            <> 
              <h3>Hi {user.name}</h3>
              <NewMap mapData={mapData} setMapData={setMapData} getMapData={getMapData}/>
              <MapList setMapData={setMapData} mapdata={mapData} maps={maps} getMapData={getMapData}/>
            </>
            }
            <button onClick={logout}>Logout</button>
          </div>
        </Route>
        <Route path="/edit">
          <div>
            {user &&
            <> 
              <h3>Hi {user.name}</h3>
              <EditMap mapData={mapData} setMapData={setMapData} getMapData={getMapData}/>
              <MapList setMapData={setMapData} mapdata={mapData} maps={maps} getMapData={getMapData}/>
            </>
            }
            <button onClick={logout}>Logout</button>
          </div>
        </Route>
        <Route path="/home">
          <div>
            {user &&
            <> 
              <h3>Hello {user.name}</h3>
              <Map mapData={mapData} setMapData={setMapData}/>
              <MapList setMapData={setMapData} mapdata={mapData} maps={maps} getMapData={getMapData}/>
            </>
            }
            <button onClick={logout}>Logout</button>
          </div>
        </Route>
      </Switch>
    </Router>
  )
}

export default Home;