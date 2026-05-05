<template>
  <div class="page-container">
    <header class="page-header">
      <h1>📘 核心概念</h1>
      <p>理解线性代数的基石：从向量到特征值。</p>
    </header>

    <div class="search-bar">
      <input type="text" v-model="searchKeyword" placeholder="搜索概念标题或描述..." />
    </div>

    <div class="content-grid">
      <div
        v-for="(item, index) in filteredConcepts"
        :key="item.id"
        class="info-card"
        :style="{ animationDelay: `${index * 100}ms` }"
      >
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>

        <VectorAddition v-if="item.title === '向量 (Vector)'" style="margin-top: 20px" />
      </div>

      <div v-if="filteredConcepts.length === 0" class="no-results">
        <p>
          找不到匹配“<strong>{{ searchKeyword }}</strong
          >”的结果。
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import concepts from '../data/concepts.json'
import VectorAddition from '@/components/VectorAddition.vue'

export default {
  name: 'Concept',
  components: {
    VectorAddition,
  },
  data() {
    return {
      concepts,
      searchKeyword: '',
    }
  },
  computed: {
    filteredConcepts() {
      if (!this.searchKeyword) {
        return this.concepts
      }
      const lowerKeyword = this.searchKeyword.toLowerCase()
      return this.concepts.filter(
        (item) =>
          item.title.toLowerCase().includes(lowerKeyword) ||
          item.description.toLowerCase().includes(lowerKeyword),
      )
    },
  },
}
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.page-container {
  animation: fadeInUp 0.5s ease-out forwards;
}
.page-header {
  margin-bottom: 30px;
}
.page-header h1 {
  font-size: 2rem;
  color: var(--secondary-color);
}
.page-header p {
  color: var(--text-color-light);
}
.content-grid {
  display: grid;
  gap: 20px;
}
.info-card {
  background-color: var(--card-bg);
  padding: 25px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border-left: 5px solid var(--primary-color);
  opacity: 0;
  animation: fadeInUp 0.5s ease-out forwards;
}
.info-card h3 {
  font-size: 1.4rem;
  margin-bottom: 10px;
}
.info-card p {
  line-height: 1.7;
}

.search-bar {
  margin-bottom: 25px;
}
.search-bar input {
  width: 100%;
  padding: 12px 15px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}
.search-bar input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px hsla(160, 100%, 37%, 0.2);
}
.no-results {
  background-color: var(--card-bg);
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  color: var(--text-color-light);
}
</style>
