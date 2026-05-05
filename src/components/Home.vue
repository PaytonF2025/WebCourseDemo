<template>
  <div class="home">
    <h1>线性代数知识分享平台</h1>
    <p>欢迎来到本网站，这里你可以学习、展示与探索线性代数的核心思想。</p>

    <div class="nav-buttons">
      <router-link to="/concept">基础概念</router-link>
      <router-link to="/matrix">矩阵运算</router-link>
      <router-link to="/application">实际应用</router-link>
      <router-link to="/quiz">测试区</router-link>
    </div>
  </div>
</template>

<style scoped>
.home {
  text-align: center;
  margin-top: 100px;
}
.nav-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}
a {
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  transition: 0.3s;
}
a:hover {
  background-color: #2c80b4;
}
</style>
