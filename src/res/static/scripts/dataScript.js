function calcDataScript() {
  const elements = document.querySelectorAll("[data-script]");

  elements.forEach((element, index) => {
    try {
      const scriptContent = element.getAttribute("data-script");

      const dynamicFunction = new Function(scriptContent);

      const returnValue = dynamicFunction();

      if (returnValue || returnValue == 0) {
        element.textContent = returnValue;
      }
    } catch (error) {
      element.textContent =
        properties["app"]["debug"]["messages"]["dataScriptError"] || "#ERROR";
      element.title = error;
      element.style.color = "var(--danger)";

      if (properties["app"]["debug"]["enabled"] == true) {
        const scriptContent = element.getAttribute("data-script");
        console.error(
          `Error executing script for element at index ${index}:`,
          error,
          `Failed script content:`,
          scriptContent
        );
      } else {
        console.error(
          `Error executing script for element at index ${index}:`,
          error
        );
      }
    }
  });
}
