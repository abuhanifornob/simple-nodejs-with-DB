import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users,setUsers]=useState([]);
  useEffect(()=>{
    fetch("http://localhost:5000/users")
    .then(res=>res.json())
    .then(data=>setUsers(data))
  },[])

  const handeUserForm=(event)=>{
    event.preventDefault();
    const form=event.target;
    const name=form.name.value;
    const email=form.email.value;
    const user={name,email};
    fetch("http://localhost:5000/users",{
     method:"POST",
     headers:{
      'Content-Type': 'application/json'
     },
     body:JSON.stringify(user)

    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
      const newUser=[...users,data];
      setUsers(newUser);
    })
    .catch(error=>console.error("error",error))
    form.reset();
  }
 
  return (
    <div className="App">
      <form onSubmit={handeUserForm}>
        <input type="text" name="name" />
        <input type="email" name="email" id="" />
        <button type="submit">Set Users</button>
      </form>
        <p>Users:{users.length} </p>
        {
          users.map(user=><p key={user._id}>
            {user.email}
          </p>)
        }
    </div>
  );
}

export default App;
