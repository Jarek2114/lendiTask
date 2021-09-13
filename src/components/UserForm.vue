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
                <v-form v-model="valid">
                    <v-container>
                        <v-row>
                            <v-col
                                cols="12"
                                sm="6"
                            >
                                <v-text-field
                                    v-model="user.firstName"
                                    @input="removeServerError('FirstName')"
                                    :rules="[ ...firstnameRules, hasServerErrors('FirstName') ]"
                                    :error-messages="getServerErrors('FirstName')"
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
                                    @input="removeServerError('LastName')"
                                    :rules="[ ...lastnameRules, hasServerErrors('LastName') ]"
                                    :error-messages="getServerErrors('LastName')"
                                    label="Last name*"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    v-model="user.email"
                                    :rules="emailRules"
                                    label="Email*"
                                    type="email"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12"
                                sm="6">
                                <v-text-field
                                    v-model="user.phone"
                                    :rules="phoneRules"
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
                </v-form>
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
                    :disabled="!valid"
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
  import { Action, Getter } from 'vuex-class';
  import { ServerError } from '@/models/serverError';

  @Component
  export default class UserForm extends Vue {    
    @Prop({default: () => new User()})
    user: User;    
    
    @Prop({default: false})
    editMode: boolean;

    @Action('updateUser')
    updateUser;

    @Action('createUser')
    createUser;

    @Getter('serverErrors')
    serverErrors;

    show = true;
    valid = false;
    firstnameRules = [
        v => !!v || 'First name is required',
        v => v && v.length >= 3 || 'First name must be at least 3 characters'
    ];    
    
    lastnameRules = [
        v => !!v || 'Last name is required',
        v => v && v.length >= 3 || 'Last name must be at least 3 characters'
    ];

    emailRules = [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ];

    phoneRules = [
        v => !!v || 'Phone is required',
        v => v && v.length >= 9 || 'Phone must be valid'
    ];

    onSave(): void {
        if (this.editMode) {
            this.updateUser({ id: this.user.id, user: this.user }).then(() => {
                if(this.valid) {
                    this.closeDialog();
                }
            });
        } else {
            this.createUser(this.user);
        }
    }

    hasServerErrors(fieldName: string): boolean {
        return !this.serverErrors.find((serverError: ServerError) => serverError.field === fieldName);
    }

    getServerErrors(fieldName: string): string {
        let error: ServerError = this.serverErrors.find((serverError: ServerError) => serverError.field === fieldName);
        return (error && error.message) || '';
    }

    removeServerError(fieldName: string): void {
        const index = this.serverErrors.findIndex((serverError: ServerError) => serverError.field === fieldName);
        if (index !== -1) {
            this.serverErrors.splice(index, 1);
        }
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
        .v-form {
            .error--text {
                /deep/ .v-messages__message {
                    color: red;
                }
            }
        }
    }
</style>