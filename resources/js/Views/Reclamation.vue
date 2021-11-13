<template>
  <div>
       <div class="flex-1">
            <div class="border w-auto" >
                <div class="border p-4 font-semibold ">{{reclamation.title}}</div>
                <div class="p-4 bg-white">
                    {{reclamation.text}}
                </div>
            </div>
        </div>
  </div>
</template>

<script>
export default {
    computed:{
        reclamation() {
            return this.$store.getters.reclamation
        },
    },
    methods:{
        get_reclamation(ticked_id){
            this.$store.dispatch('get_reclamation', ticked_id)
        },
    },
    created(){
        this.get_reclamation(this.$route.params.id)
    }
}
</script>