import * as cdk from 'aws-cdk-lib';
import * as appsync from 'aws-cdk-lib/aws-appsync';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // スキーマ生成
    const api = new appsync.GraphqlApi(this, 'todo-apis', {
      name: 'todo-apis',
      definition: appsync.Definition.fromFile('schema/schema.graphql'),
    });

    // データソース生成
    const todoTable = new dynamodb.Table(this, 'todo-apis-table', {
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING,
      },
    });

    // listTodosのリゾルバ関数を生成
    const funcListTodos = new appsync.AppsyncFunction(this, 'func-list-todos', {
      name: 'func_list_todos',
      api,
      dataSource: api.addDynamoDbDataSource('table-for-list-todos', todoTable),
      code: appsync.Code.fromAsset('resolver/listTodos.js'),
      runtime: appsync.FunctionRuntime.JS_1_0_0,
    });

    // createTodoのリゾルバ関数を生成
    const funcCreateTodo = new appsync.AppsyncFunction(this, 'func-create-todo', {
      name: 'func_create_todo',
      api,
      dataSource: api.addDynamoDbDataSource('table-for-create-todo', todoTable),
      code: appsync.Code.fromAsset('resolver/createTodo.js'),
      runtime: appsync.FunctionRuntime.JS_1_0_0,
    });

    // deleteTodoのリゾルバ関数を生成
    const funcDeleteTodo = new appsync.AppsyncFunction(this, 'func-delete-todo', {
      name: 'func_delete_todo',
      api,
      dataSource: api.addDynamoDbDataSource('table-for-delete-todo', todoTable),
      code: appsync.Code.fromAsset('resolver/deleteTodo.js'),
      runtime: appsync.FunctionRuntime.JS_1_0_0,
    });

    // listTodosのリゾルバ生成
    new appsync.Resolver(this, 'pipeline-resolver-list-todos', {
      api,
      typeName: 'Query',
      fieldName: 'listTodos',
      code: appsync.Code.fromInline(`
          export function request(ctx) {
          return {};
          }

          export function response(ctx) {
          return ctx.prev.result;
          }
      `),
      runtime: appsync.FunctionRuntime.JS_1_0_0,
      pipelineConfig: [funcListTodos],
    });

    // createTodoのリゾルバ生成
    new appsync.Resolver(this, 'pipeline-resolver-create-todo', {
      api,
      typeName: 'Mutation',
      fieldName: 'createTodo',
      code: appsync.Code.fromInline(`
          export function request(ctx) {
          return {};
          }

          export function response(ctx) {
          return ctx.prev.result;
          }
      `),
      runtime: appsync.FunctionRuntime.JS_1_0_0,
      pipelineConfig: [funcCreateTodo],
    });

    // deleteTodoのリゾルバ生成
    new appsync.Resolver(this, 'pipeline-resolver-delete-todo', {
      api,
      typeName: 'Mutation',
      fieldName: 'deleteTodo',
      code: appsync.Code.fromInline(`
          export function request(ctx) {
          return {};
          }

          export function response(ctx) {
          return ctx.prev.result;
          }
      `),
      runtime: appsync.FunctionRuntime.JS_1_0_0,
      pipelineConfig: [funcDeleteTodo],
    });

    // Prints out URL
    new cdk.CfnOutput(this, "GraphQLAPIURL", {
      value: api.graphqlUrl
    });

    // Prints out the AppSync GraphQL API key to the terminal
    new cdk.CfnOutput(this, "GraphQLAPIKey", {
      value: api.apiKey || ''
    });

    // Prints out the stack region to the terminal
    new cdk.CfnOutput(this, "Stack Region", {
      value: this.region
    });
  }
}
