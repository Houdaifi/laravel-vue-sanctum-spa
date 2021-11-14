<template>
	<div v-show="isVisible" class="fixed inset-0 flex items-center justify-center sm:flex-col" :class="[{'cursor-wait':ModalLoading}]"
		 id="modal" @keydown.esc="closeModal" tabindex="0" >
		<div class="bg-gray-300 dark:bg-coolGray-900 opacity-50 w-full h-full absolute z-10 inset-0" @click="closeModal"></div>
		<div class="bg-white dark:bg-blueGray-800 rounded shadow-lg items-center w-1/2" :class="[{'z-20' : !ModalLoading}, {'w-1/4' : small}]">
			<div class="bg-gray-50 dark:bg-coolGray-800 dark:border-blueGray-600 border-b border-gray-200 rounded-tl rounded-tr">
				<div class="relative overflow-hidden h-2 shim-red w-full rounded-sm bg-purple-500 dark:bg-purple-700 pt-1 z-50" v-show="ModalLoading"></div>
				<div class="flex justify-between p-5">
					<h6 v-if="title">{{ title }}</h6>
					<x-circle-icon class="float-right cursor-pointer text-red-700 w-8 h-8 hover:text-red-600" @click="closeModal"/>
				</div>
			</div>
			<form v-on:submit.prevent="submitForm">
				<div class="p-4 space-y-6">
					<slot></slot>
				</div>
				<div class="flex items-center justify-between p-5 border-t bg-gray-50 dark:bg-blueGray-800 border-gray-200 dark:border-blueGray-600 
					rounded-bl rounded-br mt-3">
					<div>
						<slot name="optionBtn"></slot>
					</div>
					<div class="flex items-center space-x-2">
                        <button type="submit" class="inline-flex justify-center bg-blue-500  px-3 py-2 text-sm text-white rounded-lg">Submit</button>

						<button @click.prevent="closeModal" class="bg-red-500 px-3 py-2 text-sm text-white rounded-lg">Close</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>


<script>
export default {
	data() {
		return {
			isVisible: false,
			ModalLoading: false
		}
	},
	props: {
		title: {type: String, required: true},
		small: {type: Boolean, default:false}
	},
	methods: {
		closeModal() {
			this.isVisible = false
			this.$emit('closeModal')
		},
		show() {
			this.isVisible = true
		},
		submitForm() {
			this.ModalLoading = true
			this.$emit('submitForm')
		},
		finishLoading() {
			this.ModalLoading = false
		}
	}
}
</script>

<style>
.shim-red::after {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	transform: translateX(-100%);
	background-image: linear-gradient(
		90deg,
		rgba(233, 233, 233, 1) 0,
		rgba(233, 233, 233, 0.9) 50%,
		rgba(233, 233, 233, 0.8) 100%
	);
	animation: shimmer 2s ease-out infinite;
	content: "";
}
@keyframes shimmer {
	100% {
		transform: translateX(0%);
		opacity: 0;
	}
}
</style>