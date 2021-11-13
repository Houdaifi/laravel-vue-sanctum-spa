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
                // const res = await axios.post('/api/login', payload);

                // if (res.status != 200) throw res;

                // if (res.data.status_code != 200) throw res.data.message;
                
                
                
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
        async profile({commit},payload) {
            await axios.patch('/api/profile', payload).then((res) => {
                commit('setUser', res.data.user);
            }).catch((err) => {
                throw err.response
            })
        },
        async password({commit},payload) {
            await axios.patch('/api/password', payload).then((res) => {
                
            }).catch((err) => {
                throw err.response
            })
        },

        async get_reclamations({commit}){
            const {data} = await axios.get('/api/reclamations')
            commit('SET_RECLAMATIONS', data)
        },

        async get_reclamation({commit}, ticket_id){
            const {data} = await axios.get(`/api/reclamations/${ticket_id}`)
            commit('SET_RECLAMATION', data)
        }

    },
    plugins: [sharedMutations({ predicate: ['setUser'] })],


})
