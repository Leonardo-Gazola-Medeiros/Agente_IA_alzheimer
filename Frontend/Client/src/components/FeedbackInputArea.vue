<template>
    <div class="flex flex-col gap-4 mb-[20px]">
      <div class="flex items-center gap-2">
        <span class="w-[5px] h-[34px] bg-[#4ADE80]"></span>
        <h2 class="text-[#D9D9D9] font-bold">{{ title }}</h2>
      </div>
  
      <textarea
        class="bg-[#313131] rounded-[10px] mb-[20px] text-[#E0E0E0] w-full outline-none border-transparent p-4 border-1 focus:border-[#4ADE80] resize-none overflow-x-hidden leading-normal"
        :placeholder="placeholder"
        :value="text"
        @input="updateText($event)"
      ></textarea>

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
  