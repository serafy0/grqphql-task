import { gql, useQuery } from "@apollo/client";
import { graphql } from "graphql";
import { Name } from "../interfaces/Name";

const getNamesQuery = gql`
  {
    getNames {
      name
      id
    }
  }
`;

function NamesList() {
  const { loading, error, data } = useQuery(getNamesQuery, {
    fetchPolicy: "no-cache",
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div>
      <ul>
        {data.getNames.map((name: Name) => (
          <li key={name.id.toString()}>{name.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default NamesList;
