<template>
    <div>
        <div class="flex justify-between items-center border">
            <div class="p-4 font-semibold">{{reclamation.title}}</div>
            <div class="flex space-x-4 items-center px-3">
                <div class="px-3 py-2 border text-xs rounded-lg">{{reclamation.types[0].name}}</div>
                <div class="bg-yellow-400 px-3 py-2 text-xs rounded-lg"
                :class="[{'bg-green-400' : reclamation.status[0].statut == 'finished'}]">
                    {{reclamation.status[0].statut}}
                </div>
            </div>
        </div>
        <div class="p-4 bg-white border">
            {{reclamation.text}}
        </div>
        <!-- Comment -->
        <div class="p-4 bg-white border">
            <textarea class="w-full p-4 rounded border overflow-y-hidden" v-model="reclamation.comment"
            ></textarea>
            <div class="flex justify-end">
                <button class="px-3 py-2 rounded bg-blue-400 mt-2 text-white" @click="submit" :disabled="!reclamation.comment">
                    Submit
                </button>
            </div>
        </div>
    </div>
</template>

<script>
// :disabled="!isEmpty" :class="[{'bg-gray-200' : !isEmpty }]"
import axios from "axios";
import Form from 'vform'

export default {
    data(){
        return{
            isEmpty: false,
            form: new Form({
                comment: '',
            })
        }
    },
    computed:{
        reclamation() {
            return this.$store.getters.reclamation
        },
    },
    methods:{
        get_reclamation(ticked_id){
            this.$store.dispatch('get_reclamation', ticked_id)
        },

        submit(){
            this.form.comment = this.reclamation.comment
            this.form.put('/api/reclamations/'+this.reclamation.id).then((r) => {
                this.$store.commit('SET_RECLAMATION', r.data)
            })
        },
    },
    created(){
         this.get_reclamation(this.$route.params.id)
    },
    updated(){
        console.log(this.reclamation)
    }

}
</script>