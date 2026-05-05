<template>
  <div class="transform-demo-container">
    <div class="controls">
      <h4>定义 2x2 变换矩阵</h4>
      <div class="matrix-grid">
        <div class="matrix-cell">
          <label>a: {{ matrix.a.toFixed(1) }}</label>
          <input type="range" min="-2" max="2" step="0.1" v-model.number="matrix.a" />
        </div>
        <div class="matrix-cell">
          <label>b: {{ matrix.b.toFixed(1) }}</label>
          <input type="range" min="-2" max="2" step="0.1" v-model.number="matrix.b" />
        </div>
        <div class="matrix-cell">
          <label>c: {{ matrix.c.toFixed(1) }}</label>
          <input type="range" min="-2" max="2" step="0.1" v-model.number="matrix.c" />
        </div>
        <div class="matrix-cell">
          <label>d: {{ matrix.d.toFixed(1) }}</label>
          <input type="range" min="-2" max="2" step="0.1" v-model.number="matrix.d" />
        </div>
      </div>
      <div class="info-box">
        <p>
          基向量 <strong>i</strong> = [1, 0] 变换为
          <span :style="{ color: iHatColor }"
            >[{{ matrix.a.toFixed(1) }}, {{ matrix.c.toFixed(1) }}]</span
          >
        </p>
        <p>
          基向量 <strong>j</strong> = [0, 1] 变换为
          <span :style="{ color: jHatColor }"
            >[{{ matrix.b.toFixed(1) }}, {{ matrix.d.toFixed(1) }}]</span
          >
        </p>
      </div>
      <button @click="resetMatrix">重置为单位矩阵</button>
    </div>
    <div class="canvas-wrapper">
      <canvas ref="canvas" width="400" height="400"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const canvas = ref(null)
const matrix = ref({ a: 1, b: 0, c: 0, d: 1 })
let ctx = null

const scale = 50 // 放大 50 倍
const origin = { x: 200, y: 200 }
const iHatColor = '#3498db'
const jHatColor = '#e74c3c'
const gridColor = '#f0f0f0'
const transformedGridColor = '#fcebec'
const transformedShapeColor = 'rgba(231, 76, 60, 0.3)'

// 坐标转换
const toCanvasX = (x) => origin.x + x * scale
const toCanvasY = (y) => origin.y - y * scale

const resetMatrix = () => {
  matrix.value = { a: 1, b: 0, c: 0, d: 1 }
}

const draw = () => {
  if (!ctx) return
  ctx.clearRect(0, 0, 400, 400)

  // 变换后的网格
  drawTransformedGrid()
  // 原始网格
  drawGrid()
  // 坐标轴
  drawAxes()

  // 绘制单位正方形 (1x1)
  drawShape(
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
    ],
    'rgba(52, 152, 219, 0.3)',
  )

  // 绘制变换后的平行四边形
  const m = matrix.value
  drawShape(
    [
      { x: 0, y: 0 },
      { x: m.a, y: m.c },
      { x: m.a + m.b, y: m.c + m.d },
      { x: m.b, y: m.d },
    ],
    transformedShapeColor,
  )

  // 绘制基向量
  drawVector(1, 0, iHatColor, 3) // i-hat
  drawVector(0, 1, jHatColor, 3) // j-hat

  // 绘制变换后的基向量
  drawVector(m.a, m.c, iHatColor, 5) // transformed i-hat
  drawVector(m.b, m.d, jHatColor, 5) // transformed j-hat
}

const drawGrid = () => {
  ctx.strokeStyle = gridColor
  ctx.lineWidth = 1
  for (let i = -10; i <= 10; i++) {
    ctx.beginPath()
    ctx.moveTo(toCanvasX(i), 0)
    ctx.lineTo(toCanvasX(i), 400)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(0, toCanvasY(i))
    ctx.lineTo(400, toCanvasY(i))
    ctx.stroke()
  }
}

const drawTransformedGrid = () => {
  const m = matrix.value
  ctx.strokeStyle = transformedGridColor
  ctx.lineWidth = 1
  for (let i = -10; i <= 10; i++) {
    // 变换后的垂直线
    ctx.beginPath()
    ctx.moveTo(toCanvasX(m.a * i - m.b * 10), toCanvasY(m.c * i - m.d * 10))
    ctx.lineTo(toCanvasX(m.a * i + m.b * 10), toCanvasY(m.c * i + m.d * 10))
    ctx.stroke()
    // 变换后的水平线
    ctx.beginPath()
    ctx.moveTo(toCanvasX(m.b * i - m.a * 10), toCanvasY(m.d * i - m.c * 10))
    ctx.lineTo(toCanvasX(m.b * i + m.a * 10), toCanvasY(m.d * i + m.c * 10))
    ctx.stroke()
  }
}

const drawAxes = () => {
  ctx.strokeStyle = '#888'
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(0, origin.y)
  ctx.lineTo(400, origin.y)
  ctx.moveTo(origin.x, 0)
  ctx.lineTo(origin.x, 400)
  ctx.stroke()
}

const drawVector = (x, y, color, width) => {
  ctx.beginPath()
  ctx.moveTo(origin.x, origin.y)
  ctx.lineTo(toCanvasX(x), toCanvasY(y))
  ctx.strokeStyle = color
  ctx.lineWidth = width
  ctx.stroke()
}

const drawShape = (points, color) => {
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.moveTo(toCanvasX(points[0].x), toCanvasY(points[0].y))
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(toCanvasX(points[i].x), toCanvasY(points[i].y))
  }
  ctx.closePath()
  ctx.fill()
}

onMounted(() => {
  ctx = canvas.value.getContext('2d')
  draw()
})

watch(matrix, draw, { deep: true })
</script>

<style scoped>
.transform-demo-container {
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
  min-width: 300px;
}
.controls h4 {
  margin-bottom: 15px;
}
.matrix-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 20px;
}
.matrix-cell label {
  display: block;
  font-size: 0.9em;
  margin-bottom: 5px;
}
input[type='range'] {
  width: 100%;
}
.info-box {
  background: #fff;
  padding: 10px 15px;
  border-radius: 5px;
  border: 1px solid var(--border-color);
  margin: 20px 0;
}
.info-box p {
  margin: 5px 0;
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
button {
  padding: 8px 15px;
  border: none;
  background-color: var(--secondary-color);
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}
button:hover {
  background-color: #555;
}
</style>
