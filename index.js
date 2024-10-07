const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const tasks = []

const menu = () => {
  console.log('=======================')
  console.log('    Lista de Tareas    ')
  console.log('=======================')
  console.log('1: Agergar Tarea')
  console.log('2: Listar tareas')
  console.log('3: Actualizar Tareas')
  console.log('4: Eliminar Tareas')
  console.log('5: Salir')

  rl.question('Selecciona una opcion: ', (option) => {
    switch (option) {
      case '1':
        addTask()
        break

      case '2':
        listTasks()
        break

      case '5':
        console.log('nos vemos!!!')
        rl.close()
        break

      default:
        console.log('opcion invalida')
        menu()
        break
    }
  })
}

const addTask = () => {
  rl.question('ingrese su tarea:\n', (task) => {
    tasks.push(task)
    console.log('tarea agregada correctamente')
    menu()
  })
}

const listTasks = () => {
  console.log('Tareas Pendientes:')
  tasks.forEach((task, i) => console.log(`${i + 1}: ${task}`))
  menu()
}

menu()
