<<<<<<< HEAD
import { Link } from 'react-router-dom'

const DogCard = ({ dog }) => {
=======
import { Link } from 'react-router-dom';

const DogCard = ({dog}) => {
>>>>>>> e62d4a40cb3553b0d6e17fd2c5ad1f90d9e9d708
    return (
        <tr key={dog.id}>
            <td>{dog.id}</td>
            <td>{dog.name}</td>
            <td>
<<<<<<< HEAD
                <a href=""> View </a> | |
                <a href=""> Edit </a> |
                <Link to={`/dogs/delete/${dog.id}`} state={{dog}}> Delete </Link>
            </td>
        </tr>
    )
=======
                <Link to={`/dogs/view/${dog.id}`} state={{dog}}> View </Link> |
                <Link to={`/dogs/edit/${dog.id}`} state={{dog}}> Edit </Link> |
                <a href=""> Delete </a>
            </td>
        </tr>
    );
>>>>>>> e62d4a40cb3553b0d6e17fd2c5ad1f90d9e9d708
}

export default DogCard;