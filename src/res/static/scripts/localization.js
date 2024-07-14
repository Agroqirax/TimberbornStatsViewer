let translations = {};
let preferredLanguage = "en";

// Function to get user's preferred language code
function getUserPreferredLanguage() {
  const language = navigator.language || navigator.userLanguage || "en";
  return language.split("-")[0]; // Return only the language code (e.g., 'en' from 'en-US')
}

// Function to load translations
async function loadTranslations() {
  // List of supported languages
  const supportedLanguages = properties["app"]["lang.supported"];

  // Get user's preferred language code
  preferredLanguage = getUserPreferredLanguage();

  // Check if the language code is in the supported languages array, if not set to 'en'
  if (!supportedLanguages.includes(preferredLanguage)) {
    preferredLanguage = "en";
  }

  // Construct the path to the JSON file for the language
  const jsonPath = `res/static/l10n/${preferredLanguage}.json`;

  try {
    // Fetch the JSON file
    const response = await fetch(jsonPath);

    // Parse the JSON file
    translations = await response.json();
  } catch (error) {
    console.error("Error fetching translation:", error);
  }
}

// Synchronous function to get translation
function translate(keyword) {
  return translations[keyword] || keyword;
}

// Function to translate elements
function translateElements() {
  // Get all elements with data-translate attribute
  const elements = document.querySelectorAll("[data-translate]");

  // Loop over each element
  elements.forEach((element) => {
    // Get the translation key from the data-translate attribute
    const key = element.getAttribute("data-translate");

    // Get the translation for the key
    const translation = translate(key);

    // Set the innerHTML of the element to the translation
    element.innerHTML = translation;
  });
}

// Ensure the DOM is fully loaded before running the translation function
document.addEventListener("DOMContentLoaded", async () => {
  // Construct the path to the JSON file for the language
  const propertiesPath = `res/static/properties.json`;

  try {
    // Fetch the JSON file
    const response = await fetch(propertiesPath);

    // Parse the JSON file
    window.properties = await response.json();
  } catch (error) {
    console.error("Error fetching properties:", error);
  }
  
  await loadTranslations();
  translateElements();
  // open filedialog (not permitted in modern browsers)
  // document.getElementById('zipFileInput').click();
});
