let addBtn = document.querySelector(".add_btn-container");
let headerContainer = document.querySelector(".header-container")
let flag = true;

let listDB = {};
let currentListObj;

function loadData(flag){
    let ul = document.querySelector("ul")
    console.log("12 ", listDB);
    let keyArr = Object.keys(listDB)
    for(let i=0; i<keyArr.length; i++){
        let key = keyArr[i];
        if(listDB[key].isCompleted == flag){
            let {id, value} = listDB[key];
            let liElem = document.createElement("li");
            liElem.setAttribute("id", id);
            liElem.innerHTML = `<input type="checkbox" name="checkbox" id="checkbox-input">
                <p class="list-content" contenteditable="true">${value}</p>
                <button class="delete-btn">X</button>`
            
            let checkbox = liElem.querySelector("#checkbox-input")
            if(flag){
                checkbox.setAttribute("checked", "checked");
            }else{
                checkbox.removeAttribute("checked");
            }
            ul.appendChild(liElem);

            handleChange(liElem);
            handleDelete(liElem);
            handleCheck(liElem);
        }
    }
}

headerContainer.addEventListener("click", function(e){
    if(e.target.innerText == "Tasks List" && flag == false){
        e.target.nextElementSibling.classList.remove("active");
        e.target.classList.add("active");
        let allLi = document.querySelectorAll("li");
        for(let i=0; i<allLi.length; i++){
            allLi[i].remove();
        }
        loadData(false);
        flag = true;
    }else if(e.target.innerText == "Completed" && flag == true){
        e.target.previousElementSibling.classList.remove("active");
        e.target.classList.add("active");
        let allLi = document.querySelectorAll("li");
        for(let i=0; i<allLi.length; i++){
            allLi[i].remove();
        }
        loadData(true);
        flag =false;
    }
})


addBtn.addEventListener("click", function(){
    let ul = document.querySelector("ul");
    let id = uid();

    let liElem = document.createElement("li");
    liElem.setAttribute("id", id);
    liElem.innerHTML = `<input type="checkbox" name="checkbox" id="checkbox-input">
        <p class="list-content" contenteditable="true"></p>
        <button class="delete-btn">X</button>`

    ul.appendChild(liElem);

    createListObj(id);
    currentListObj = listDB[id];

    liElem.addEventListener("click", makeMeActive);

    handleChange(liElem);
    handleDelete(liElem);
    handleCheck(liElem);
})

function createListObj(id){
    let newListObj = {
        id: id,
        value: "",
        isCompleted: false
    }

    listDB[id] = newListObj;
}

function makeMeActive(e){
    let cid = e.currentTarget.getAttribute("id");
    currentListObj = listDB[cid];
}

function handleChange(liElem){
    let pTag = liElem.querySelector("p");
    pTag.addEventListener("keyup", function(){
        currentListObj.value = pTag.innerText;
    })
}

function handleDelete(liElem){
    let deleteBtn = liElem.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", function(){
        let cid = liElem.getAttribute("id");
        let asArray = Object.entries(listDB);
        let filteredArr = asArray.filter(([key, value]) => key !== cid);
        listDB = Object.fromEntries(filteredArr)
        liElem.remove();
    })
}

function handleCheck(liElem){
    let checkbox = liElem.querySelector("#checkbox-input");
    checkbox.addEventListener("change", function(){
        let cid = liElem.getAttribute("id");
        currentListObj = listDB[cid];

        if(checkbox.checked == true){
            currentListObj.isCompleted = true;
        }else{
            currentListObj.isCompleted = false;
        }

        let li = checkbox.parentNode;
        li.parentNode.removeChild(li);
    })
}