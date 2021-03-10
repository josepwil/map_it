import axios from "axios";
import { useContext } from "react";
import { useHistory } from "react-router";
import { UserContext } from "./UserContext";

function Home (props) {

  const history = useHistory()

  const user = useContext(UserContext).user
  console.log('user ~~~', user)

  

  const logout = () => {
    axios.post('/api/logout')
    .then(response => {
      props.handleLogout();
      history.push('/')
    })
  }

  return (
    <div>
      {user && <h3>Hi {user.name}</h3>}
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Home;