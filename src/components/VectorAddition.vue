<template>
  <div class="vector-demo-container">
    <div class="controls">
      <div class="vector-control">
        <strong style="color: #3498db">向量 a</strong>
        <div class="slider-group">
          <label>x: {{ v1.x }}</label>
          <input type="range" min="-10" max="10" v-model.number="v1.x" />
        </div>
        <div class="slider-group">
          <label>y: {{ v1.y }}</label>
          <input type="range" min="-10" max="10" v-model.number="v1.y" />
        </div>
      </div>
      <div class="vector-control">
        <strong style="color: #e74c3c">向量 b</strong>
        <div class="slider-group">
          <label>x: {{ v2.x }}</label>
          <input type="range" min="-10" max="10" v-model.number="v2.x" />
        </div>
        <div class="slider-group">
          <label>y: {{ v2.y }}</label>
          <input type="range" min="-10" max="10" v-model.number="v2.y" />
        </div>
      </div>
      <div class="result-display">
        <strong>和向量 c = a + b</strong>
        <p>[{{ resultVector.x.toFixed(1) }}, {{ resultVector.y.toFixed(1) }}]</p>
      </div>
    </div>
    <div class="canvas-wrapper">
      <canvas ref="canvas" width="400" height="400"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'

const canvas = ref(null)
const v1 = ref({ x: 3, y: 4 })
const v2 = ref({ x: 5, y: -2 })

const resultVector = computed(() => ({
  x: v1.value.x + v2.value.x,
  y: v1.value.y + v2.value.y,
}))

let ctx = null
const scale = 20
const origin = { x: 200, y: 200 }

// 坐标转换函数
const toCanvasX = (x) => origin.x + x * scale
const toCanvasY = (y) => origin.y - y * scale

const draw = () => {
  if (!ctx) return
  ctx.clearRect(0, 0, 400, 400)
  drawGrid()
  drawAxes()

  // 绘制辅助线（平行四边形）
  drawVector(v2.value, '#f5c6cb', toCanvasX(v1.value.x), toCanvasY(v1.value.y))
  drawVector(v1.value, '#aed6f1', toCanvasX(v2.value.x), toCanvasY(v2.value.y))

  // 绘制主向量
  drawVector(v1.value, '#3498db')
  drawVector(v2.value, '#e74c3c')
  drawVector(resultVector.value, '#27ae60')
}

const drawGrid = () => {
  ctx.strokeStyle = '#e0e0e0'
  ctx.lineWidth = 0.5
  for (let i = -10; i <= 10; i++) {
    // 垂直线
    ctx.beginPath()
    ctx.moveTo(toCanvasX(i), 0)
    ctx.lineTo(toCanvasX(i), 400)
    ctx.stroke()
    // 水平线
    ctx.beginPath()
    ctx.moveTo(0, toCanvasY(i))
    ctx.lineTo(400, toCanvasY(i))
    ctx.stroke()
  }
}

const drawAxes = () => {
  ctx.strokeStyle = '#333'
  ctx.lineWidth = 1.5
  // X轴
  ctx.beginPath()
  ctx.moveTo(0, origin.y)
  ctx.lineTo(400, origin.y)
  ctx.stroke()
  // Y轴
  ctx.beginPath()
  ctx.moveTo(origin.x, 0)
  ctx.lineTo(origin.x, 400)
  ctx.stroke()
}

const drawVector = (vec, color, startX = origin.x, startY = origin.y) => {
  const endX = startX + vec.x * scale
  const endY = startY - vec.y * scale

  ctx.beginPath()
  ctx.moveTo(startX, startY)
  ctx.lineTo(endX, endY)
  ctx.strokeStyle = color
  ctx.lineWidth = 2
  ctx.stroke()

  // 绘制箭头
  const angle = Math.atan2(endY - startY, endX - startX)
  ctx.save()
  ctx.translate(endX, endY)
  ctx.rotate(angle)
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(-10, 5)
  ctx.lineTo(-10, -5)
  ctx.closePath()
  ctx.fillStyle = color
  ctx.fill()
  ctx.restore()
}

onMounted(() => {
  ctx = canvas.value.getContext('2d')
  draw()
})

watch([v1, v2], draw, { deep: true })
</script>

<style scoped>
.vector-demo-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid var(--border-color);
}
.controls {
  flex: 1;
  min-width: 250px;
}
.vector-control {
  margin-bottom: 20px;
}
.slider-group {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}
.slider-group label {
  width: 50px;
}
.slider-group input[type='range'] {
  width: 100%;
}
.result-display {
  margin-top: 20px;
  padding: 10px;
  background: #e9f7ef;
  border-radius: 5px;
  text-align: center;
}
.result-display p {
  font-size: 1.5rem;
  font-weight: bold;
  color: #27ae60;
  font-family: 'Courier New', Courier, monospace;
}
.canvas-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
canvas {
  border: 1px solid var(--border-color);
  background-color: white;
  border-radius: 8px;
}
</style>
