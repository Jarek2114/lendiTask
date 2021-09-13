<template>
  <div class="user-details">
    <template v-if="user">
      <v-avatar size="80">{{ initials }}</v-avatar>
      <div class="user-details__container">
        <div class="name-container">
          <h1 class="name">{{ user.firstName }} {{ user.lastName }}</h1>
        </div>
        <v-list>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>
                mdi-email
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle>Email</v-list-item-subtitle>
              <v-list-item-title>{{ user.email }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>          
          <v-list-item>
            <v-list-item-icon>
              <v-icon>
                mdi-phone
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle>Phone</v-list-item-subtitle>
              <v-list-item-title>{{ user.phone }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
                    <v-list-item>
            <v-list-item-icon>
              <v-icon>
                mdi-cake-variant
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle>Birth date</v-list-item-subtitle>
              <v-list-item-title>{{ user.birthDate }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
    </template>
  </div>
</template>


<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { User } from '@/models/user';
  import { Getter } from 'vuex-class';

  @Component
  export default class UserDetails extends Vue {
    @Getter('users')
    users;

    get user(): User {
      const userId = this.$route.params.id;
      return this.users.find(user => user.id === userId) || {};
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
  @import '@/styles/mixins.scss';

  .user-details {
    display: flex;
    flex-wrap: wrap;
    padding: 15px;

    @include afterMobile() {
      padding: 50px 70px;
    }

    @include desktop() {
      align-items: center;
      justify-content: center;
    }

    &__container {
      flex-basis: 100%;
      
      @include afterMobile() {
        padding-left: 30px;
        padding-right: 30px;
      }

      .name-container {
        align-items: center;
        display: flex;
        flex-basis: 100%;
        margin-bottom: 15px;
        margin-top: 15px;
      }
    }
  }
</style>
