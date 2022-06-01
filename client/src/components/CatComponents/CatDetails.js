import { Link, useLocation } from "react-router-dom";

const CatDetail = () => {
    const location = useLocation();
    const cat = location.state.cat;
    return (
        <div>
            <h1>Cat Detail</h1>
            <div>
                ID: {cat.id}
            </div>
            <div>
                Name: {cat.name}
            </div>
            <div>
                <Link to="/cats">Back to Cats List</Link>
            </div>
        </div>
    );
}

export default CatDetail;