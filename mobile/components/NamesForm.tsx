import { gql, useMutation } from "@apollo/client";
import { graphql } from "graphql";
import { FormEvent } from "react";
import { Name } from "../interfaces/Name";
import { TextInput, TextInputComponent, View, Button } from "react-native";

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
    <View>
      <form>
        <View style={{ display: "flex" }}></View>
        <TextInput
          style={{
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
          }}
          ref={(node) => {
            if (node) {
              input = node;
            }
          }}
          onSubmitEditing={onSubmit}
        />

        <Button type="submit" title="Add Name" onPress={onSubmit} />
      </form>
    </View>
  );
}

export default AddName;
