<template>
  <div id="app-container">
    <aside class="sidebar">
      <div class="sidebar-header">
        <span class="logo">LA</span>
        <h1>线性代数探索</h1>
      </div>
      <nav class="main-nav">
        <router-link to="/" class="nav-item">
          <span class="icon">🏠</span>
          <span>首页</span>
        </router-link>
        <router-link to="/concepts" class="nav-item">
          <span class="icon">📘</span>
          <span>核心概念</span>
        </router-link>
        <router-link to="/eigenvectors" class="nav-item">
          <span class="icon">💡</span>
          <span>特征向量</span>
        </router-link>
        <router-link to="/matrix-operations" class="nav-item">
          <span class="icon">🧮</span>
          <span>矩阵运算</span>
        </router-link>
        <router-link to="/applications" class="nav-item">
          <span class="icon">🌍</span>
          <span>实际应用</span>
        </router-link>
        <router-link to="/quiz" class="nav-item">
          <span class="icon">🧠</span>
          <span>知识测验</span>
        </router-link>
      </nav>
    </aside>
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style>
@import '@/assets/base.css';

:root {
  --primary-color: #42b883;
  --secondary-color: #34495e;
  --background-color: #f0f2f5;
  --sidebar-bg: #ffffff;
  --card-bg: #ffffff;
  --text-color: #333;
  --text-color-light: #7f8c8d;
  --border-color: #e8e8e8;
  --shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
  font-family:
    'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial,
    sans-serif;
}

#app-container {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.sidebar {
  width: 240px;
  background-color: var(--sidebar-bg);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  padding: 20px;
  transition: width 0.3s ease;
}

.sidebar-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.sidebar-header .logo {
  font-size: 24px;
  font-weight: bold;
  background-color: var(--primary-color);
  color: white;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin-right: 12px;
}

.sidebar-header h1 {
  font-size: 18px;
  font-weight: 600;
  color: var(--secondary-color);
}

.main-nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  border-radius: 8px;
  text-decoration: none;
  color: var(--secondary-color);
  font-weight: 500;
  transition:
    background-color 0.3s,
    color 0.3s;
}

.nav-item .icon {
  margin-right: 15px;
  font-size: 20px;
}

.nav-item:hover {
  background-color: #f5f5f5;
}

.nav-item.router-link-exact-active {
  background-color: var(--primary-color);
  color: white;
  font-weight: 600;
}

.main-content {
  flex: 1;
  padding: 40px;
  overflow-y: auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
