import { Link } from 'react-router-dom';
import DogCard from "./DogCard";

const Dogs = ({dogs, getDogs}) => {
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
            <h2>Dogs List (<Link to="/dogs/create">Create</Link>)</h2>
            {dogs?.data?.length
                ? (
                    <>
                    <table border="1" cellpading="5" cellSpacing="5">
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
                            <DogCard dog={dog} />
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
