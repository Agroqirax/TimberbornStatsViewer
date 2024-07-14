document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "s") {
    // Prevent the Save dialog to open
    e.preventDefault();
    
    /*if (confirm(translate('exportPrompt') + '?')) {
      exportTimber();
    }*/
  }
});

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "e") {
    // Prevent the Save dialog to open
    e.preventDefault();
    
    /*if (confirm(translate('exportPrompt') + '?')) {
      exportTimber();
    }*/
  }
});

async function exportTimber() {
  alert(translate('exportAlert'));
  const saveMetaData = window.saveMetaData;
  const worldData = window.worldData;
  const fileNameData = window.fileNameData;
  const gameVersion = worldData["GameVersion"];
  const imgThumbnail = document.querySelector("#thumbnail").src;

  const zip = new JSZip();

  // Create the JSON files and add them to the zip
  zip.file("save_metadata.json", JSON.stringify(saveMetaData, null, 2));
  zip.file("world.json", JSON.stringify(worldData, null, 2));

  // Create the save_thumbnail file
  const thumbnailBlob = await fetch(imgThumbnail).then((res) => res.blob());
  zip.file("save_thumbnail", thumbnailBlob);

  // Create the version.txt file
  zip.file("version.txt", gameVersion);

  // Generate the zip file and trigger download
  zip.generateAsync({ type: "blob" }).then(function (content) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(content);
    a.download = fileNameData;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
  console.log("Done exporting");
}

function alertInstall() {
  alert(translate('alertInstall'));
}