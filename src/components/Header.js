const Header = () => {

  const currentDate = new Date()
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  
  return (
    <header>
      <div className="wrapper">
        <h2 className="logo">Daily<br></br>Planner</h2>
        <h1 className="date">

          {currentDate.toLocaleDateString(undefined, options)}

        </h1>
      </div>
    </header>
  )
}

export default Header;