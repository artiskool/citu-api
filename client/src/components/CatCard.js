import { Link } from "react-router-dom"

const CatCard = ({cat}) => {
    return (
        <tr key={cat.id}>
            <td>{cat.id}</td>
            <td>{cat.name}</td>
            <td>
                <Link to={`/cats/view/${cat.id}`} state={{cat}}> View </Link> |
                <Link to={`/cats/edit/${cat.id}`} state={{cat}}> Edit </Link> |
                <Link to={`/cats/delete/${cat.id}`} state={{cat}}> Delete </Link>
            </td>
        </tr>
    );
}

export default CatCard;