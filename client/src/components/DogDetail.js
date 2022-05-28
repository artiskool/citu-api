import { Link, useLocation } from "react-router-dom";

const DogDetail = () => {
    const location = useLocation();
    const dog = location.state.dog;
    return (
        <div>
            <h1>Dog Detail</h1>
            <div>
                ID: {dog.id}
            </div>
            <div>
                Name: {dog.name}
            </div>
            <div>
                <Link to="/dogs">Back to Dogs List</Link>
            </div>
        </div>
    );
}

export default DogDetail;