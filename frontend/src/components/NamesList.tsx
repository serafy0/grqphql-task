import { gql, useQuery } from "@apollo/client";
import { graphql } from "graphql";
import { Name } from "../interfaces/Name";
import AddName from "./NamesForm";

import { useState, useEffect } from "react";

const getNamesQuery = gql`
  {
    getNames {
      name
      id
    }
  }
`;

function NamesList() {
  const { loading, error, data } = useQuery(getNamesQuery);

  const [names, setNames] = useState<Name[]>([]);

  useEffect(() => {
    if (data) {
      setNames(data.getNames);
    }
  }, [setNames, data]);

  const updateNames = (newName: Name) => {
    if (names) {
      setNames((previousNames: Name[]) => [
        newName,
        ...(previousNames as Name[]),
      ]);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div>
      <AddName updateNames={updateNames} />

      <ul>
        {names.map((name: Name) => (
          <li key={name.id.toString()}>{name.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default NamesList;
