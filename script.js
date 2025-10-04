const N = 35
const grid1 = document.getElementById('grid1')
const grid2 = document.getElementById('grid2')
const targetRow = Math.floor(Math.random() * N)
const targetCol = Math.floor(Math.random() * N)
let seen1 = new Set()
let seen2 = new Set()
let goal = false // for dfs

createGrid()
function createGrid() {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      let div1 = document.createElement('div1')
      div1.id = `DFS_R${i}C${j}`
      div1.style.background = 'aqua'
      div1.style.border = '0.1px solid darkblue'
      grid1.appendChild(div1)
      let div2 = document.createElement('div2')
      div2.id = `BFS_R${i}C${j}`
      div2.style.background = 'aqua'
      div2.style.border = '0.1px solid darkblue'
      grid2.appendChild(div2)
    }
  }
}

document.getElementById(`DFS_R${targetRow}C${targetCol}`).style.background =
  'red'
document.getElementById(`BFS_R${targetRow}C${targetCol}`).style.background =
  'red'

async function dfs(r, c) {
  let id = `DFS_R${r}C${c}`

  if (goal) return

  if (r == targetRow && c == targetCol) {
    goal = true
    return
  }

  if (seen1.has(id)) return

  seen1.add(id)

  let cell = document.getElementById(id) // current cell
  cell.style.background = 'yellow'
  await new Promise(res => setTimeout(res, 10))

  dir = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ]

  for (let [dr, dc] of dir) {
    let nr = r + dr
    let nc = c + dc
    if (nr >= 0 && nr < N && nc >= 0 && nc < N) {
      await dfs(nr, nc)
    }
  }
}

async function bfs(r, c) {
  let queue = [[r, c]]
  seen2.clear()

  while (queue.length > 0) {
    let [r, c] = queue.shift()

    if (r == targetRow && c == targetCol) return

    let id = `BFS_R${r}C${c}`

    if (seen2.has(id)) continue
    seen2.add(id)

    let cell = document.getElementById(id)
    if (cell) {
      cell.style.background = 'yellow' // visiting
      await new Promise(res => setTimeout(res, 10))
    }

    dir = [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
    ]

    for (let [dr, dc] of dir) {
      let nr = r + dr
      let nc = c + dc
      if (nr >= 0 && nr < N && nc >= 0 && nc < N) {
        if (!seen2.has(`BFS_R${nr}C${nc}`)) {
          queue.push([nr, nc])
        }
      }
    }
  }
}

start()

function start() {
  seen1.clear()
  seen2.clear()
  dfs(0, 0)
  bfs(0, 0)
}
