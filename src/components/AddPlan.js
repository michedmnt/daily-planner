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
          id: propertyKey
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

    setTextInput(event.target.value)

  };

  // defined on submit event, to prevent the form from refreshing the page, and take the textInput state value to push into the database
  const handleSubmit = (event) => {

    event.preventDefault();

    const db = getDatabase(firebase);
    const dbRef = ref(db);

    push(dbRef, textInput);

    setTextInput("");

  };

  return (
    <>

    {/* placed the events within their places for the changes to happen  */}
    <section className="addPlan">
      <div className="wrapper">
        <form action="" onSubmit= { handleSubmit }>
          <label htmlFor="planInput"> Enter a plan for today:</label>

          <input id="inputPlan" type="text" name="planInput" onChange= { handleChange } value={textInput} />
          <button>Add Plan</button>
        </form>
      </div>
    </section>
    <section className="listOfPlans">
      <div className="wrapper">
        <ul>
          {
            // mapped through the daily plans pieces of state to generate <li>s for each plan
            plans.map ( (plan) => {
            return <li key={plan.id}>
                {plan.plan}
                <button onClick = {() => { handleClick(plan.id) }}>✅</button>
              </li>

            } );
          };
            
        </ul>
      </div>
    </section>
    
    </>

  )
}

export default AddPlan;