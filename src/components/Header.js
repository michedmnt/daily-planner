const Header = () => {

  // created variables for the date to appear as the same as the browser locale, with options to how to be displayed
  const currentDate = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  
  return (
    <header>
      <div className="wrapper">
        <h2 className="logo">Daily<br></br>Planner</h2>
        <h1 className="date">
          {/* used .toLocaleDateString to adjust the date with the options provided above  */}
          {currentDate.toLocaleDateString(undefined, options)}

        </h1>
      </div>
    </header>
  )
}

export default Header;