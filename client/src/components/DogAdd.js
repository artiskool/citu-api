import { useState } from "react";
import { useNavigate } from "react-router-dom";

<<<<<<< HEAD
const DogAdd = ({ addHandler }) => {
=======
const DogAdd = ({addHandler}) => {
>>>>>>> e62d4a40cb3553b0d6e17fd2c5ad1f90d9e9d708
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const formHandler = (e) => {
        e.preventDefault();
        if (!name) {
            alert('Name is required!');
            return;
        }
<<<<<<< HEAD
        addHandler({ id: 0, name });
=======
        addHandler({id: 0, name});
>>>>>>> e62d4a40cb3553b0d6e17fd2c5ad1f90d9e9d708
        navigate('/dogs');
    }
    return (
        <form onSubmit={formHandler}>
            <label>Name</label>
<<<<<<< HEAD
            <input type="text" onChange={(e)=>{setName(e.target.value)}}/>
            <button>Add</button>
        </form>
    )
}
=======
            <input type="text" onChange={(e)=>{setName(e.target.value)}} />
            <button>Add</button>
        </form>
    );
}

>>>>>>> e62d4a40cb3553b0d6e17fd2c5ad1f90d9e9d708
export default DogAdd;