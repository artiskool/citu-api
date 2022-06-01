import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DogAdd = ({addHandler}) => {
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const formHandler = (e) => {
        e.preventDefault();
        if (!name) {
            alert('Name is required!');
            return;
        }
        addHandler({id: 0, name});
        navigate('/dogs');
    }
    return (
        <form onSubmit={formHandler}>
            <label>Name</label>
            <input type="text" onChange={(e)=>{setName(e.target.value)}} />
            <button>Add</button>
        </form>
    );
}

export default DogAdd;