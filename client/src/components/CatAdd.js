import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CatAdd= ({addHandler}) =>{

    const [name,setName] = useState('');
    const navigate = useNavigate();
    const formHandler = (e) =>{
        e.preventDefault();
        if(!name){
            alert('Name is required!');
            return;
        }
        addHandler({id:0,name});
        navigate('/cats');
    }

    return(
        <form onSubmit={formHandler}>
            <div>
                <label style={{margin:20}}>Name</label>
                <input type="text" onChange={(e)=>{setName(e.target.value)}} />
                <button style={{margin:20}}>Create</button>
            </div>
        </form>
    );
}

export default CatAdd;