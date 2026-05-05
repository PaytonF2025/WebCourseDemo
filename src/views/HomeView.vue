<template>
  <div class="home-view-container">
    <section class="hero-section">
      <div class="hero-content">
        <h1>数学游乐场</h1>
        <h2>欢迎来到线性代数交互式探索平台</h2>
        <p>在这里，抽象的概念变得直观，复杂的计算变得生动。亲手“玩转”数学！</p>
        <router-link to="/concepts" class="hero-cta-button"> 从“核心概念”开始探索 </router-link>
      </div>
    </section>

    <section class="featured-section">
      <div class="featured-visual">
        <div class="visual-placeholder">
          <span class="icon">🧮</span>
          <p>实时几何变换演示</p>
        </div>
      </div>
      <div class="featured-content">
        <h2><span class="highlight">亮点功能</span>：实时几何变换</h2>
        <p>
          还在死记硬背矩阵乘法？来试试我们的几何变换演示！
          在“矩阵运算”页面，你将能通过滑块实时改变一个 2x2
          矩阵的每一个值，并亲眼看到整个2D空间、坐标系和向量是如何随之被拉伸、剪切、旋转和翻转的。
        </p>
        <p>这会让你真正理解“矩阵即变换”这一线性代数的核心思想。</p>
        <router-link to="/matrix-operations" class="cta-button"> 前往体验 </router-link>
      </div>
    </section>

    <section class="modules-section">
      <h3 class="section-title">开始你的旅程</h3>
      <div class="modules-grid">
        <router-link v-for="mod in modules" :key="mod.title" :to="mod.path" class="module-card">
          <div class="card-icon">{{ mod.icon }}</div>
          <h4>{{ mod.title }}</h4>
          <p>{{ mod.description }}</p>
          <div class="card-footer">进入 →</div>
        </router-link>
      </div>
    </section>

    <section class="about-section">
      <h3 class="section-title">为什么创建本平台？</h3>
      <p>
        线性代数是现代数学的基石，它在计算机科学、工程学、物理学中都扮演着至关重要的角色。
        然而，许多人在学习它时会感到抽象和枯燥。我们的目标是改变这一点。
        本平台旨在通过“可视化”和“交互”的方式，为你揭示线性代数的核心思想。
      </p>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const modules = ref([
  {
    path: '/concepts',
    icon: '📘',
    title: '核心概念',
    description: '学习向量、矩阵、线性变换等基础知识。',
  },
  {
    path: '/eigenvectors',
    icon: '💡',
    title: '特征向量',
    description: '探索变换的“不动之轴”，理解矩阵的深层特性。',
  },
  {
    path: '/matrix-operations',
    icon: '🧮',
    title: '矩阵运算',
    description: '亲手尝试矩阵计算，并观察它如何扭曲空间。',
  },
  {
    path: '/applications',
    icon: '🌍',
    title: '实际应用',
    description: '探索线代在图形学、机器学习等领域的应用。',
  },
  {
    path: '/quiz',
    icon: '🧠',
    title: '知识测验',
    description: '通过一系列小测验，检验和巩固你的学习成果。',
  },
])
</script>

<style scoped>
.home-view-container {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
}

.hero-section {
  text-align: center;
  padding: 80px 20px 60px 20px;
  animation: fadeInUp 0.5s ease-out;
}
.hero-content h1 {
  font-size: 3.2rem;
  font-weight: 700;
  color: var(--secondary-color);
  margin-bottom: 10px;
}
.hero-content h2 {
  font-size: 1.5rem;
  font-weight: 400;
  color: var(--text-color-light);
  margin-bottom: 25px;
}
.hero-content p {
  font-size: 1.1rem;
  color: var(--secondary-color);
  margin-bottom: 30px;
}
.hero-cta-button {
  padding: 12px 30px;
  background-color: var(--primary-color);
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  transition: background-color 0.3s;
}
.hero-cta-button:hover {
  background-color: #36a476;
}

/* 2. Featured Section */
.featured-section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 40px;
  background-color: var(--card-bg);
  padding: 40px;
  border-radius: 12px;
  margin-bottom: 50px;
  animation: fadeInUp 0.5s ease-out 0.2s;
  opacity: 0;
  animation-fill-mode: forwards;
  border: 1px solid var(--border-color);
}
.featured-visual {
  flex: 1;
  min-width: 250px;
}
.visual-placeholder {
  width: 100%;
  height: 250px;
  background-color: #f0f2f5;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--text-color-light);
  border: 2px dashed var(--border-color);
}
.visual-placeholder .icon {
  font-size: 4rem;
}
.featured-content {
  flex: 1.5;
  min-width: 300px;
}
.featured-content h2 {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 15px;
}
.featured-content h2 .highlight {
  color: var(--primary-color);
}
.featured-content p {
  line-height: 1.7;
  margin-bottom: 15px;
}
.cta-button {
  padding: 10px 20px;
  background-color: var(--secondary-color);
  color: white;
  border-radius: 8px;
  text-decoration: none;
  transition: background-color 0.3s;
}
.cta-button:hover {
  background-color: #555;
}

/* 3. Module Grid */
.modules-section {
  padding: 20px 0;
  animation: fadeInUp 0.5s ease-out 0.4s;
  opacity: 0;
  animation-fill-mode: forwards;
}
.section-title {
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 30px;
}
.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}
.module-card {
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 25px;
  text-decoration: none;
  color: var(--secondary-color);
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  display: flex;
  flex-direction: column;
}
.module-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow);
}
.card-icon {
  font-size: 2.5rem;
  margin-bottom: 10px;
}
.module-card h4 {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 8px;
}
.module-card p {
  flex-grow: 1;
  color: var(--text-color-light);
  line-height: 1.6;
}
.card-footer {
  margin-top: 15px;
  font-weight: 500;
  color: var(--primary-color);
}

/* 4. About Section */
.about-section {
  text-align: center;
  padding: 60px 20px;
  max-width: 800px;
  margin: 0 auto;
  color: var(--text-color-light);
  line-height: 1.8;
  animation: fadeInUp 0.5s ease-out 0.6s;
  opacity: 0;
  animation-fill-mode: forwards;
}

/* 动画 */
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
</style>
