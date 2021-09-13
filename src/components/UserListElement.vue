<template>
  <div class="user-list-element">
    <v-avatar size="80">{{ initials }}</v-avatar>
    <h1 class="name">{{ user.firstName }} {{ user.lastName }}</h1>
    <v-btn @click.prevent.stop="onRemoveUserCLick" fab small>
      <v-icon dark>
        mdi-delete
      </v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { User } from '@/models/user';
  import { Action } from 'vuex-class';

  @Component
  export default class UserListElement extends Vue {
    @Prop({required: true})
    user: User;

    @Action('removeUser')
    removeUser;

    onRemoveUserCLick(): void {
      this.removeUser(this.user.id);
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
    }
  }
  .name {
    margin-right: 15px;
    margin-left: 15px;
    flex: 1;
    text-align: left;
  }
</style>
