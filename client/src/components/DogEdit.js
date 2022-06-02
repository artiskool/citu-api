import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DogEdit = ({updateHandler}) =>{
    const location = useLocation();
    const dog = location.state.dog;
    const [name,setName] = useState(dog.name);
    const navigate = useNavigate();
    const formHandler = (e) =>{
        e.preventDefault();
        if(!name){
            alert('Name is required!');
            return;
        }
        dog.name = name;
        updateHandler(dog);
        navigate('/dogs');
    }

    return(
        <form onSubmit={formHandler}>
            <div>
                <label style={{margin:20}}>ID: {dog.id}</label>
                <label style={{margin:20}}>Name</label>
                <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} />
                <button style={{margin:20}}>Update</button>
            </div>
        </form>
    );
}

export default DogEdit;