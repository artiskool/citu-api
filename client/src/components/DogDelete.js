import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DogDelete = ({deleteHandler}) => {
    const location = useLocation();
    const dog = location.state.dog;
    const [btn, setBtn] = useState('');
    const navigate = useNavigate();
    const formHandler = (e) => {
        e.preventDefault();
        if(btn==='Yes'){
            deleteHandler(dog);
        }        
        navigate('/dogs');
    }
    return (
        <form onSubmit={formHandler}>
            <div>
                <h2>Are you sure you want to delete {dog.name}?</h2>
            </div>
            <button value="Yes" onClick={(e)=>{setBtn(e.target.value)}}>Yes</button>
            <button value="No" onClick={(e)=>{setBtn(e.target.value)}}>No</button>
        </form>
    );
}

export default DogDelete;