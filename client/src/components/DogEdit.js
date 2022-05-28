import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DogEdit = ({updateHandler}) => {
    const location = useLocation();
    const dog = location.state.dog;
    const [name, setName] = useState(dog.name);
    const navigate = useNavigate();
    const formHandler = (e) => {
        e.preventDefault();
        if (!name) {
            alert('Name is required!');
            return;
        }
        dog.name = name;
        updateHandler(dog);
        navigate('/dogs');
    }
    return (
        <form onSubmit={formHandler}>
            <div>
                <label>ID: {dog.id}</label>
            </div>
            <label>Name</label>
            <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} />
            <button>Update</button>
        </form>
    );
}

export default DogEdit;