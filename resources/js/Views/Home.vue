<template>
  <div class="max-w-screen-lg mx-auto text-gray-900">

        <v-modal ref="Modal" title="Add Reclamation" @submitForm="AddReclamation">
            
            <div class="flex flex-col items-center space-y-4">
                <input class="px-3 py-1 rounded text-sm border w-full ring-1 ring-indigo-300" v-model="form.title" type="text" name="title" placeholder="Title">
                <div class="text-xs text-red-500 text-left" v-if="form.errors.has('title')" v-html="form.errors.get('title')" />

                <textarea class="px-3 py-1 rounded text-sm border w-full ring-1 ring-indigo-300" v-model="form.text" type="password" name="text" 
                    placeholder="Text"></textarea>
                <div class="text-xs text-red-500 text-left" v-if="form.errors.has('text')" v-html="form.errors.get('text')" />

                <select class="bg-white px-3 py-1 rounded text-sm border w-full ring-1 ring-indigo-300" 
                    v-model="form.type_id" type="password" name="text" placeholder="Type">
                    <option value="" disabled></option>
                    <option v-for="type in types" :key="type.id" :value="type.id">{{type.name}}</option>
                </select>
                <div class="text-xs text-red-500 text-left" v-if="form.errors.has('type_id')" v-html="form.errors.get('type_id')" />
            </div>

        </v-modal>

       <div class="flex justify-end mb-3">
            <button @click="ShowAddModal" class="bg-indigo-500 px-3 py-2 text-xs rounded-lg text-white">Add</button>
        </div>
        <div class="flex justify-center">
            <div class="flex-1">
                <div v-for="reclamation in reclamations.data" :key="reclamation.id" class="border w-auto mb-2 cursor-pointer" 
                @click="show_ticket(reclamation.id)">
                    <div class="flex justify-between items-center">
                        <div class="p-4 font-semibold">{{reclamation.title}}</div>
                        <div class="flex space-x-4 items-center px-3">
                            <div class="px-3 py-2 border text-xs rounded-lg">{{reclamation.types[0].name}}</div>
                            <div class="bg-yellow-400 px-3 py-2 text-xs rounded-lg"
                            :class="[{'bg-green-400' : reclamation.status[0].statut == 'finished'}]">
                                {{reclamation.status[0].statut}}
                            </div>
                        </div>
                    </div>
                    <div class="p-4 bg-white">
                        {{reclamation.text}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import axios from "axios";
import Form from 'vform'
import VModal from '../components/VModal.vue'
export default {
    data() {
        return {
            form: new Form({
                title: '',
                text: '',
                type_id: '',
            }),
            types:[
                {id: 1, name: 'Techniques'},
                {id: 2, name: 'Matérielles'},
                {id: 3, name: 'Protocole sanitaire'},
                {id: 4, name: 'Salles'}
            ]
        }
    },
    components:{VModal},
    computed:{
        reclamations() {
            return this.$store.getters.reclamations
        },
    },
    methods:{

        get_reclamations(){
            this.$store.dispatch('get_reclamations')
        },

        show_ticket(ticket_id){
            this.$router.push({name: 'reclamation', params: {id: ticket_id}})
        },

        ShowAddModal(){
            this.$refs.Modal.show()
        },

        AddReclamation(){
            this.form.post('/api/reclamations').then((r) => {
                this.$store.commit('ADD_RECLAMATION', r.data)
                this.$refs.Modal.closeModal()
            }).finally(() => {
                this.$refs.Modal.finishLoading()
            })
        }

    },
    created(){
        this.get_reclamations()
    }
}
</script>