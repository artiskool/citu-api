import { Link } from 'react-router-dom'

const DogCard = ({ dog }) => {
    return (
        <tr key={dog.id}>
            <td>{dog.id}</td>
            <td>{dog.name}</td>
            <td>
                <a href=""> View </a> | |
                <a href=""> Edit </a> |
                <Link to={`/dogs/delete/${dog.id}`} state={{dog}}> Delete </Link>
            </td>
        </tr>
    )
}

export default DogCard;