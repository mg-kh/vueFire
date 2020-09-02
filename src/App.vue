<template>
     <div id="app">
          <nav class="navbar has-shadow px-6 mb-5" role="navigation" aria-label="main navigation">
               <div class="navbar-brand">
                    <router-link to="/" class="navbar-item h1">VueTube</router-link>

                    <a
                         role="button"
                         class="navbar-burger burger"
                         aria-label="menu"
                         aria-expanded="false"
                         data-target="navbarBasicExample"
                    >
                         <span aria-hidden="true"></span>
                         <span aria-hidden="true"></span>
                         <span aria-hidden="true"></span>
                    </a>
               </div>

               <div id="navbarBasicExample" class="navbar-menu">
                    <div class="navbar-start">
                         <router-link to="/" class="navbar-item">Home</router-link>

                         <router-link to="/dashboard" class="navbar-item">Dashboard</router-link>
                    </div>

                    <div class="navbar-end">
                         <div class="navbar-item">
                              <div class="buttons">
                                   <button
                                        class="button is-danger"
                                        v-if="isAuthenticated"
                                        @click="signOut"
                                   >Logout</button>
                                   <button
                                        class="button is-primary"
                                        v-if="isAuthenticated"
                                        @click="categoryForm = !categoryForm"
                                   >Add Category</button>
                                   <button
                                        class="button is-primary"
                                        v-if="isAuthenticated"
                                        @click="movieForm = !movieForm"
                                   >Add Movie</button>
                                   <router-link
                                        to="/signin"
                                        class="button is-primary"
                                        v-if="!isAuthenticated"
                                   >SignIn</router-link>
                                   <router-link
                                        to="/signup"
                                        class="button is-light"
                                        v-if="!isAuthenticated"
                                   >SignUp</router-link>
                              </div>
                         </div>
                    </div>
               </div>
          </nav>
          <div class="modal" :class="{'is-active' : categoryForm }">
               <div class="modal-background"></div>
               <div class="modal-content">
                    <div class="box has-background-white">
                         <div class="card-content">
                              <p class="title is-4 has-text-primary">Add Category Here!</p>
                              <form @submit.prevent="addCategory">
                                   <div class="field">
                                        <label
                                             class="label is-uppercase has-text-left has-text-weight-light"
                                        >Category</label>
                                        <div class="control has-icons-left has-icons-right">
                                             <input
                                                  class="input pl-2"
                                                  type="text"
                                                  placeholder="Category Here"
                                                  v-model="category"
                                             />
                                        </div>
                                   </div>
                                   <div class="field is-grouped">
                                        <div class="control">
                                             <button class="button is-primary mr-3">Add Category</button>
                                        </div>
                                   </div>
                              </form>
                         </div>
                    </div>
               </div>
               <button
                    class="modal-close is-large"
                    @click="categoryForm = !categoryForm"
                    aria-label="close"
               ></button>
          </div>
          <div class="modal" :class="{'is-active' : movieForm }">
               <div class="modal-background"></div>
               <div class="modal-content">
                    <div class="box has-background-white">
                         <div class="card-content">
                              <p class="title is-4 has-text-primary">Add Movies Here!</p>
                              <form @submit.prevent="addMovie">
                                   <div class="field">
                                        <label
                                             class="label is-uppercase has-text-left has-text-weight-light"
                                        >Category</label>
                                        <div class="control">
                                             <div class="select" style="width:100%">
                                                  <select
                                                       style="width:100%"
                                                       v-model="chooseCategory"
                                                  >
                                                       <option
                                                            value="empty"
                                                            selected
                                                       >Choose Category</option>
                                                       <option
                                                            :value="category.id"
                                                            v-for="(category, i) in categories"
                                                            :key="i"
                                                       >{{ category.title }}</option>
                                                  </select>
                                             </div>
                                        </div>
                                   </div>

                                   <div class="field">
                                        <label
                                             class="label is-uppercase has-text-left has-text-weight-light"
                                        >Name</label>
                                        <div class="control has-icons-left has-icons-right">
                                             <input
                                                  class="input pl-2"
                                                  type="text"
                                                  placeholder="Category Here"
                                                  v-model="movieName"
                                             />
                                        </div>
                                   </div>

                                   <div class="field">
                                        <label
                                             class="label is-uppercase has-text-left has-text-weight-light"
                                        >Url</label>
                                        <div class="control has-icons-left has-icons-right">
                                             <input
                                                  class="input pl-2"
                                                  type="text"
                                                  placeholder="Category Here"
                                                  v-model="movieUrl"
                                             />
                                        </div>
                                   </div>

                                   <div class="field is-grouped">
                                        <div class="control">
                                             <button class="button is-primary mr-3">Add Movie</button>
                                        </div>
                                   </div>
                              </form>
                         </div>
                    </div>
               </div>
               <button
                    class="modal-close is-large"
                    @click="movieForm = !movieForm"
                    aria-label="close"
               ></button>
          </div>
          <router-view />
     </div>
</template>

<script>
import firebase from "firebase";
import { db } from "./main";
export default {
     data() {
          return {
               isAuthenticated: false,
               categoryForm: false,
               movieForm: false,
               category: "",
               chooseCategory: "empty",
               movieName: "",
               movieUrl: "",
               categories: [],
          };
     },
     created() {
          firebase.auth().onAuthStateChanged((user) => {
               if (user) {
                    this.isAuthenticated = true;
               }
          });
     },
     firestore() {
          return {
               categories: db.collection("categories"),
          };
     },
     methods: {
          signOut() {
               firebase
                    .auth()
                    .signOut()
                    .then(() => {
                         this.isAuthenticated = false;
                         this.$router.push("/signin");
                    });
          },
          addCategory() {
               let category = {
                    title: this.category,
               };
               db.collection("categories").add(category);
               this.addCategory = "";
               this.categoryForm = false;
          },
          addMovie() {
               let name = this.movieName;
               let url = this.movieUrl;
               let chooseCat = this.chooseCategory;
               if (name && url && chooseCat !== "empty") {
                    let movie = {
                         name,
                         url,
                    };
                    db.collection("categories")
                         .doc(chooseCat)
                         .collection("movies")
                         .add(movie);
                    this.chooseCategory = "empty";
                    this.movieName = "";
                    this.movieUrl = "";
                    this.movieForm = false;
               } else {
                    alert("Fill All Field");
               }
          },
     },
};
</script>

<style>
@import url("../node_modules/bulma/css/bulma.min.css");
#app {
     font-family: Avenir, Helvetica, Arial, sans-serif;
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
     text-align: center;
     color: #2c3e50;
}

#nav {
     padding: 30px;
}

#nav a {
     font-weight: bold;
     color: #2c3e50;
}

#nav a.router-link-exact-active {
     color: #42b983;
}
</style>
