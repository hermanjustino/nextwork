import Nav from "../components/Nav"

const Home = () => {

    const authToken = true

    const handleClick = () => {
        console.log('clicked')
    }
    return (
        <>
        <Nav />
      <div className="home">
        <h1>Your Network, your Net worth</h1>
        <button className="primary_button" onClick={handleClick}>Click me</button>
        {authToken ? "signout" : "create account"}
      </div>
      </>
    )
  }
  
  export default Home;