import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const Dogs = () => {
    const [dogs, setDogs] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    const getDogs = async (url, options) => {
        try {
            const response = await axiosPrivate.get(url, options);
            console.log(response.data);
            setDogs(response.data);
        } catch (err) {
            console.error(err);
            navigate('/login', { state: { from: location }, replace: true });
        }
    }
    useEffect(() => {
        const controller = new AbortController();
        getDogs('/dogs/?limit=3&offset=0', {
            signal: controller.signal
        });
        return () => {
            controller.abort();
        }
    }, []);

    const paginationHandler = (e) => {
        e.preventDefault();
        const name = e.target.getAttribute('data-name');
        if (name in dogs?.metadata?.links) {
            const url = dogs.metadata.links[name];
            getDogs(url);
        }
    }
    return (
        <article>
            <h2>Dogs List</h2>
            {dogs?.data?.length
                ? (
                    <>
                    <table border="1" cellpading="5" cellspacing="5">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                    {
                        dogs.data.map((dog, i) =>
                            <tr key={dog.id}>
                                <td>{dog.id}</td>
                                <td>{dog.name}</td>
                                <td>
                                    <a href=""> View </a> |
                                    <a href=""> Edit </a> |
                                    <a href=""> Delete </a>
                                </td>
                            </tr>
                        )
                    }
                        </tbody>
                    </table>
                    {dogs?.metadata?.links?.previous ? 
                        <a
                            href="#"
                            data-name="previous"
                            onClick={paginationHandler}
                        > &lsaquo;Previous </a>
                        : ''
                    }
                    {dogs?.metadata?.links?.next ? 
                        <a
                            href="#"
                            data-name="next"
                            onClick={paginationHandler}
                        > Next&rsaquo; </a>
                        : ''
                    }
                    </>
                ) : <p>No dogs to display</p>
            }
        </article>
    );
};

export default Dogs;
