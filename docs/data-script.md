# data-script

## Overview

The `data-script` attribute allows you to define custom JavaScript code that returns a value to be used as the new
element content. This feature enables you to easily calculate values and show them to the user.

## Usage

To use data-script:

1. Add a `data-script` attribute to an element (e.g., a table cell) with the desired JavaScript code as its value
   e.g. `<td data-script="return 'test';" />`
2. When the app runs the script, it will execute the specified JavaScript and set the returned value as the new
   content for the corresponding cell.

## Best Practices

To ensure seamless integration and maximum flexibility, follow these guidelines:

- **Keep scripts concise:** Aim for simple, one-line scripts that return a single value or a small array.
  For more complex or repeatedly used scripts create a function in `/res/static/scrips/scripts.js` and call this function from `data-script`.
- **Test thoroughly:** Verify that your script works as expected by testing it with different input scenarios.

## Common Pitfalls

To avoid common issues:

- **Use quotes correctly:** Make sure to use single quotes (`'`) or double quotes (`"`) around string values in your
  script. This is crucial to avoid syntax errors.
- **Make shure your function returns a value:** If your function doesn't return the content will be empty. For calling other functions use `return function()`.
- **Be mindful of scope:** Scripts run within the context of the app, so ensure that any variables or functions
  you define are properly scoped to avoid conflicts.
- **Avoid blocking scripts:** Scripts should not block the execution of other code. Use `async` and `await`
  keywords to write non-blocking code.

## Troubleshooting

If issues arise:

- **Check syntax errors:** Verify that your script has no syntax errors by opening the JavaScript console in your
  browser's developer tools.
- **Inspect rendered content:** Check the innerHTML of the cell using the browser's developer tools to ensure the
  returned value is being set correctly.
