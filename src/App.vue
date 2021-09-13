<template>
  <div id="app" data-app>
    <router-view/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { Action } from 'vuex-class';

  @Component({
    components: {}
  })
  export default class App extends Vue {
    @Action('login')
    login;

    created(): void {
      this.login();
    }
  }
</script>

<style lang="scss">
  @import '@/styles/variables.scss';
  @import '@/styles/mixins.scss';

  #app {
    font-family: Roboto Condensed, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: $font-color;

    h1 {
      @include h1();
    }    
    
    h2, .v-avatar {
      @include h2();
    }

    a {
      text-decoration: none;
      color: $font-color;
    }
    .v-avatar {
      background-color: $background;
    }
  }
</style>
