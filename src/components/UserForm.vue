<template>
    <v-dialog v-model="show" content-class="user-form" persistent max-width="600">
        <v-card id="action-dialog">
            <v-toolbar dark color="primary">
                <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
                <v-btn @click="closeDialog" icon dark>
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col
                            cols="12"
                            sm="6"
                        >
                            <v-text-field
                                v-model="user.firstName"
                                label="First name*"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                        >
                            <v-text-field
                                v-model="user.lastName"
                                label="Last name*"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                v-model="user.email"
                                label="Email*"
                                type="email"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12"
                            sm="6">
                            <v-text-field
                                v-model="user.phone"
                                label="Phone*"
                                required
                            ></v-text-field>
                        </v-col>                       
                        <v-col cols="12"
                            sm="6">
                            <v-text-field
                                v-model="user.birthDate"
                                label="Birth date*"
                                type="date"
                                required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    text
                    @click="closeDialog"
                >
                    Cancel
                </v-btn>
                <v-btn
                    color="blue"
                    text
                    @click="onSave"
                >
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { User } from '@/models/user';
  import { Action } from 'vuex-class';

  @Component
  export default class UserForm extends Vue {    
    @Prop({default: () => new User()})
    user: User;    
    
    @Prop({default: false})
    editMode: boolean;

    @Action('editUser')
    editUser;

    @Action('createUser')
    createUser;

    show = true;

    onSave(): void {
        console.log(this.user, this.editMode);
    }

    closeDialog(): void {
        this.show = !this.show;
        this.$emit('close');
    }

    get formTitle(): string {
        return this.editMode ? 'User edit' : 'User create';
    }
  }
</script>

<style scoped lang="scss">
    .user-form {
        .v-toolbar {
            .v-btn {
                margin-left: auto;
            }
        }
    }
</style>