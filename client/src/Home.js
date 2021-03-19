import axios from "axios";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { UserContext } from "./UserContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Map from './Map'
import MapList from './MapList'
import NewMap from './NewMap'

function Home (props) {
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
              <NewMap mapData={mapData} setMapData={setMapData}/>
              <MapList setMapData={setMapData}/>
            </>
            }
            <button onClick={logout}>Logout</button>
          </div>
        </Route>
        <Route path="/">
          <div>
            {user &&
            <> 
              <h3>Hi {user.name}</h3>
              <Map mapData={mapData} setMapData={setMapData}/>
              <MapList setMapData={setMapData}/>
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