import { useNavigate, useLocation, Navigate } from "react-router-dom";

const CatDelete = ({ delHandler }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const catID = location.state.cat.id;
    const catName = location.state.cat.name;
    const handleYes = (e) => {
        delHandler({ id: catID});
        navigate('/cats');
    }
    const handleNo = (e) => {
        navigate('/cats');
    }
    return (
        <article>
            <h2>Delete {`${catName}`}?</h2>
            <button onClick={handleYes}> Yes</button>
            <button onClick={handleNo}> No</button>
        </article>
    )
};

export default CatDelete;
