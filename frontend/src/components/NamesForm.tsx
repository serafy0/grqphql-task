import { gql, useMutation } from "@apollo/client";
import { graphql } from "graphql";
import { Name } from "../interfaces/Name";

const addNameQuery = gql`
  mutation ($name: String!) {
    addName(name: $name) {
      name
      id
    }
  }
`;

function AddName() {
  const [addName, { data, loading, error }] = useMutation(addNameQuery);
  let input: HTMLInputElement;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          addName({ variables: { name: input.value } });

          input.value = "";
        }}
      >
        <input
          ref={(node) => {
            if (node) {
              input = node;
              console.log(input);
            }
          }}
        />

        <button type="submit">Add Name</button>
      </form>
    </div>
  );
}

export default AddName;
