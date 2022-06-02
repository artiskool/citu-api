import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
const Cats = () => {
    const [cats, setCats] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    const getCats = async (url, options) => {
        try {
            const response = await axiosPrivate.get(url, options);
            console.log(response.data);
            setCats(response.data);
        } catch (err) {
            console.error(err);
            navigate('/login', { state: { from: location }, replace: true });
        }
    }
    useEffect(() => {
        const controller = new AbortController();
        getCats('/cats/?limit=3&offset=0', {
            signal: controller.signal
        });
        return () => {
            controller.abort();
        }
    }, []);

    const paginationHandler = (e) => {
        e.preventDefault();
        const name = e.target.getAttribute('data-name');
        if (name in cats?.metadata?.links) {
            const url = cats.metadata.links[name];
            getCats(url);
        }
    }
    return (
        <article>
            <h2>Cats List</h2>
            {cats?.data?.length
                ? (
                    <>
                    <table border="2" cellPadding={5} cellSpacing={5}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                    {
                        cats.data.map((cat, i) =>
                            <tr key={cat.id}>
                                <td>{cat.id}</td>
                                <td>{cat.name}</td>
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
                    {cats?.metadata?.links?.previous ? 
                        <a
                            href="#"
                            data-name="previous"
                            onClick={paginationHandler}
                        > &lsaquo;Previous </a>
                        : ''
                    }
                    {cats?.metadata?.links?.next ? 
                        <a
                            href="#"
                            data-name="next"
                            onClick={paginationHandler}
                        > Next&rsaquo; </a>
                        : ''
                    }
                    </>
                ) : <p>No cats to display</p>
            }
        </article>
    );
};

export default Cats;