/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      description
      id
      name
      when
      where
      __typename
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: TableTodoFilterInput
    $limit: Int
    $nextToken: String
    $authUser: String
  ) {
    listTodos(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      authUser: $authUser
    ) {
      items {
        description
        id
        name
        when
        where
        __typename
      }
      nextToken
      __typename
    }
  }
`;
