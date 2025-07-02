<template>
  <div class="flex gap-4 items-center mb-[20px]">
    <div v-for="i in 5" :key="i" class="flex flex-col items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        :fill="modelValue >= i ? '#4ADE80' : 'none'"
        :stroke="modelValue >= i ? '#15803D' : '#D9D9D9'"
        stroke-width="2"
        class="w-4 h-4 cursor-pointer transition-all duration-200 hover:scale-110"
        @click="setRating(i)"
      >
        <circle cx="12" cy="12" r="10" />
      </svg>
      <span :class="{'text-[#4ADE80]': modelValue >= i, 'text-[#D9D9D9]': modelValue < i}" class="text-sm mt-1">
        {{ i }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['update:modelValue'])

const setRating = (value: number) => {
  emit('update:modelValue', value)
}
</script>