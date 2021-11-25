<template>
    <div class="w-3/4 mx-auto">
        <div class="flex justify-between items-center border">
            <div class="p-4 font-semibold">{{reclamation.title}}</div>
            <div class="flex space-x-4 items-center px-3">
                <div class="px-3 py-2 border text-xs rounded-lg" v-for="reclamation_type in reclamation.types" :key="reclamation_type.id">{{reclamation_type.name}}</div>
                <div v-for="reclamation_statut in reclamation.status" :key="reclamation_statut.id" class="bg-yellow-400 px-3 py-2 text-xs rounded-lg"
                    :class="[{'bg-green-400' : reclamation_statut.statut == 'finished'}]">
                    {{reclamation_statut.statut}}
                </div>
            </div>
        </div>
        <div class="p-4 bg-white border">
            {{reclamation.text}}
        </div>
        <!-- Comment -->
        <div class="p-4 bg-white" v-if="(user.role == 'admin' || reclamation.statut_id == 2)">
            <textarea class="w-full p-4 rounded border" v-html="form.comment" v-model="reclamation.comment"
                :disabled="isUser" :class="[{'bg-gray-200' : isUser }]">
            </textarea>
            <div class="text-xs text-red-500 text-left" v-if="form.errors.has('comment')" v-html="form.errors.get('comment')" />

            <div class="flex justify-end" v-for="reclamation_statut in reclamation.status" :key="reclamation_statut.id">
                <button class="px-3 py-2 rounded bg-blue-400 mt-2 text-white" @click="submit" v-if="!isUser">
                    Submit
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import Form from 'vform'

export default {
    data(){
        return{
            form: new Form({
                comment: '',
            })
        }
    },
    computed:{
        reclamation() {
            return this.$store.getters.reclamation
        },
        user() {
            return this.$store.getters.user
        },
        isUser(){
            this.user.role == 'user'
        }
    },
    methods:{
        get_reclamation(ticked_id){
            this.$store.dispatch('get_reclamation', ticked_id)
        },

        submit(){
            this.form.put('/api/reclamations/'+this.reclamation.id).then((r) => {
                this.$store.commit('SET_RECLAMATION', r.data)
            })
        },
    },
    created(){
        this.get_reclamation(this.$route.params.id)
    },
    updated(){
        if(this.reclamation.comment){
            this.form.comment = this.reclamation.comment
            console.log(this.form.comment)
        }
    }
}
</script>