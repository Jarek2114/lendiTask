<template>
  <div class="user-list-element">
    <v-avatar size="80">{{ initials }}</v-avatar>
    <h1 class="name">{{ user.firstName }} {{ user.lastName }}</h1>
    <v-btn 
      @click.prevent.stop="onEditUserCLick" 
      color="blue" 
      fab 
      small
    >
      <v-icon dark>
        mdi-pencil
      </v-icon>
    </v-btn>    
    <v-btn 
      @click.prevent.stop="onRemoveUserCLick" 
      color="red"
      fab
      small
    >
      <v-icon dark>
        mdi-delete
      </v-icon>
    </v-btn>
    <user-form v-if="showUserForm" @close="onEditUserCLick" :user="userClon" :edit-mode="true"></user-form>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { User } from '@/models/user';
  import { Action } from 'vuex-class';
  import UserForm from '@/components/UserForm.vue';

  @Component({
    components: { UserForm }
  })
  export default class UserListElement extends Vue {
    @Prop({required: true})
    user: User;

    @Action('removeUser')
    removeUser;

    showUserForm = false;

    onEditUserCLick(): void {
      this.showUserForm = !this.showUserForm;
    }

    onRemoveUserCLick(): void {
      this.removeUser(this.user.id);
    }

    get userClon(): User {
      return { ...this.user };
    }

    get initials(): string {
      const firstLetter = (this.user.firstName && this.user.firstName.charAt(0)) || '';
      const lastLetter = (this.user.lastName && this.user.lastName.charAt(0)) || '';
      return `${firstLetter}${lastLetter}`;
    }
  }
</script>

<style scoped lang="scss">
 @import '@/styles/variables.scss';
  .user-list-element {
    align-items: center;
    cursor: pointer;
    display: flex;

    &:hover {
      background-color: rgba(0,0,0,0.05);
      button.v-btn {
        display: inline-flex;
      }
    }
    .name {
      margin-right: 15px;
      margin-left: 15px;
      flex: 1;
      text-align: left;
    }
    .v-btn {
      display: none;
      &:not(:last-child) {
        margin-right: 10px;
      }
    }
  }
</style>
