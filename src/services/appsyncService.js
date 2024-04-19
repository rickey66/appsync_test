import { generateClient } from 'aws-amplify/api';
import { listTodos } from '@/graphql/queries';
import { createTodo, deleteTodo } from '@/graphql/mutations';
import { onCreateTodo, onDeleteTodo } from '@/graphql/subscriptions';

const client = generateClient();

export default {
    async list () {
        //const filter = {name: { eq: "ゲーム" },}
        const result = await client.graphql({
            query: listTodos,
            variables: {
                //filter: filter,
                authUser: "ryuichi_nk"
            }
        });
        return result.data.listTodos.items
    },
    async create(name, description) {
        const todo = { name: name, description: description };
        return client.graphql({
            query: createTodo,
            variables: {
                input: todo
            }
        });
    },
    async delete(id) {
        const todo = { id: id };
        return client.graphql({
            query: deleteTodo,
            variables: {
                input: todo
            }
        });
    },
    async subscribeOnCreate(items) {
        return client
            .graphql({ query: onCreateTodo })
            .subscribe({
                next: (result) => items.push(result.data.onCreateTodo),
                error: (error) => console.warn(error)
            });
    },
    async subscribeOnDelete(items) {
        return client
            .graphql({ query: onDeleteTodo })
            .subscribe({
                next: (result) => {
                    const deletedTodo = result.data.onDeleteTodo;
                    const targetIndex = items.findIndex(item => item.id === deletedTodo.id);
                    items.splice(targetIndex, 1);
                },
                error: (error) => console.warn(error)
            });
    }
}