<template>
     <div>
          <div class="columns">
               <div class="column is-4 is-offset-4">
                    <article class="message is-danger mt-2" v-if="error">
                         <div class="message-body">{{ error }}</div>
                    </article>
                    <div class="card mt-6">
                         Sign In : {{ isAuthenticated }}
                         <div class="card-content">
                              <p class="title is-4 has-text-primary">Sign Up Here!</p>
                              <form @submit.prevent="signUp">
                                   <div class="field">
                                        <label
                                             class="label is-uppercase has-text-left has-text-weight-light"
                                        >Email</label>
                                        <div class="control has-icons-left has-icons-right">
                                             <input
                                                  class="input"
                                                  type="email"
                                                  placeholder="Email input"
                                                  v-model="email"
                                             />
                                        </div>
                                   </div>
                                   <div class="field">
                                        <label
                                             class="label is-uppercase has-text-left has-text-weight-light"
                                        >Password</label>
                                        <div class="control has-icons-left has-icons-right">
                                             <input
                                                  class="input"
                                                  type="password"
                                                  placeholder="Password"
                                                  v-model="password"
                                             />
                                        </div>
                                   </div>
                                   <div class="field is-grouped">
                                        <div class="control">
                                             <button class="button is-primary">Sign Up</button>
                                        </div>
                                   </div>
                              </form>
                         </div>
                    </div>
               </div>
          </div>
     </div>
</template>

<script>
import firebase from "firebase";
export default {
     data() {
          return {
               email: "admin@gmail.com",
               password: "123123",
               isAuthenticated: false,
               error: null,
          };
     },
     created() {
          firebase.auth().onAuthStateChanged((user) => {
               if (user) {
                    this.isAuthenticated = true;
               }
          });
     },
     methods: {
          signUp() {
               firebase
                    .auth()
                    .createUserWithEmailAndPassword(this.email, this.password)
                    .catch((error) => (this.error = error.message));
          },
     },
};
</script>