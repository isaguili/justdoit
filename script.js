//variáveis
const html = document.querySelector("html")

const form = document.querySelector("form")
const taskInput = document.getElementById("task-input") 
const resetButton = document.getElementById("reset-btn")

const tasksList = document.querySelector("#tasks")

const deleteMsg = document.querySelector("#deleteMsg")
const deleteMsgBnt = document.querySelector("#deleteMsg :last-child")

const toggleBtn = document.getElementById("toggle-mode")
const toggleBtnImg = document.querySelector("#toggle-mode img")

//events
toggleBtn.addEventListener("click", () => {
  html.classList.toggle("dark-mode")
  
  const regex = /moon/
  const isDark = regex.test(toggleBtnImg.src)

  isDarkMode(isDark)
})

form.addEventListener("submit", (event) => {
  event.preventDefault()

  try {
    createNewItem()
  } catch (error) {
    alert(error.message)
  }
  
  resetInput()
})

tasksList.addEventListener("click", (event) => {
  const element = event.target
  const isCheckbox = element.classList.contains('checkbox')
  const isDeleteIcon = element.classList.contains('delete-btn')
  
  checkedOnOff(isCheckbox, element)
  deleteTask(isDeleteIcon, element)
})

deleteMsgBnt.addEventListener("click", () => {
  deleteMsg.classList.add("hide-msg")
})

resetButton.addEventListener("click", () => {
  const check = confirm("Tem certeza que deseja apagar todas as tarefas?")

  if(check){
    tasksList.innerHTML = ''
  }
})

//functions

function isDarkMode(test) {
  if (test) {
    toggleBtnImg.src = toggleBtnImg.src.replace("moon", "sun")
  } else {
    toggleBtnImg.src = toggleBtnImg.src.replace("sun", "moon")
  }
}

function createNewItem(){
  const newItem = document.createElement("li")
  
  newItem.innerHTML = `
    <img src="assets/icons/checkbox-default.svg" alt="checkbox" class="checkbox">
    <span> ${taskInput.value} </span>
    <img src="assets/icons/delete.svg" alt="excluir item" class="delete-btn" title="Deleta o item criado.">
  `
  newItem.setAttribute("class", "item")

  if(checkInputEmpty()) {
    throw new Error("Não é possível adicionar um item vazio.")
  } else tasksList.append(newItem) 
}

function checkInputEmpty() { 
  const value = taskInput.value 
  const isEmpty = value.trim() === ""
  return isEmpty
}

function resetInput() {
  taskInput.value = ""
}

function checkedOnOff(isCheckbox, element) {
  if (isCheckbox) {
    const regex = /default/
    const isDefault = regex.test(element.src)
    const textSpan = element.nextElementSibling

    if(isDefault){
      element.src = element.src.replace("default", "selected")
      textSpan.classList.add("checked")
    } else {
      element.src = element.src.replace("selected", "default")
      textSpan.classList.remove("checked")
    }
  }
}

function deleteTask(isDeleteIcon, element){
  if(isDeleteIcon) {
    element.parentNode.remove()
    showDeleteMsg()
  }
}

function showDeleteMsg() {
  deleteMsg.classList.remove("hide-msg")
  deleteMsg.classList.add("appear-msg")
  
  setTimeout(() => {
    deleteMsg.classList.add("hide-msg")
  }, 3000)
}

