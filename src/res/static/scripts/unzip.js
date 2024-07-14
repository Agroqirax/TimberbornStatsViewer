document
  .getElementById("zipFileInput")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];

    if (file && file.name.endsWith(".timber")) {
      window.fileNameData = file.name;
      const reader = new FileReader();
      reader.onload = function (event) {
        const arrayBuffer = event.target.result;
        document.getElementById('spinner').style.display = 'block';
        processZip(arrayBuffer);
        //document.getElementById('spinner').style.display = 'none';
      };
      reader.readAsArrayBuffer(file);
    } else {
      console.error('File is not a .timber file');
      alert(translate('pleaseSelectTimber'));
    }
  });

function processZip(arrayBuffer) {
  const zip = new JSZip();

  zip.loadAsync(arrayBuffer).then(function (zip) {
    const fileStructure = {};

    zip.forEach(function (relativePath, zipEntry) {
      addToFileStructure(fileStructure, relativePath);

      // Check if the file is 'save_thumbnail.jpg'
      if (relativePath === "save_thumbnail.jpg") {
        zipEntry.async("base64").then(function (base64) {
          const imgElement = document.getElementById("thumbnail");
          imgElement.src = "data:image/jpeg;base64," + base64;
        });
      }
      // Check if the file is 'world.json'
      if (relativePath === "save_metadata.json") {
        zipEntry.async("string").then(function (content) {
          saveMetaJsonContent = content;
          window.saveMetaData = JSON.parse(saveMetaJsonContent);
        });
      }
      // Check if the file is 'world.json'
      if (relativePath === "world.json") {
        zipEntry.async("string").then(function (content) {
          worldJsonContent = content;
          window.worldData = JSON.parse(worldJsonContent);
          console.log("world.json content:", worldData);
          calcDataScript();
          document.getElementById('spinner').style.display = 'none';
        });
      }
    });

    console.log(fileStructure);
  });
}

function addToFileStructure(fileStructure, relativePath) {
  const parts = relativePath.split("/");
  let current = fileStructure;

  parts.forEach((part, index) => {
    if (index === parts.length - 1) {
      current[part] = "file";
    } else {
      current = current[part] = current[part] || {};
    }
  });
}
