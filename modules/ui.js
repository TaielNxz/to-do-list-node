const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// Mostrar menú
const showMenu = () => {
  console.clear()
  console.log('=======================')
  console.log('    Lista de Tareas    ')
  console.log('=======================')
  console.log('1: Agregar Tarea')
  console.log('2: Listar Tareas')
  console.log('3: Actualizar Tareas')
  console.log('4: Eliminar Tareas')
  console.log('5: Salir')
}

// Mostrar la lista de tareas
const showTasks = (tasks) => {
  if (tasks.length === 0) {
    console.log('No hay tareas pendientes')
    return
  }

  console.log('Tareas Pendientes:')
  tasks.forEach((task, i) => console.log(`${i + 1}: ${task}`))
}

// Mostrar un mensaje y ejecutar una callback opcional
const showMessage = (message, callback) => {
  console.log(`\n${message}`)
  rl.question('Presiona Enter para continuar...', () => {
    if (callback) callback()
  })
}

module.exports = {
  rl,
  showMenu,
  showTasks,
  showMessage
}
