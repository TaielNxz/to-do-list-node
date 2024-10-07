const readline = require('readline')
const fs = require('fs')
const path = require('path')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// Ruta del archivo donde se almacenarán las tareas
const TASKS_FILE = path.join(__dirname, 'tasks.json')

// Función para cargar tareas desde el archivo JSON
const loadTasks = () => {
  try {
    if (fs.existsSync(TASKS_FILE)) {
      const data = fs.readFileSync(TASKS_FILE, 'utf-8')
      return JSON.parse(data)
    } else {
      return []
    }
  } catch (error) {
    console.error('Error al cargar las tareas:', error)
    return []
  }
}

// Funcion para guardar tarea
const saveTasks = (tasks) => {
  try {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2))
  } catch (error) {
    console.error('Error al guardar las tareas:', error)
  }
}

// Inicializar las tareas
// eslint-disable-next-line prefer-const
let tasks = loadTasks()

const menu = () => {
  console.clear()
  console.log('=======================')
  console.log('    Lista de Tareas    ')
  console.log('=======================')
  console.log('1: Agergar Tarea')
  console.log('2: Listar tareas')
  console.log('3: Actualizar Tareas')
  console.log('4: Eliminar Tareas')
  console.log('5: Salir')

  rl.question('Selecciona una opcion: ', (option) => {
    console.clear()

    switch (option) {
      case '1':
        addTask()
        break

      case '2':
        listTasks()
        break

      case '3':
        updateTask()
        break

      case '4':
        deleteTask()
        break

      case '5':
        console.log('nos vemos!!!')
        rl.close()
        break

      default:
        showMessage('opcion invalida...')
        break
    }
  })
}

const addTask = () => {
  rl.question('ingrese su tarea: ', (task) => {
    tasks.push(task)
    saveTasks(tasks)
    showMessage('tarea agregada correctamente...', menu)
  })
}

const listTasks = () => {
  showTasks()
  showMessage('', menu)
}

const updateTask = () => {
  showTasks()

  rl.question('ingrese tarea a modificar: ', (taskPos) => {
    const index = parseInt(taskPos, 10) - 1

    if (isNaN(index) || index < 0 || index >= tasks.length) {
      showMessage('\nNúmero de tarea inválido...', updateTask)
      return
    }

    console.clear()

    console.log(`descripcion vieja: ${tasks[index]}`)

    rl.question('descripcion nueva: ', (newTask) => {
      tasks[index] = newTask
      saveTasks(tasks)
      showMessage('tarea actualizada...', menu)
    })
  })
}

const deleteTask = () => {
  showTasks()

  rl.question('ingrese tarea a eliminar: ', (taskPos) => {
    const index = parseInt(taskPos, 10) - 1

    if (isNaN(index) || index < 0 || index >= tasks.length) {
      showMessage('\nNúmero de tarea inválido...', deleteTask)
      return
    }

    console.clear()

    tasks.splice(index, 1)

    saveTasks(tasks)

    showMessage('tarea elimnada...', menu)
  })
}

const showTasks = () => {
  // verificar si hay tareas pendientes
  if (tasks.length === 0) {
    showMessage('no hay tareas pendientes', menu)
  }

  // mostrar listado de tareas
  console.log('Tareas Pendientes:')
  tasks.forEach((task, i) => console.log(`${i + 1}: ${task}`))
}

const showMessage = (message, callback) => {
  console.log(`\n${message}`)
  rl.question('Presiona Enter para continuar...', () => {
    if (callback) callback()
  })
}

menu()
