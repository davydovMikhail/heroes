<template>
  <div class="pagination">
    <button class="pagination__button" :disabled="!PREVIOUS_PAGE" @click="previous()">
        <svg xmlns="http://www.w3.org/2000/svg" width="45px" height="45px" fill="currentColor" class="bi bi-arrow-left-square-fill" viewBox="0 0 16 16">
            <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1z"/>
        </svg>
    </button>
    <div class="pagination__number">{{CURRENT_PAGE}}</div>
    <button class="pagination__button" :disabled="!NEXT_PAGE" @click="next()">
        <svg xmlns="http://www.w3.org/2000/svg" width="45px" height="45px" fill="currentColor" class="bi bi-arrow-right-square-fill" viewBox="0 0 16 16">
            <path d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v12zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1z"/>
        </svg>
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'



export default {
  name: 'Pagination',
  methods: {
    ...mapActions(['GET_CARDS']),
    next() {
        this.GET_CARDS(`${this.NEXT_PAGE}`)
    },
    previous() {
        this.GET_CARDS(`${this.PREVIOUS_PAGE}`)
    }
  },
    computed: {
        ...mapGetters(['CURRENT_PAGE','PREVIOUS_PAGE','NEXT_PAGE'])
    },
  created() {

  }
}
</script>


<style scoped>

</style>