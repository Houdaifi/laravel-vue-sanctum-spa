<template>
  <div class="max-w-screen-lg mx-auto text-gray-900">
        <div class="flex justify-center">
            <div class="flex-1">
                <div v-for="reclamation in reclamations.data" :key="reclamation.id" class="border w-auto mb-2 cursor-pointer" 
                @click="show_ticket(reclamation.id)">
                    <div class="border p-4 font-semibold ">{{reclamation.title}}</div>
                    <div class="p-4 bg-white">
                        {{reclamation.text}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
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
        }

    },
    created(){
        this.get_reclamations()
    }
}
</script>