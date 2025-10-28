document.addEventListener("DOMContentLoaded", function () {
  const saveBtn = document.getElementById("save-btn"); // DOM SELECTI0N
  const subjectInput = document.getElementById("subject-input"); // DOM SELECTI0N
  const titleInput = document.getElementById("title-input"); // DOM SELECTI0N
  const dateInput = document.getElementById("date-input"); // DOM SELECTI0N
  const container = document.querySelector(".card");// DOM SELECTI0N

  // Load data dari localStorage saat halaman dimuat
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach((task) => {
    createTaskCard(task.subject, task.title, task.date, task.done);
  });

  saveBtn.addEventListener("click", function () {
    const subject = subjectInput.value.trim();
    const title = titleInput.value.trim();
    const date = dateInput.value.trim();

    if (!subject || !title || !date) {
      alert("Semua kolom harus diisi!");
      return;
    }

    const newTask = {
      subject,
      title,
      date,
      done: false
    };

    savedTasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
    createTaskCard(subject, title, date, false);

    // mengosongkan data saat kita klik simpan
    subjectInput.value = "";
    titleInput.value = "";
    dateInput.value = "";
  });

  function createTaskCard(subject, title, date, isDone) {
    const taskCard = document.createElement("div"); // DOM SELECTI0N
    taskCard.className = "task-card";

    taskCard.innerHTML = `
      <input type="checkbox" style="margin-left:-17em; margin-top:3em; position:relative; top:-1em; height:2em; " ${isDone ? "checked" : ""} />
      <div class="header1 subject-text">${subject}</div>
      <div class="content">
        <span class="task-title">${title}</span>
      </div>
      <div class="footer date-text">Due Date : ${date}</div>
      <button class="delete-btn">🗑<br/>Hapus</button>
    `;

    container.appendChild(taskCard); // DOM SELECTI0N

    const checkbox = taskCard.querySelector("input[type='checkbox']"); // DOM SELECTI0N
    const deleteBtn = taskCard.querySelector(".delete-btn"); // DOM SELECTI0N
    const subjectText = taskCard.querySelector(".subject-text"); // DOM SELECTI0N
    const taskTitle = taskCard.querySelector(".task-title"); // DOM SELECTI0N
    const dateText = taskCard.querySelector(".date-text"); // DOM SELECTI0N

    function updateDoneState(done) {
      if (done) {
        subjectText.classList.add("done");
        taskTitle.classList.add("done");
        dateText.classList.add("done");

        let status = document.createElement("span"); // DOM SELECTI0N
        status.className = "status";
        status.textContent = "Selesai";
        status.style.backgroundColor = "green";
        status.style.color = "white";
        status.style.padding = "3px 7px";
        status.style.marginLeft = "10px";
        status.style.borderRadius = "5px";
        taskCard.querySelector(".content").appendChild(status);
      } else {
        subjectText.classList.remove("done");
        taskTitle.classList.remove("done");
        dateText.classList.remove("done");

        const status = taskCard.querySelector(".status"); // DOM SELECTI0N
        if (status) status.remove();
      }
    }

    updateDoneState(isDone);

    checkbox.addEventListener("change", function () {
      const index = getTaskIndex(subject, title, date);
      if (index !== -1) {
        savedTasks[index].done = checkbox.checked;
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
        updateDoneState(checkbox.checked);
      }
    });

    deleteBtn.addEventListener("click", function () {
      const index = getTaskIndex(subject, title, date);
      if (index !== -1) {
        savedTasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
      }
      taskCard.remove();
    });
  }

  // Fungsi bantu untuk cari task berdasarkan data
  function getTaskIndex(subject, title, date) {
    return savedTasks.findIndex(
      (task) => task.subject === subject && task.title === title && task.date === date
    );
  }
});
