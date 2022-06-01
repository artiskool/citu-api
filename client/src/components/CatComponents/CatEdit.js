import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CatEdit = ({updateHandler}) => {
    const location = useLocation();
    const cat = location.state.cat;
    const [name, setName] = useState(cat.name);
    const navigate = useNavigate();
    const formHandler = (e) => {
        e.preventDefault();
        if (!name) {
            alert('Name is required!');
            return;
        }
        cat.name = name;
        updateHandler(cat);
        navigate('/cats');
    }
    return (
        <form onSubmit={formHandler}>
            <div>
                <label>ID: {cat.id}</label>
            </div>
            <label>Name</label>
            <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} />
            <button>Update</button>
        </form>
    );
}

export default CatEdit;