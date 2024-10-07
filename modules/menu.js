const { rl, showMessage, showMenu } = require('./ui')
const { addTask, listTasks, updateTask, deleteTask } = require('./tasksOperations')

const menu = () => {
  showMenu()

  rl.question('Selecciona una opcion: ', (option) => {
    switch (option) {
      case '1':
        addTask(menu)
        break

      case '2':
        listTasks(menu)
        break

      case '3':
        updateTask(menu)
        break

      case '4':
        deleteTask(menu)
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

module.exports = {
  menu
}
