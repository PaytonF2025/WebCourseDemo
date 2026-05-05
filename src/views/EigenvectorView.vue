<template>
  <div class="page-container">
    <header class="page-header">
      <h1>💡 特征向量与特征值</h1>
      <p>探索变换的“不动之轴”——这是理解线性变换深层特性的关键。</p>
    </header>

    <div class="content-area">
      <div class="info-card">
        <h3>什么是特征向量？</h3>
        <p>
          在一个线性变换（由一个矩阵表示）下，大多数向量都会离开它们原来的“张成空间”（span），即改变方向。
          但是，总有那么一些“特殊”的向量，它们在变换后**方向保持不变**（或完全反向），仅仅是在原方向上被拉伸或压缩。
        </p>
        <p>
          这些特殊的向量就叫做<strong>特征向量 (Eigenvectors)</strong>。
          而它们被拉伸或压缩的比例因子，就叫做<strong>特征值 (Eigenvalues)</strong>。
        </p>
      </div>

      <EigenvectorDemo />
    </div>
  </div>
</template>

<script setup>
import EigenvectorDemo from '@/components/EigenvectorDemo.vue'
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

.content-area {
  display: grid;
  gap: 20px;
}
.info-card {
  background-color: var(--card-bg);
  padding: 25px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow);
  border-left: 5px solid #f39c12;
}
.info-card p {
  line-height: 1.7;
}
</style>
