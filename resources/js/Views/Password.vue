<template>
    <div class="border font-semibold  p-4 ">
        Password

    </div>

    <div class="p-4 bg-white">




                    <form class="md:w-10/12 md:p-4 w-full mx-auto" @submit.prevent="update">
                        <div class=" w-full my-1 py-2 sm:flex  sm:items-center sm:justify-between">
                            <label for="password" class="w-4/12 "> Password </label>
                            <input type="password" v-model="password"  name="password" class="border border-gray-300 bg-white sm:w-8/12 w-full p-2 mt-3 sm:mt-0 focus:outline-none rounded-sm ">
                        </div>
                        <div class=" w-full my-1 py-2 sm:flex  sm:items-center sm:justify-between">
                            <label for="password confirmation" class="w-4/12 "> Confirm password </label>
                            <input type="password" v-model="password_confirmation" name="password_confirmation" class="border border-gray-300 bg-white sm:w-8/12 w-full p-2 mt-3 sm:mt-0 focus:outline-none rounded-sm">
                        </div>
                       
                        <div class=" w-full my-1 py-2 sm:flex  sm:items-center  sm:justify-end">
                            <div class="sm:w-8/12 w-full  flex justify-between items-center mt-3 sm:mt-0">
                                 <div v-if="busy"  class="flex justify-center items-center p-2 px-6 rounded-sm text-white bg-blue-500 hover:bg-blue-600"> 
                                   <circle-svg class="w-6 h-6" />
                                </div>
                                <button v-else type="submit" class="p-3 rounded-sm text-white bg-blue-500 hover:bg-blue-600">Update</button>
                            </div>
                        </div>
                    </form>


    </div>
</template>


<script>
import { XIcon } from '@heroicons/vue/solid';
export default {
    components : {
        XIcon,
    },
    data() {
        return {
            
            password :  '' , 
            password_confirmation :  '', 
            errors : null,
            success : '',
            busy : false ,

        }
    },
    
    
    methods : {
        async update(){
            this.busy = true ;
            this.errors = null 
            this.success = ''
            try {
                await this.$store.dispatch('password' , {'password' : this.password ,'password_confirmation' : this.password_confirmation})
                this.success = 'password updated successfully !'
                this.password = ''
                this.password_confirmation = ''
            }
            catch (e){
                this.errors = e.data
            };
            this.busy = false ;
            
        }
    },
    
    
}
</script>