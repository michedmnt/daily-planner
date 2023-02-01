// import react hooks used
import { useState, useEffect } from "react";
// import firebase so I can have access to the firebase modules needed to connect to the database
import firebase from '../firebase';
import { onValue, ref, getDatabase, remove, push } from 'firebase/database';

const AddPlan = () => {
  
  // initialize state to hold the daily plans in place
  const [plans, setPlans] = useState([]);

  // initialize another state to keep track of the internal state of the text input
  const [ textInput, setTextInput ] = useState("");

  // initialize another state to keep track of times from options selected
  const [ optionSelection, setOptionSelection ] = useState("");

  // defined a side effect which will run only ONE time on component load (any further updates to the database will be listened to for via the firebase onValue module)
  useEffect( () => {

    const db = getDatabase(firebase);
    const dbRef = ref(db);

    onValue(dbRef, (dbResponse) => {

      const dbValue = dbResponse.val();

      const arrayOfPlans = [];
      

      for (let propertyKey in dbValue) {
        // pushed every plan within the object into an empty array
        arrayOfPlans.push({
          plan: dbValue[propertyKey],
          id: propertyKey,
        });
      };

      // taken the array of daily plans that was created and saved it to state, now that it has been updated
      setPlans(arrayOfPlans);
    });
  }, []);

  // defined a click event which will remove the selected plan from the database once clicked 

  const handleClick = (plankey) => {

    const db = getDatabase(firebase);
    const dbRef = ref(db, `/${plankey}`);

    remove(dbRef);

  };

  // defined a event handler which will update state every time the user types within the input with the value of what they have typed
  const handleChange = (event) => {

    setOptionSelection(event.target.value);

    setTextInput(event.target.value);


  };

  // defined on submit event, to prevent the form from refreshing the page, and take the textInput state value to push into the database
  const handleSubmit = (event) => {

    event.preventDefault();

    const db = getDatabase(firebase);
    const dbRef = ref(db);


    push(dbRef, textInput);

    setTextInput("");
 
  };
  
  // sorted and mapped through array, to allow times to appear in correct order on the page when you have added your plans to the day
  const compare = (a, b) => {
    if (a.plan > b.plan) {
      return 1;
    }
    if (a.plan < b.plan) {
      return -1;
    }
    return 0
  }

  let sortedPlans = plans.sort(compare)
    .map( (plan) => {
    return <li key={plan.id} className="item">
                {plan.plan}
                <button className="done" onClick = {() => { handleClick(plan.id) }}>✅</button>
              </li>
  } )

  return (
    <>
    {/* placed the events within their places for the changes to happen, and defined options for drop down menu  */}
    <section className="addPlan">
      <div className="wrapper">
        <form action="" onSubmit= { handleSubmit }>
          <label htmlFor="planInput"> Enter a plan for today:</label>
          <select onChange = { handleChange } value={ optionSelection }>
            <option  value="placeholder" disabled>Pick a time slot</option>
            <option value="06:00 - 07:00:">6:00AM - 7:00AM</option>
            <option value="07:00 - 08:00:">7:00AM - 8:00AM</option>
            <option value="08:00 - 09:00:">8:00AM - 9:00AM</option>
            <option value="09:00 - 10:00:">9:00AM - 10:00AM</option>
            <option value="10:00 - 11:00:">10:00AM - 11:00AM</option>
            <option value="11:00 - 12:00:">11:00AM - 12:00PM</option>
            <option value="12:00 - 13:00:">12:00PM - 1:00PM</option>
            <option value="13:00 - 14:00:">1:00PM - 2:00PM</option>
            <option value="14:00 - 15:00:">2:00PM - 3:00PM</option>
            <option value="15:00 - 16:00:">3:00PM - 4:00PM</option>
            <option value="16:00 - 17:00:">4:00PM - 5:00PM</option>
            <option value="17:00 - 18:00:">5:00PM - 6:00PM</option>
            <option value="18:00 - 19:00:">6:00PM - 7:00PM</option>
            <option value="19:00 - 20:00:">7:00PM - 8:00PM</option>
            <option value="20:00 - 21:00:">8:00PM - 9:00PM</option>
            <option value="21:00 - 22:00:">9:00PM - 10:00PM</option>
          </select>
          <input id="inputPlan" type="text" name="planInput" required onChange= { handleChange } value={textInput} />
          <button className="addBtn">Add Plan</button>
        </form>
      </div>
    </section>
    <section className="listOfPlans">
      <div className="wrapper">
        <ul>
          {
            sortedPlans
          }
            
        </ul>
      </div>
    </section> 
    </>
  )
}

export default AddPlan;