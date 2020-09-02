<template>
     <div class="columns">
          <div class="column is-3" v-for="movie in movies" :key="movie.id">
               <div class="card">
                    <div class="card-image p-3">
                         <iframe
                              :src="embedable(movie.url)"
                              title="description"
                              style="width : 100%"
                         ></iframe>
                    </div>
                    <div class="card-content">
                         <div class="content has-text-left">
                              <a :href="movie.url" class="card-header-title pl-0">{{ movie.name }}</a>
                              <button class="button is-danger" @click="deleteMovie(movie)">Delete</button>
                         </div>
                    </div>
               </div>
          </div>
     </div>
</template>

<script>
import firebase from "firebase";
import { db } from "../main";
export default {
     props: {
          category: String,
          newestCat: Array,
     },
     data() {
          return {
               movies: [],
          };
     },
     mounted() {
          if (this.$props.category == "Newest") {
               let catArr = this.$props.newestCat;
               catArr.forEach((cat) => {
                    db.collection("categories")
                         .doc(cat.id)
                         .collection("movies")
                         .get()
                         .then((data) => {
                              data.forEach((collection) => {
                                   this.movies.push({
                                        name: collection.data().name,
                                        url: collection.data().url,
                                        id: collection.id,
                                        category: cat.id,
                                   });
                              });
                         });
               });
               console.log(this.movies);
          }
     },
     firestore() {
          return {
               movies: db
                    .collection("categories")
                    .doc(this.$props.category)
                    .collection("movies"),
          };
     },
     methods: {
          embedable(url) {
               let link = "https://www.youtube.com/embed/" + url.split("/")[3];
               return link;
          },
          deleteMovie(movie) {
               if (this.$props.category === "Newest") {
                    db.collection("categories")
                         .doc(movie.category)
                         .collection("movies")
                         .doc(movie.id)
                         .delete();
                    let index;
                    this.movies.forEach((deleteMovie, i) => {
                         if (movie.id === deleteMovie.id) {
                              index = i;
                              return false;
                         }
                    });
                    this.movies.splice(index, 1);
               } else {
                    db.collection("categories")
                         .doc(this.$props.category)
                         .collection("movies")
                         .doc(movie.id)
                         .delete();
               }
          },
     },
};
</script>