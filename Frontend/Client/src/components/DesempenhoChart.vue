<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { Bar } from 'vue-chartjs'
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface Desempenho {
  nome_llm: string
  total_participacao: number
  total_melhor_performance: number
}

const dados = ref<Desempenho[]>([])

const chartData = ref({
  labels: [] as string[],
  datasets: [] as any[]
})

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      labels: {
        color: 'white' // Cor do texto da legenda
      },
      position: 'top' as const
    },
    title: {
      display: true,
      text: 'Desempenho dos LLMs',
      color: 'white',
      font: {
        size: 18
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: 'white'
      },
      grid: {
        color: 'rgba(255,255,255,0.1)'
      }
    },
    y: {
      ticks: {
        color: 'white'
      },
      grid: {
        color: 'rgba(255,255,255,0.1)'
      }
    }
  }
}

async function fetchDesempenho() {
  try {
    const res = await axios.get('http://localhost:8000/avaliacao/desempenho')
    
    const ordenado = res.data
    .filter((item: Desempenho) => item.nome_llm !== 'string')
    .sort((a, b) => b.total_melhor_performance - a.total_melhor_performance)
    
    dados.value = ordenado

    const labels = dados.value.map(item => item.nome_llm)
    const participacao = dados.value.map(item => item.total_participacao)
    const desempenho = dados.value.map(item => item.total_melhor_performance)

    chartData.value = {
        labels,
        datasets: [
            {
                label: 'Total Participação',
                backgroundColor: '#42A5F5',
                borderColor: '#1E88E5',
                hoverBackgroundColor: '#64B5F6',
                data: participacao
            },
            {
                label: 'Total Melhor Performance',
                backgroundColor: '#66BB6A',
                borderColor: '#43A047',
                hoverBackgroundColor: '#81C784',
                data: desempenho
            }
        ]
    }
  } catch (error) {
    console.error('Erro ao buscar desempenho:', error)
  }
}

onMounted(() => {
  fetchDesempenho()
})
</script>

<template>
  <div class="p-4">
    <div v-if="chartData.labels.length">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
    <div v-else class="text-gray-400">Carregando gráfico...</div>
  </div>
</template>
