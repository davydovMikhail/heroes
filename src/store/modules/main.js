import axios from 'axios'

const actions = {
    async GET_CARDS({commit}, link) {
        try {
            let response = await axios.get(`${link}`, {
            headers: {
                // "Access-Control-Allow-Origin": "*",
                // "Access-Control-Allow-Methods": "GET",
                // "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
                }
            })
            const t = link.split('=')
            if(t[2]) {
                if(typeof Number(t[2]) == "number") {
                    t[1] = t[2]
                }   
            }
            commit('SET_CURRENT_PAGE', t[1])
            commit('SET_MAIN_ARRAY', response.data.results)
            const obj = {
                next: response.data.next,
                previous: response.data.previous
            }
            commit('SET_PAGE_LINKS', obj)
        } catch (e) {
            console.log(e)
        }
    },
    GET_FAVORIT_CARDS({dispatch}) {
        let favoritHeroes
        if(localStorage.getItem("names") === null ) {
            favoritHeroes = []
        } else {
            favoritHeroes = JSON.parse(localStorage.getItem("names"));
        }

        favoritHeroes.forEach(function(l) {
            dispatch('GET_ONE_CARDS', l)
        }
        )
    },
    async GET_ONE_CARDS({commit}, link) {
        try {
            let response = await axios.get(`${link}`, {
            headers: {
                // "Access-Control-Allow-Origin": "*",
                // "Access-Control-Allow-Methods": "GET",
                // "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
                }
            })
            commit('PUSH_CARD', response.data)
        } catch (e) {
            console.log(e)
        }  
    }
}
const mutations = {
    SET_MAIN_ARRAY: (state, arr) => state.all_cards = arr,
    SET_PAGE_LINKS: (state, links) => {
        state.next_page = links.next,
        state.previous_page = links.previous
    },
    SET_CURRENT_PAGE: (state, page) => state.current_page = page,
    PUSH_CARD: (state, card) => state.favorit_cards.push(card),
    CLEAR_FAVORIT_CARDS: (state) => state.favorit_cards = [],
    DELETE_CARD_FROM_FAVORIT: (state, link) => {
        state.favorit_cards = state.favorit_cards.filter(e => e.url !== link)
    }
}
const state = {
    favorit_cards: [],
    all_cards: [],
    current_page: 1,
    next_page: null,
    previous_page: null
}
const getters = {
    ALL_CARDS: state => state.all_cards,
    FAVORIT_CARDS: state => state.favorit_cards,
    CURRENT_PAGE: state => state.current_page,
    NEXT_PAGE: state => state.next_page,
    PREVIOUS_PAGE: state => state.previous_page,
}

export default {
    state,
    getters,
    actions,
    mutations
}