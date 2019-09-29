/*javascript for generating JSON from form input*/

/**
 * Retrieves input data from a form and returns it as a JSON object.
 * @param  {HTMLFormControlsCollection} elements  the form elements
 * @return {Object}                               form data as an object literal
 */

 // const formToJSON_deconstructed = elements => {
 //
 //   // This is the function that is called on each element of the array.
 //   const reducerFunction = (data, element) => {
 //
 //     // Add the current field to the object.
 //     data[element.name] = element.value;
 //
 //     // For the demo only: show each step in the reducer’s progress.
 //     console.log(JSON.stringify(data));
 //
 //     return data;
 //   };
 //
 //   // This is used as the initial value of `data` in `reducerFunction()`.
 //   const reducerInitialValue = {};
 //
 //   // To help visualize what happens, log the inital value.
 //   console.log('Initial `data` value:', JSON.stringify(reducerInitialValue));
 //
 //   // Now we reduce by `call`-ing `Array.prototype.reduce()` on `elements`.
 //   const formData = [].reduce.call(elements, reducerFunction, reducerInitialValue);
 //
 //   // The result is then returned for use elsewhere.
 //   return formData;
 // };

// const formToJSON = elements => [].reduce.call(elements, (data, element) => {
//
//   data[element.name] = element.value;
//   return data;
//
// }, {});

const isValidElement = element => {
  return element.name && element.value;
};

const formToJSON = elements => [].reduce.call(elements, (data, element) => {

  // Make sure the element has the required properties.
  if (isValidElement(element)) {
    data[element.name] = element.value;
  }

  return data;
}, {});


//
//
// const formToJSON = elements => {
//
// // This is the function that is called on each element of the array.
// const reducerFunction = (data, element) => {
//
//   // Add the current field to the object.
//   data[element.name] = element.value;
//
//   // For the demo only: show each step in the reducer’s progress.
//   console.log(JSON.stringify(data));
//
//   return data;
// };


/**
 * A handler function to prevent default submission and run our custom script.
 * @param  {Event} event  the submit event triggered by the user
 * @return {void}
 */
const handleFormSubmit = event => {

  // Stop the form from submitting since we’re handling that with AJAX.
  event.preventDefault();

  const data = formToJSON(form.elements);
  // const data = {"key": "value", "next-version": "will populate from the form"};

  const dataContainer = document.getElementsByClassName('results__display')[0];

  // Use `JSON.stringify()` to make the output valid, human-readable JSON.
  dataContainer.textContent = JSON.stringify(data, null, "  ");

  // ...this is where we’d actually do something with the form data...
};

const form = document.getElementsByClassName('contact-form')[0];
form.addEventListener('submit', handleFormSubmit);


function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

// Start file download.
document.getElementById("dwn-btn").addEventListener("click", function(){
    // Generate download of hello.txt file with some content
    var text = document.getElementById("text-val").value;
    var filename = "hello.json";

    download(filename, text);
}, false);
