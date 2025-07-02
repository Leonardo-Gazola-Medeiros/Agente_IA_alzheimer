<template>
  <div class="flex flex-col gap-4 mb-[20px]">
    <div class="flex items-center gap-2">
      <span class="w-[5px] h-[34px] bg-[#4ADE80]"></span>
      <h2 class="text-[#D9D9D9] font-bold">{{ title }}</h2>
      <div class="group relative">
        <span class="text-gray-400 hover:text-green-900 duration-300 cursor-pointer">ⓘ</span>
        <div
          class="absolute bg-green-900 left-0 mt-1 w-64 p-2 text-sm text-white bg-gray-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          {{ info }}
        </div>
      </div>
    </div>

    <textarea
      class="bg-[#313131] rounded-[10px] text-[#E0E0E0] w-full outline-none border-transparent p-4 border-1 focus:border-[#4ADE80] resize-none overflow-x-hidden leading-normal"
      :placeholder="placeholder"
      :value="text"
      @input="updateText($event)"
    ></textarea>

    <div class="flex flex-col gap-4 mt-4">
      <span class="text-[#D9D9D9] font-bold">Avalie de 1 a 5 para esse critério</span>
      <Rating v-model="localRating" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'
import Rating from './Rating.vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: 'Escreva algo...'
  },
  rating: {
    type: Number,
    default: 0
  },
  text: {
    type: String,
    default: ''
  },
  info: {
    type: String,
  }
})

const emit = defineEmits(['update:rating', 'update:text'])

const localRating = ref(props.rating)
const localText = ref(props.text)

watch(localRating, (newVal) => {
  emit('update:rating', newVal)
})

const updateText = (e: Event) => {
  const target = e.target as HTMLTextAreaElement
  localText.value = target.value
  emit('update:text', target.value)
}
</script>
