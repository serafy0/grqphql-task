import { gql, useQuery } from "@apollo/client";
import { Name } from "../interfaces/Name";
import AddName from "./NamesForm";

import { useState, useEffect } from "react";

import { ScrollView } from "react-native";

const getNamesQuery = gql`
  query GetNames($lastId: ID, $limit: Int) {
    getNames(lastId: $lastId, limit: $limit) {
      name
      id
    }
  }
`;

function NamesList() {
  const { loading, error, data, fetchMore } = useQuery(getNamesQuery);

  const [names, setNames] = useState<Name[]>([]);
  const [allFetched, setAllFetched] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      setNames(data.getNames);
      if (data.getNames.length < 10) {
        setAllFetched(true);
      }
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
    <ScrollView>
      <AddName updateNames={updateNames} />

      <ul>
        {names.map((name: Name) => (
          <li key={name.id.toString()}>{name.name}</li>
        ))}
      </ul>

      {!allFetched && (
        <button
          onClick={async () => {
            const response = await fetchMore({
              variables: { lastId: names[names.length - 1].id },
            });
            if (response.data.getNames.length === 0) {
              setAllFetched(true);
              return;
            } else if (names.length === 10) {
              setAllFetched(false);
            }
            setNames((prev) => {
              return [...prev, ...response.data.getNames];
            });
          }}
        >
          fetch more
        </button>
      )}
    </ScrollView>
  );
}

export default NamesList;
