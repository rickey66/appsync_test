<template>
  <v-sheet class="mx-auto" width="300">
    <v-form fast-fail @submit.prevent="createTodo">
      <v-text-field v-model="name" label="name"></v-text-field>
      <v-text-field v-model="description" label="description"></v-text-field>
      <v-btn class="mt-2" type="submit" block>登録</v-btn>
    </v-form>
    <v-divider class="my-10"></v-divider>
    <v-form fast-fail @submit.prevent="deleteTodo">
      <v-text-field v-model="id" label="id"></v-text-field>
      <v-btn class="mt-2" type="submit" block>削除</v-btn>
    </v-form>
  </v-sheet>
  <v-divider class="my-10"></v-divider>
  <div class="text-center">
  <v-table density="compact" class="small-table">
    <thead>
    <tr>
      <th class="text-left">
        ID
      </th>
      <th class="text-left">
        Title
      </th>
      <th class="text-left">
        Description
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(item, index) in items" :key="index">
      <td class="text-left">{{ item.id }}</td>
      <td class="text-left">{{ item.name }}</td>
      <td class="text-left">{{ item.description }}</td>
    </tr>
    </tbody>
  </v-table>
  </div>
</template>
<script>
import service from '../services/appsyncService'
export default {
  data() {
    return {
      id: '',
      name: '',
      description: '',
      items: [],
      subscriberOnCrate: null,
      subscriberOnDelete: null
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      // 上手く非同期で初期データを取得できないので遅延させる...
      setTimeout(async () => {
        this.items = await service.list();
        this.subscriberOnCrate = await service.subscribeOnCreate(this.items);
        this.subscriberOnDelete = await service.subscribeOnDelete(this.items);
      }, 1000);
    },
    async createTodo() {
      await service.create(this.name, this.description);
      this.name = '';
      this.description = '';
    },
    async deleteTodo() {
      await service.delete(this.id);
      this.id = '';
    }
  }
}
</script>
<style>
.small-table {
  width: 900px; /* 適切な幅を設定 */
  margin: 0 auto;
}
</style>