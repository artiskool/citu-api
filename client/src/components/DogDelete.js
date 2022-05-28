import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation, Navigate } from "react-router-dom";

const DogDelete = ({ delHandler }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dogID = location.state.dog.id;
    const dogName = location.state.dog.name;
    const handleYes = (e) => {
        delHandler({ id: dogID});
        navigate('/dogs');
    }
    const handleNo = (e) => {
        navigate('/dogs');
    }
    return (
        <article>
            <h2>Delete {`${dogName}`}?</h2>
            <button onClick={handleYes}> Yes</button>
            <button onClick={handleNo}> No</button>
        </article>
    )
};

export default DogDelete;
