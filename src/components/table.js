import { useHistory } from "react-router-dom";

function Table(props) {
  const history = useHistory();

  function handleDelete(uuid) {
    props.deleteProfile(uuid);
  };

  function tableRows() {
    return props.globalDB.map((item, index) => {
      return (
        <tr key={item.uuid}>
          <td>{index + 1}</td>
          <td>{item.name}</td>
          <td>{item.birth_year}</td>
          <td>{item.gender}</td>
          <td>{item.hair_color}</td>

          <td>
            <button onClick={() => history.push("/profiles/" + item.uuid)}>
              Edit
            </button>

            &nbsp;&nbsp;

            <button onClick={() => handleDelete(item.uuid)} className="danger">
              Delete
            </button>
          </td>
        </tr>
      )
    });
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Birth Year</th>
            <th>Gender</th>
            <th>Hair Color</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tableRows()}
        </tbody>
      </table>
    </div>
  );
}

export default Table;