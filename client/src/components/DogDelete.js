import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DogDelete = ({deleteHandler}) =>{
    const location = useLocation();
    const dog = location.state.dog;
    const navigate = useNavigate();
    const [choice,setChoice] = useState(false);

    const formHandler = (e) =>{
        e.preventDefault();
        if(choice)
            deleteHandler(dog);
        navigate('/dogs');
    }
    return(
        <form onSubmit={formHandler}>
            <h3>Are you sure to delete dog entry?</h3>
            <div>
                <label style={{margin:20}}>ID: {dog.id}</label>
            </div>
            <div>
                <label style={{margin:20}}>Name: {dog.name}</label> 
            </div>
            <div style={{display:'inline-flex'}}>
                <button style={{margin:20}} onClick = {()=>setChoice(true)}>Yes</button>
                <button style={{margin:20}} onClick = {()=>setChoice(false)}>No</button>
            </div>
            
        </form>
    );
}

export default DogDelete;