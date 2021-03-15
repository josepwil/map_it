import axios from "axios";
import { useContext } from "react";
import { useHistory } from "react-router";
import { UserContext } from "./UserContext";
import Map from './Map'

function Home (props) {
  const history = useHistory()
  const user = useContext(UserContext).user  

  const logout = () => {
    axios.post('/api/logout')
    .then(response => {
      props.handleLogout();
      history.push('/')
    })
  }

  const getMapData = () => {
    return {
      title: 'best pizza in Vancouver',
      center: [51.505, -0.09],
      markers: [
        {coords: [51.505, -0.09], popup: 'dominos'}, 
        {coords: [51.500, -0.09], popup: 'pizza hut'}
      ]
    }
  }

  const mapData = getMapData();

  return (
    <div>
      {user &&
      <> 
        <h3>Hi {user.name}</h3>
        <Map mapData={mapData}/>
      </>
      }
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Home;