let todos = [];

// Sélection des éléments & définition des variables
const toDoForm = document.querySelector(".box__main--content");
const inputTask = document.querySelector("#boxInput");

// récupérer une tâche sauvegardée
window.addEventListener("load", () => {
  const item = localStorage.getItem("todos");

  if (item) {
    todos = JSON.parse(item);
  }

  showTask(todos);

  // Ajout événement submit
  toDoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    addTask();
  });
});

// créer une tâche
function addTask() {
  if (inputTask.value !== null) {
    if (!todos) {
      todos = [];
    }

    const toDoInfo = {
      texte: inputTask.value,
      valider: false,
      createdAt: Date.now(),
    };

    todos.push(toDoInfo);

    localStorage.setItem("todos", JSON.stringify(todos));
    inputTask.value = "";
  } else {
    alert("Ecrivez une tâche ");
  }
  showTask(todos);
}

// Afficher une tâche
function showTask(todos) {
  const taskToDo = document.querySelector(".liste");
  taskToDo.innerHTML = "";
  if (todos) {
    todos.forEach((todo) => {
      const taskItem = document.createElement("div");
      taskItem.classList.add("listeItem");

      const label = document.createElement("label");
      const input = document.createElement("input");
      const contenu = document.createElement("div");
      contenu.classList.add("listeDetail");
      const options = document.createElement("div");
      options.classList.add("options");
      const btnModifier = document.createElement("button");
      btnModifier.classList.add("modifier");
      const btnSupprimer = document.createElement("button");
      btnSupprimer.classList.add("supprimer");

      input.type = "checkbox";
      input.checked = todo.valider;
      // console.log(todos);

      contenu.innerHTML = `<input type="text" value="${todo.texte}" readonly >`;
      btnModifier.innerHTML = "Modifier";
      btnSupprimer.innerHTML = "Supprimer";
      // console.log(contenu.firstChild.innerHTML);
      label.appendChild(input);
      options.appendChild(btnModifier);
      options.appendChild(btnSupprimer);
      taskItem.appendChild(label);
      taskItem.appendChild(contenu);
      taskItem.appendChild(options);

      taskToDo.appendChild(taskItem);

      if (todo.valider) {
        taskItem.classList.add("valider");
      }

      input.addEventListener("click", (e) => {
        todo.valider = e.target.checked;
        localStorage.setItem("todos", JSON.stringify(todos));

        if (todo.valider) {
          taskItem.classList.add("valider");
        } else {
          taskItem.classList.remove("valider");
        }
      });

      btnModifier.addEventListener("click", () => {
        const input = contenu.firstChild;
        todo.texte = "";
        if (btnModifier.innerText === "Modifier") {
          input.removeAttribute("readonly");
          input.focus();
          btnModifier.innerText = "Enregistrer";
        } else {
          input.setAttribute("readonly", "readonly");

          btnModifier.innerText = "Modifier";
          todo.texte = input.value;
          localStorage.setItem("todos", JSON.stringify(todos));
        }
      });

      btnSupprimer.addEventListener("click", () => {
        taskDelete(todo, taskItem);
      });
    });
  }
  function taskDelete(todo, taskItem) {
    const index = todos.indexOf(todo);
    todos.splice(index, 1);
    localStorage.todos = JSON.stringify(todos);
    taskItem && taskItem.remove();
  }
}
