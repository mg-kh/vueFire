<template>
     <div class="about">
          <h1 class="is-size-3">Dashboard</h1>
          <div class="container">
               <div class="tabs">
                    <ul>
                         <li :class="{ 'is-active' :  activeCategory==='Newest'}">
                              <a @click="setCategory('Newest')">Newest</a>
                         </li>
                         <li
                              v-for="(tab) in categories"
                              :key="tab.id"
                              :class="{ 'is-active' :  activeCategory=== tab.title}"
                         >
                              <a @click="setCategory(tab.title)">{{ tab.title }}</a>
                         </li>
                    </ul>
               </div>
               <card-comp
                    :newestCat="categories"
                    category="Newest"
                    v-if="activeCategory === 'Newest'"
               ></card-comp>
               <card-comp
                    v-for="category in categories"
                    :key="category.id"
                    :category="category.id"
                    v-if="activeCategory === category.title"
               ></card-comp>
          </div>
     </div>
</template>

<script>
import { db } from "../main";
import CardComp from "../components/movieCard";
export default {
     name: "dashboard",
     components: {
          CardComp,
     },
     data() {
          return {
               categories: [],
               activeCategory: "Newest",
          };
     },
     firestore() {
          return {
               categories: db.collection("categories"),
          };
     },
     methods: {
          setCategory(categoryTitle) {
               this.activeCategory = categoryTitle;
          },
     },
};
</script>
