import axios from 'axios';
import { createStore } from 'vuex'
import sharedMutations from 'vuex-shared-mutations';


export default createStore({
    state() {
        return {
            user: null,
            reclamations: {},
            reclamation: {}
        }
    },
    getters: {
        user(state) {
            return state.user;
        },
        verified(state) {
            if (state.user) return state.user.email_verified_at
            return null
        },
        id(state) {
            if (state.user) return state.user.id
            return null
        },
        reclamations(state){
            return state.reclamations
        },
        reclamation(state){
            return state.reclamation
        }
    },
    mutations: {

        setUser(state, payload) {
            state.user = payload;
        },
        SET_RECLAMATIONS(state, payload){
            state.reclamations = payload
        },
        SET_RECLAMATION(state, payload){
            state.reclamation = payload
        },
        ADD_RECLAMATION(state, reclamation){
            state.reclamations.data.unshift(reclamation)
        }

    },

    actions: {

        async login({ dispatch }, payload) {
            try {
                await axios.get('/sanctum/csrf-cookie');

                await axios.post('/api/login', payload).then((res) => {
                    return dispatch('getUser');
                }).catch((err) => {
                    throw err.response
                });
            } catch (e) {
                throw e
            }
    
        },

        async register({ dispatch }, payload) {
            try {

                await axios.post('/api/register' , payload).then((res) => {
                    return dispatch('login' , { 'email' : payload.email , 'password' : payload.password})
                }).catch((err) => {
                    throw(err.response)
                })
            } catch (e) {
                throw (e)
            }
        },
        async logout({ commit }) {
                await axios.post('/api/logout').then((res) => {
                    commit('setUser', null);
                }).catch((err) => {
                    
                })
            
        },
        async getUser({commit}) {
            await axios.get('/api/user').then((res) => {
                commit('setUser', res.data);
            }).catch((err) => {
                
            })
        },

        
        async get_reclamations({commit}){
            const {data} = await axios.get('/api/reclamations')
            commit('SET_RECLAMATIONS', data)
        },

        async get_reclamation({commit}, ticket_id){
            await axios.get(`/api/reclamations/${ticket_id}`).then((response) => {
                commit('SET_RECLAMATION', response.data)
            })  
        }

    },
    plugins: [sharedMutations({ predicate: ['setUser'] })],


})
