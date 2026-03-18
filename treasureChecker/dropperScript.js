function allowDrop(ev) {
  ev.preventDefault();
}

document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('dragstart', function(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  });
});

function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  const draggedElement = document.getElementById(data);

  const dropzone = ev.currentTarget;
  dropzone.appendChild(draggedElement);

  checkAnswer(data, dropzone.id);
}

function checkAnswer(draggedId, dropTargetId) {
    const feedback= document.getElementById('feedback');

    const answers= {
        item1: "dangerous",
        item2: "careful",
        item3: "dangerous",
        item4: "safe",
        item5: "safe",
        item6: "careful",
        item7: "dangerous",
        item8: "careful",
        item9: "safe"
    };

    if (answers[draggedId] === dropTargetId) {
        feedback.textContent = "Correct!";
        feedback.style.color = "green";
    } else {
        feedback.textContent = "Try Again!";
        feedback.style.color = "red";
    }
}