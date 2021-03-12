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

  return (
    <div>
      {user &&
      <> 
        <h3>Hi {user.name}</h3>
        <Map />
      </>
      }
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Home;