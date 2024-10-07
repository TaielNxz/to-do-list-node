const { rl, showTasks, showMessage } = require('./ui')
const { loadTasks, saveTasks } = require('./tasks')

// Inicializar las tareas
// eslint-disable-next-line prefer-const
let tasks = loadTasks()

const addTask = (menu) => {
  console.clear()
  rl.question('ingrese su tarea: ', (task) => {
    const trimmedTask = task.trim()
    if (trimmedTask === '') {
      showMessage('La tarea no puede estar vacía...', addTask(menu))
      return
    }

    tasks.push(trimmedTask)
    saveTasks(tasks)
    showMessage('tarea agregada correctamente...', menu)
  })
}

const listTasks = (menu) => {
  console.clear()
  showTasks(tasks)
  showMessage('', menu)
}

const updateTask = (menu) => {
  console.clear()
  showTasks(tasks)

  rl.question('ingrese tarea a modificar: ', (taskPos) => {
    const index = parseInt(taskPos, 10) - 1

    if (isNaN(index) || index < 0 || index >= tasks.length) {
      showMessage('\nNúmero de tarea inválido...', () => updateTask(menu)) // () => updateTask(menu) "evitar que se ejecute inmediatamente"
      return
    }

    console.clear()
    console.log(`Descripcion vieja: ${tasks[index]}`)

    rl.question('Descripcion nueva: ', (newTask) => {
      const trimmedNewTask = newTask.trim()
      if (trimmedNewTask === '') {
        showMessage('La descripcion no puede estar vacia, intente nuevamente...', () => updateTask(menu))
        return
      }

      tasks[index] = trimmedNewTask
      saveTasks(tasks)
      showMessage('tarea actualizada...', menu)
    })
  })
}

const deleteTask = (menu) => {
  console.clear()
  showTasks(tasks)

  rl.question('ingrese tarea a eliminar: ', (taskPos) => {
    const index = parseInt(taskPos, 10) - 1

    if (isNaN(index) || index < 0 || index >= tasks.length) {
      showMessage('\nNúmero de tarea inválido...', () => deleteTask(menu)) // () => deleteTask(menu) "evitar que se ejecute inmediatamente"
      return
    }

    console.clear()
    rl.question(`¿Estás seguro de eliminar la tarea "${tasks[index]}"? (si): `, (confirm) => {
      if (confirm.toLowerCase().trim() === 'si') {
        tasks.splice(index, 1)
        saveTasks(tasks)
        showMessage('Tarea eliminada...', menu)
      } else {
        showMessage('Operación cancelada...', menu)
      }
    })
  })
}

module.exports = {
  addTask,
  listTasks,
  updateTask,
  deleteTask
}
