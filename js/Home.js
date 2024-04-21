import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getDatabase, ref, push, onValue} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'
const appSettings = {
  databaseURL: "https://sigma-rule-34f84-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const taskListDB = ref(database, "sigma")
const titleEl = document.getElementById('title-el')
const detailEl = document.getElementById('detail-el')
const closeBtn = document.getElementById('close-btn')
const modalEl = document.getElementById('modal')

onValue(taskListDB, function(snapshot) {
        let itemsArray = Object.entries(snapshot.val())
        const random = Math.floor(Math.random() * itemsArray.length)
        console.log(itemsArray[random])

        appendItem(itemsArray[random])

  })

  function appendItem(item) {
    let itemID = item[0]
    let itemValue = item[1]

    titleEl.append(itemID)
    detailEl.append(itemValue)
  }

  closeBtn.addEventListener('click',function(){
    modalEl.style.display = 'none'
  })

  setTimeout(function(){
    closeBtn.style.display = 'inline'
  }, 3000)
