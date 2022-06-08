import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CatDelete = ({deleteHandler}) =>{
    const location = useLocation();
    const cat = location.state.cat;
    const navigate = useNavigate();
    const [choice,setChoice] = useState(false);

    const formHandler = (e) =>{
        e.preventDefault();
        if(choice)
            deleteHandler(cat);
        navigate('/cats');
    }
    return(
        <form onSubmit={formHandler}>
            <h3>Are you sure to delete cat entry?</h3>
            <div>
                <label style={{margin:20}}>ID: {cat.id}</label>
            </div>
            <div>
                <label style={{margin:20}}>Name: {cat.name}</label> 
            </div>
            <div style={{display:'inline-flex'}}>
                <button style={{margin:20}} onClick = {()=>setChoice(true)}>Yes</button>
                <button style={{margin:20}} onClick = {()=>setChoice(false)}>No</button>
            </div>
            
        </form>
    );
}

export default CatDelete;