/*javascript for generating JSON from form input*/

// Find our form in the DOM using its class name.
const form = document.getElementByClassName('.contact-form')[0];

// Get the form data with our (yet to be defined) function.
const data = getFormDataAsJSON(form);

// Do something with the email address.
doSomething(data.email);


/**
 * A handler function to prevent default submission and run our custom script.
 * @param  {Event} event  the submit event triggered by the user
 * @return {void}
 */
const handleFormSubmit = event => {

  const form = document.getElementsByClassName('contact-form')[0];
  form.addEventListener('submit', handleFormSubmit);

  // Stop the form from submitting since we’re handling that with AJAX.
  event.preventDefault();

  // TODO: Call our function to get the form data.
  const data = {};

  // Demo only: print the form data onscreen as a formatted JSON object.
  const dataContainer = document.getElementsByClassName('results__display')[0];

  // Use `JSON.stringify()` to make the output valid, human-readable JSON.
  dataContainer.textContent = JSON.stringify(data, null, "  ");

  // ...this is where we’d actually do something with the form data...
};
