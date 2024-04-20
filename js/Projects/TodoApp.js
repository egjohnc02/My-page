import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getDatabase, ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'
const appSettings = {
  databaseURL: "https://todoapp-ea736-default-rtdb.asia-southeast1.firebasedatabase.app/"
}


const app = initializeApp(appSettings)
const database = getDatabase(app)

const currentDay = getDayAsString(new Date())

const taskListDB = ref(database, currentDay)

const headTitle = document.getElementById("heading-title")
const inputTaskEl = document.getElementById("input-task")
const addButton = document.getElementById("add-button")
const tableBodyEl = document.getElementById("data-row")

headTitle.innerHTML = `Today is <important>${currentDay}</important>`

addButton.addEventListener("click", function() {
  let inputTask = inputTaskEl.value
  push(taskListDB, inputTask)
  clearInputEl()
  addDeleteColumn()
})

onValue(taskListDB, function(snapshot) {
  if(snapshot.exists()){
      let itemsArray = Object.entries(snapshot.val())

      clearTaskListEl()

      for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i];
      let currentItemID = currentItem[0]
      let currentItemValue = currentItem[1]

      appendItem(currentItem)
  }
  }else{
    tableBodyEl.innerHTML=`Empty task...`
  }
})

function getDayAsString(date) {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayIndex = date.getDay();
  return daysOfWeek[dayIndex];
}



function clearTaskListEl() {
  tableBodyEl.innerHTML = ""
}

function clearInputEl(){
  inputTaskEl.value=""
}

function appendItem(item) {
  let itemID = item[0]
  let itemValue = item[1]

  let newRow = document.createElement("tr")
  let newTask = document.createElement("td")
  let delRow = document.createElement("td")

  newTask.textContent = itemValue
  delRow.textContent = '❌'

  newTask.addEventListener('dblclick', function(){
    newTask.classList.toggle('done-a-task')
  })

  delRow.addEventListener('click', function(){
    let takeID = ref(database, `${currentDay}/${itemID}`)
    remove(takeID)
  })

  tableBodyEl.append(newRow, newTask, delRow)
}