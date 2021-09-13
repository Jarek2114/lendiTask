<template>
  <div class="users">
    <v-list flat>
      <v-subheader>Users</v-subheader>
      <p v-if="emptyList">Empty list</p>
      <v-list-item v-else v-for="user in usersList" :key="user.id">
         <v-list-item-content>
           <router-link :to="getDetailsRoute(user.id)">
            <user-list-element :user="user"></user-list-element>
           </router-link>
         </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-btn @click="showAddUserModal">Add user</v-btn>
  </div>
</template>


<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { Action, Getter } from 'vuex-class';
  import UserListElement from '@/components/UserListElement.vue';
  import { User } from '@/models/user';
  import { EnumRoutes } from '@/enums/EnumRoutes';

  @Component({
    components: {
      UserListElement
    },
  })
  export default class Home extends Vue {
    @Getter('users')
    users;  
    
    @Action('createUser')
    createUser;

    getDetailsRoute(id: string): any {
      return { name: EnumRoutes.USER_DETAILS, params: { id } };
    }

    getRandomIndex(): number {
      return Math.floor(Math.random() * 10);
    }

    showAddUserModal(): void {
      this.createUser({
          firstName: `First ${this.getRandomIndex()}`,
          lastName: `Last ${this.getRandomIndex()}`,
          email: 'email@email.com',
          phone: '666999888',
          birthDate: new Date()
      })
    }

    get usersList(): User[] {
      return this.users;
    }   
    
    get emptyList(): boolean {
      return !this.users.length;
    }

  }
</script>