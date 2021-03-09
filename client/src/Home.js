import axios from "axios";

function Home (props) {

  const logout = () => {
    axios.post('api/logout')
  }

  return (
    <div>
      <h3>Hi {props.activeUser}</h3>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Home;