document.addEventListener("DOMContentLoaded", function() {
  const inputSection = document.getElementById("input");
  const zipFileInput = document.getElementById("zipFileInput");

  inputSection.addEventListener("dragover", handleDragOver);
  inputSection.addEventListener("drop", handleFileDrop);
  inputSection.addEventListener("dragleave", handleDragLeave);

  function handleDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    inputSection.classList.add("dragover");
  }

  function handleDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    inputSection.classList.remove("dragover");
  }

  function handleFileDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    inputSection.classList.remove("dragover");

    const files = event.dataTransfer.files;
    if (files.length > 0 && files[0].name.endsWith(".timber")) {
      const file = files[0];
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      zipFileInput.files = dataTransfer.files;

      // Optionally, you can trigger a change event to handle any additional logic when the file is selected.
      const event = new Event('change', {
        bubbles: true,
        cancelable: true
      });
      zipFileInput.dispatchEvent(event);
    } else {
      alert(translate('pleaseSelectTimber'));
    }
  }
});
