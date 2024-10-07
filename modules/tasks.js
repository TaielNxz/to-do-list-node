const fs = require('fs')
const path = require('path')

// Ruta del archivo donde se almacenarán las tareas
const TASKS_FILE = path.join(__dirname, '..', 'tasks.json')

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

// Funcion para guardar las tareas en el archivo JSON
const saveTasks = (tasks) => {
  try {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2))
  } catch (error) {
    console.error('Error al guardar las tareas:', error)
  }
}

module.exports = {
  loadTasks,
  saveTasks
}
