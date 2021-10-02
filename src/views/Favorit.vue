<template>
  <div class="container">
    <form class="search">
      <input class="search__input" type="text" placeholder="Живой поиск" v-model="search" >
    </form>
    Пол:
    <select v-model="gender">
      <option value="all">Все</option>
      <option value="male">Мужской</option>
      <option value="female">Женский</option>
      <option value="unknown">Неопределенный</option>
    </select>
    <div class="container__cards">
      <h1 v-if="FAVORIT_CARDS.length == 0">Здесь пока ничего нет...</h1>
      <h1 v-else-if="cards.length == 0">Здесь ничего нет...<br/>Измените параметры фильтрации или поиска</h1>
      <Card :hero="hero" v-for="hero in cards" :key="hero.url" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Card from '@/components/Card.vue'


export default {
  name: 'Home',
  data() {
    return {
      gender: "all",
      search: ''
    }
  },
  components: {
    Card,
  },
  methods: {
    ...mapActions(['GET_CARDS','GET_FAVORIT_CARDS']),
    ...mapMutations(['CLEAR_FAVORIT_CARDS']),
  },
  computed: {
    ...mapGetters(['FAVORIT_CARDS']),
    cards() {
            return this.filteredCards.filter(appl => {
                return appl.name.toLowerCase().includes(this.search.toLowerCase())
            })
        },
    filteredCards()  {    
            switch (this.gender) {
                case "all":
                    return this.FAVORIT_CARDS
                case "male":
                    return this.FAVORIT_CARDS.filter(e => e.gender == "male")
                case "female":
                    return this.FAVORIT_CARDS.filter(e => e.gender == "female")
                default:
                    return this.FAVORIT_CARDS.filter(e => e.gender != "male").filter(e => e.gender != "female")
            }
    },
  },
  async created() {
    await this.CLEAR_FAVORIT_CARDS()
    this.GET_FAVORIT_CARDS()
  }
}
</script>

<style scoped>
.search__input {
  border-right: 3px solid black;
}
</style>