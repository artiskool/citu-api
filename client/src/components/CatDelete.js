import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CatDelete = ({deleteHandler}) => {
    const location = useLocation();
    const cat = location.state.cat;
    const [btn, setBtn] = useState(false);
    const navigate = useNavigate();
    const formHandler = (e) => {
        e.preventDefault();
        if(btn){
            deleteHandler(cat);
        }        
        navigate('/cats');
    }
    return (
        <form onSubmit={formHandler}>
            <div>
                <h2>Are you sure you want to delete {cat.name}?</h2>
            </div>
            <button onClick={(e)=>{setBtn(true)}}>Yes</button>
            <button>No</button>
        </form>
    );
}

export default CatDelete;