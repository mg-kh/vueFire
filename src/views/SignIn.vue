<template>
     <div>
          <div class="columns">
               <div class="column is-4 is-offset-4">
                    <div class="card mt-6">
                         Sign In : {{ isAuthenticated }}
                         <div class="card-content">
                              <p class="title is-4 has-text-primary">Sign In Here!</p>
                              <form>
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
                                             <button
                                                  class="button is-primary mr-3"
                                                  @click.prevent="signIn"
                                             >Sign In</button>
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
          };
     },
     created() {
          firebase.auth().onAuthStateChanged((user) => {
               if (user) {
                    this.isAuthenticated = true;
                    this.$router.push("/dashboard");
               }
          });
     },
     methods: {
          signIn() {
               firebase
                    .auth()
                    .signInWithEmailAndPassword(this.email, this.password)
                    .catch((error) => alert(error.message));
          },
     },
};
</script>