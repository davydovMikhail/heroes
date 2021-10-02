<template>
  <div class="card">
    <img :src='link_photo' >
    <div class="card__footer">
      <div class="card__info">
        <div class="card__name">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-person" viewBox="0 0 16 16">
            <path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
            <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2v9.255S12 12 8 12s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h5.5v2z"/>
          </svg>{{hero.name}}
        </div>
        <div class="card__planet">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
            <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
          </svg>{{planet}}
        </div>
      </div>
      <button type="button" class="card__like" @click="like()" >
        <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="currentColor" class="bi bi-suit-heart-fill" viewBox="0 0 16 16">
          <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/>
        </svg>
      </button>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'


export default {
  name: 'Card',
  data() {
    return {
      link_photo: '',
      planet: 'Идет загрузка...'
    }
  },
  props: {
    hero: Object,
  },
  methods: {
    ...mapMutations(['DELETE_CARD_FROM_FAVORIT']),
    like() {
      let favoritHeroes
      if(localStorage.getItem("names") === null ) {
        favoritHeroes = []
      } else {
        favoritHeroes = JSON.parse(localStorage.getItem("names"));
      }
      let result
      if(this.$route.path == "/favorit") {
        result = favoritHeroes
        const index = result.indexOf(this.hero.url);
        result.splice(index, 1);
        
        this.DELETE_CARD_FROM_FAVORIT(this.hero.url)
      } else {
        favoritHeroes.push(this.hero.url)
        result = favoritHeroes.reduce((x, y) => x.includes(y) ? x : [...x, y], []);
        this.$vToastify.success(`Теперь ${this.hero.name} в любимых героях`, 'Герой добавлен')
      }
      localStorage.setItem("names", JSON.stringify(result));
    },
    async getPlanet() {
        try {
            let response = await axios.get(`${this.hero.homeworld}`, {
            headers: {
                // "Access-Control-Allow-Origin": "*",
                // "Access-Control-Allow-Methods": "GET",
                // "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
                }
            })
            this.planet = response.data.name
        } catch (e) {
            console.log(e)
        }
    }
  },
  created() {
    let t = this.hero.url.split("/")
    this.link_photo = 'https://starwars-visualguide.com/assets/img/characters/' + t[5] + '.jpg'
    this.getPlanet()
  }
}
</script>


<style scoped>

</style>
