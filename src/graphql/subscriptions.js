/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo(
    $description: String
    $id: ID
    $name: String
    $when: String
    $where: String
  ) {
    onCreateTodo(
      description: $description
      id: $id
      name: $name
      when: $when
      where: $where
    ) {
      description
      id
      name
      when
      where
      __typename
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo(
    $description: String
    $id: ID
    $name: String
    $when: String
    $where: String
  ) {
    onDeleteTodo(
      description: $description
      id: $id
      name: $name
      when: $when
      where: $where
    ) {
      description
      id
      name
      when
      where
      __typename
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo(
    $description: String
    $id: ID
    $name: String
    $when: String
    $where: String
  ) {
    onUpdateTodo(
      description: $description
      id: $id
      name: $name
      when: $when
      where: $where
    ) {
      description
      id
      name
      when
      where
      __typename
    }
  }
`;
