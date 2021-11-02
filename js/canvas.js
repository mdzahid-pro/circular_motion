const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight


const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#00bdff', '#4d39cc', '#088gff']

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

// Objects
class Particle {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.radiant = Math.random() * Math.PI * 2
    this.velocity = 0.05
    this.distanceFromCenter = randomIntFromRange(50,120)
    this.lastMouse = {x:this.x, y:this.y}
  }

  update() {
    const lastPoint = {x:this.x,y:this.y}

    //move particle over time
    this.radiant += this.velocity

    //Drag Effect 
    this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05
    this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05

    //Circular Motion 
    this.x = this.lastMouse.x + Math.cos(this.radiant) * this.distanceFromCenter
    this.y = this.lastMouse.y + Math.sin(this.radiant) * this.distanceFromCenter
    this.draw(lastPoint)
  }

  draw(point) {
    c.beginPath()
    //c.arc(this.x + this.cos, this.y + this.sin, this.radius, 0, Math.PI * 2, false)
    //c.fillStyle = this.color
    c.strokeStyle = this.color
    c.lineWidth = this.radius
    c.moveTo(point.x,point.y)
    c.lineTo(this.x,this.y)
    c.stroke()
    c.fill()
    c.closePath()
  }
}

function randomIntFromRange(min,max){
  return Math.floor(Math.random() * (max - min + 1) + min)
}

//create a random color function 
function randomColor(color){
  return color[Math.floor(Math.random() * color.length)]
}

// Implementation
let particles
function init() {
  particles = []

  for (let i = 0; i < 100; i++) {
    const radius = (Math.random() * 2) + 1
    particles.push(new Particle(canvas.width / 2,canvas.height / 2,radius,randomColor(colors)))
  }

  console.log(particles)
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = 'rgba(255,255,255,0.05)'
  c.fillRect(0, 0, canvas.width, canvas.height)

  particles.forEach(Particle => {
    Particle.update()
  })
}

init()
animate()
