import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const Dogs = () => {
    const [dogs, setDogs] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    let url = '/dogs/?limit=10&offset=0';

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getDogs = async () => {
            try {
                const response = await axiosPrivate.get(url, {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setDogs(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }
        getDogs();
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);

    const paginationHandler = (e) => {
        e.preventDefault();
        const name = e.target.getAttribute('data-name');
        alert('clicked: ' + name);
        if (name in dogs?.metadata?.links) {
            url = dogs.metadata.links[name];
            alert(url);
            //getDogs();
        }
    }
    return (
        <article>
            <h2>Dogs List</h2>
            {dogs?.data?.length
                ? (
                    <>
                    <ul>
                    {
                        dogs.data.map((dog, i) =>
                            <li key={dog?.id}>
                                {dog?.name}
                                <a href=""> View </a> |
                                <a href=""> Edit </a> |
                                <a href=""> Delete </a>
                            </li>
                        )
                    }
                    </ul>
                    {dogs?.metadata?.links?.start ? 
                        <a
                            href="#"
                            data-name="start"
                            onClick={paginationHandler}
                        > &laquo;Start </a>
                        : ''
                    }
                    {dogs?.metadata?.links?.prev ? 
                        <a
                            href="#"
                            data-name="prev"
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
                    {dogs?.metadata?.links?.last ? 
                        <a
                            href="#"
                            data-name="last"
                            onClick={paginationHandler}
                        > Last&raquo; </a>
                        : ''
                    }
                    </>
                ) : <p>No dogs to display</p>
            }
        </article>
    );
};

export default Dogs;
