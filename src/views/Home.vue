<template>
  <div class="container">
    <Search/> 
    Пол:
    <select v-model="gender">
      <option value="all">Все</option>
      <option value="male">Мужской</option>
      <option value="female">Женский</option>
      <option value="unknown">Неопределенный</option>
    </select>
    <div class="container__cards">
      <h1 v-if="ALL_CARDS.length == 0">Загрузка карточек...</h1>
      <h1 v-else-if="filteredCards.length == 0">Здесь ничего нет...<br/>Измените параметры фильтрации</h1>
      <Card :hero="hero" v-for="hero in filteredCards" :key="hero.url" />
    </div>
    <Pagination />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Card from '@/components/Card.vue'
import Pagination from '@/components/Pagination.vue'
import Search from '@/components/Search.vue'


export default {
  name: 'Home',
  data() {
    return {
      gender: "all"
    }
  },
  components: {
    Card,
    Pagination,
    Search
  },
  methods: {
    ...mapActions(['GET_CARDS']),
  },
  computed: {
    ...mapGetters(['ALL_CARDS','CURRENT_PAGE']),
    filteredCards()  {    
            switch (this.gender) {
                case "all":
                    return this.ALL_CARDS
                case "male":
                    return this.ALL_CARDS.filter(e => e.gender == "male")
                case "female":
                    return this.ALL_CARDS.filter(e => e.gender == "female")
                default:
                    return this.ALL_CARDS.filter(e => e.gender != "male").filter(e => e.gender != "female")
            }
        },
  },
  created() {
    this.GET_CARDS(`https://swapi.dev/api/people?page=${this.CURRENT_PAGE}`)
  }
}
</script>
