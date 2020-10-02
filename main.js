let idVar = 0
let addButton = document.querySelector('#add-button')
let addInput = document.querySelector('#add-item')
let listArea = document.querySelector('#items')
let listItem = ""
let elArray = []
let search = document.querySelector('#search_list')

document.addEventListener('DOMContentLoaded', () =>{
  if(!localStorage.getItem("elArray")){
    localStorage.setItem("elArray",JSON.stringify(elArray))
  }
  else{
    elArray = JSON.parse(localStorage.getItem("elArray"))
    elArray.forEach(addLi)
  }
})
addButton.addEventListener("click",addFunction)

function addFunction(){
  if(addInput.value.length > 0){
    addLi(addInput.value)
    elArray.push(addInput.value)
    localStorage.setItem("elArray",JSON.stringify(elArray))
    addInput.value = ""
  }
  else{
    alert("The input field is empty!")
  }
}

function addLi(value){
   let el = `<li class="item-type" id=${idVar}>${value}
  <button type="button" name="button" class="delButton"><i class="fa fa-times fa-2x" aria-hidden="false"></i></button>
   </li>`
   listArea.innerHTML += el
   idVar = idVar + 1
   hoverbutton()
   deleteItem()
}

function hoverbutton(){
  listItem = document.querySelectorAll(".item-type")
  listItem.forEach(el => {
    el.addEventListener("mouseover",() => el.lastElementChild.style.display = "block")
  })
  listItem.forEach(el => {
    el.addEventListener("mouseout",() => el.lastElementChild.style.display = "none")
  })

}

function deleteItem(){
  buttonArray = document.querySelectorAll(".delButton")
  buttonArray.forEach(el => {
    el.addEventListener("click",() => {
      search.value = ""
      parent = el.parentElement
      let index = parent.id
      elArray.splice(index,1)
      localStorage.setItem("elArray",JSON.stringify(elArray))
      idVar = 0
      listArea.innerHTML = ""
      elArray.forEach(addLi)
      alert("item is going to be deleted!")
    })
  })
}

search.addEventListener('keyup',() => {
  if(search.value.length > 0){
             searcher(search.value)
           }
  else{
    listArea.innerHTML = ""
    idVar = 0
    elArray.forEach(addLi)
  }

} );

function searcher(value){
  listArea.innerHTML = ""
  for(let i = 0; i< elArray.length; i++){
    let str = elArray[i]
    let regex = new RegExp(value,"i");
    if(str.match(regex) !== null){
      let el = `<li class="item-type" id=${i}>${str}
     <button type="button" name="button" class="delButton"><i class="fa fa-times fa-2x" aria-hidden="false"></i></button>
      </li>`
      listArea.innerHTML += el
      hoverbutton()
      deleteItem()
    }
  }
}

// function (event) {
//       if (event.keyCode === 13) {
//          if(search.value.length > 0){
//            searcher(search.value)
//          }
//         else{
//           alert("The input field is empty!")
//         }
//       }
//    }
