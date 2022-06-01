import { Link } from "react-router-dom"

const DogCard = ({dog}) => {
    return (
        <tr key={dog.id}>
            <td>{dog.id}</td>
            <td>{dog.name}</td>
            <td>
                <Link to={`/dogs/view/${dog.id}`} state={{dog}}> View </Link> |
                <Link to={`/dogs/edit/${dog.id}`} state={{dog}}> Edit </Link> |
                <Link to={`/dogs/delete/${dog.id}`} state={{dog}}> Delete </Link>
            </td>
        </tr>
    );
}

export default DogCard;