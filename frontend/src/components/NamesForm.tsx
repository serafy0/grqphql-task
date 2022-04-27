import { gql, useMutation } from "@apollo/client";
import { graphql } from "graphql";
import { FormEvent } from "react";
import { Name } from "../interfaces/Name";

const addNameQuery = gql`
  mutation ($name: String!) {
    addName(name: $name) {
      name
      id
    }
  }
`;

interface Props {
  updateNames: (newName: Name) => void;
}

function AddName({ updateNames }: Props) {
  const [addName, { data, loading, error }] = useMutation(addNameQuery);
  let input: HTMLInputElement;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const value = input.value.trim();
    if (value === "") {
      return;
    }
    const response = await addName({
      variables: { name: value },
    });
    updateNames(response.data?.addName);
    input.value = "";
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          ref={(node) => {
            if (node) {
              input = node;
            }
          }}
        />

        <button type="submit">Add Name</button>
      </form>
    </div>
  );
}

export default AddName;
