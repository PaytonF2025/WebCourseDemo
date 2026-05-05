<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-4">
    <a class="navbar-brand fw-bold" href="#">线性代数课堂平台</a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navMenu"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navMenu">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/">知识区</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/demo">演示区</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/about">关于</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.nav-link.router-link-active {
  font-weight: bold;
  color: #00ffb3 !important;
}
</style>
