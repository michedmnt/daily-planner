import { useState, useEffect } from "react";
import firebase from '../firebase';
import { onValue, ref, getDatabase, remove, push } from 'firebase/database';

const AddPlan = () => {
  
  const [plans, setPlans] = useState([]);

  const [ textInput, setTextInput ] = useState("");

  useEffect( () => {

    const db = getDatabase(firebase);
    const dbRef = ref(db);

    onValue(dbRef, (dbResponse) => {

      const dbValue = dbResponse.val();

      const arrayOfPlans = [];

      for (let propertyKey in dbValue) {
        arrayOfPlans.push({
          plan: dbValue[propertyKey],
          id: propertyKey
        });
      }

      setPlans(arrayOfPlans);
    });
  }, []);

  const handleClick = (plankey) => {

    const db = getDatabase(firebase);

    const dbRef = ref(db, `/${plankey}`);

    remove(dbRef);

  }

  const handleChange = (event) => {

    setTextInput(event.target.value)

  }

  const handleSubmit = (event) => {

    event.preventDefault();

    const db = getDatabase(firebase);
    const dbRef = ref(db);

    push(dbRef, textInput);

    setTextInput("");

  }

  return (
    <>
    <section>
      <form action="" onSubmit= { handleSubmit }>
        <label htmlFor="planInput"> Enter a plan for today:</label>

        <input type="text" name="planInput" onChange= { handleChange } value={textInput} />
        <button>Add Plan</button>
      </form>
    </section>
    <section>
      <ul>
        {

          plans.map ( (plan) => {
          return <li key={plan.id}>
              {plan.plan}
              <button onClick = {() => { handleClick(plan.id) }}>Done ✅</button>
            </li>

          } )
        }
          
      </ul>
    </section>
    
    </>

  )
}

export default AddPlan;