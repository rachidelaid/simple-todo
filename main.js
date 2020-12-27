//get data from local storage
const data = JSON.parse(localStorage.getItem("todoList"));
const todoList = data == null ? [] : data;
renderList();

//add button click listener
const addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", () => {
  addTodo();
});
document.querySelector("input").addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    addTodo();
  }
});
function addTodo() {
  const todo = document.querySelector("input").value.trim();
  console.log(todo);
  if (todo == "") {
    return;
  }

  todoList.push({
    content: todo,
    done: false,
  });
  renderList();

  document.querySelector("input").value = "";
}

//render list function
function renderList() {
  document.querySelector(".doing").innerHTML = "";
  document.querySelector(".done").innerHTML = "";

  //updating local storage
  localStorage.setItem("todoList", JSON.stringify(todoList));

  for (let i = 0; i < todoList.length; i++) {
    const element = todoList[i];

    if (!element.done) {
      const div = document.createElement("div");
      div.innerHTML = `<svg class="check" style="width:24px;height:24px" viewBox="0 0 24 24">
        <path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
    </svg>
    <p>${element.content}</p>
    <svg class="dell" style="width:24px;height:24px" viewBox="0 0 24 24">
        <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
    </svg>`;

      document.querySelector(".doing").appendChild(div);
      //mark as done
      div.querySelector("svg.check").addEventListener("click", (e) => {
        for (let j = 0; j < todoList.length; j++) {
          const elm = todoList[j];
          if (
            elm.content === e.target.parentNode.querySelector("p").innerText
          ) {
            todoList[j].done = true;
            renderList();
          }
        }
      });

      //delete todo
      div.querySelector("svg.dell").addEventListener("click", (e) => {
        for (let x = 0; x < todoList.length; x++) {
          const elm = todoList[x];
          if (e.target.parentNode.tagName == "svg") {
            if (
              elm.content ===
              e.target.parentNode.parentNode.querySelector("p").innerText
            ) {
              todoList.splice(x, 1);
              renderList();
            }
          } else {
            if (
              elm.content === e.target.parentNode.querySelector("p").innerText
            ) {
              todoList.splice(x, 1);
              renderList();
            }
          }
        }
      });
    } else {
      const div = document.createElement("div");
      div.innerHTML = `
    <p>${element.content}</p>
    <svg class="dell" style="width:24px;height:24px" viewBox="0 0 24 24">
        <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
    </svg>`;

      document.querySelector(".done").appendChild(div);

      //delete todo
      div.querySelector("svg.dell").addEventListener("click", (e) => {
        for (let j = 0; j < todoList.length; j++) {
          const elm = todoList[j];
          if (e.target.parentNode.tagName == "svg") {
            if (
              elm.content ===
              e.target.parentNode.parentNode.querySelector("p").innerText
            ) {
              todoList.splice(j, 1);
              renderList();
            }
          } else {
            if (
              elm.content === e.target.parentNode.querySelector("p").innerText
            ) {
              todoList.splice(j, 1);
              renderList();
            }
          }
        }
      });
    }
  }
}

//show In Progress tab
document.querySelector(".prog").addEventListener("click", () => {
  document.querySelector(".doneH").className = "doneH";
  document.querySelector(".done").style.display = "none";

  document.querySelector(".prog").className = "prog active";
  document.querySelector(".doing").style.display = "block";
});

//show Done tab
document.querySelector(".doneH").addEventListener("click", () => {
  document.querySelector(".prog").className = "prog";
  document.querySelector(".doing").style.display = "none";

  document.querySelector(".doneH").className = "doneH active";
  document.querySelector(".done").style.display = "block";
});
