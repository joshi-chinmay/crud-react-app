function Table(props) {
  return (
    <div>
      {props.indexDB.length}

      <table>
        <thead>
          <tr>
            <th>uuid</th>
            <th>Name</th>
            <th>Birth Year</th>
            <th>Gender</th>
            <th>Hair Color</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {props.indexDB.map((item) => {
            return (
              <tr key={item.uuid}>
                <td>{item.uuid}</td>
                <td>{item.name}</td>
                <td>{item.birth_year}</td>
                <td>{item.gender}</td>
                <td>{item.hair_color}</td>
                <td>
                  <button>Edit</button>
                  &nbsp;&nbsp;
                  <button>Delete</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;