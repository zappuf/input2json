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

//*** This code is copyright 2002-2016 by Gavin Kistner, !@phrogz.net
//*** It is covered under the license viewable at http://phrogz.net/JS/_ReuseLicense.txt
//*** Reuse or modification is free provided you abide by the terms of that license.
//*** (Including the first two lines above in your source code satisfies the conditions.)

// Include this code (with notice above ;) in your library;

Date.prototype.customFormat = function(formatString){
	var YYYY,YY,MMMM,MMM,MM,M,DDDD,DDD,DD,D,hhhh,hhh,hh,h,mm,m,ss,s,ampm,AMPM,dMod,th;
	var dateObject = this;
	YY = ((YYYY=dateObject.getFullYear())+"").slice(-2);
	MM = (M=dateObject.getMonth()+1)<10?('0'+M):M;
	MMM = (MMMM=["January","February","March","April","May","June","July","August","September","October","November","December"][M-1]).substring(0,3);
	DD = (D=dateObject.getDate())<10?('0'+D):D;
	DDD = (DDDD=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dateObject.getDay()]).substring(0,3);
	th=(D>=10&&D<=20)?'th':((dMod=D%10)==1)?'st':(dMod==2)?'nd':(dMod==3)?'rd':'th';
	formatString = formatString.replace("#YYYY#",YYYY).replace("#YY#",YY).replace("#MMMM#",MMMM).replace("#MMM#",MMM).replace("#MM#",MM).replace("#M#",M).replace("#DDDD#",DDDD).replace("#DDD#",DDD).replace("#DD#",DD).replace("#D#",D).replace("#th#",th);

	h=(hhh=dateObject.getHours());
	if (h==0) h=24;
	if (h>12) h-=12;
	hh = h<10?('0'+h):h;
  hhhh = hhh<10?('0'+hhh):hhh;
	AMPM=(ampm=hhh<12?'am':'pm').toUpperCase();
	mm=(m=dateObject.getMinutes())<10?('0'+m):m;
	ss=(s=dateObject.getSeconds())<10?('0'+s):s;
	return formatString.replace("#hhhh#",hhhh).replace("#hhh#",hhh).replace("#hh#",hh).replace("#h#",h).replace("#mm#",mm).replace("#m#",m).replace("#ss#",ss).replace("#s#",s).replace("#ampm#",ampm).replace("#AMPM#",AMPM);
}


function getCurrentDate(){
  var currentDate = new Date();
  var year = currentDate.getFullYear();
  var month = currentDate.getMonth();
  var date = currentDate.getDate();
  var timestamp = currentDate.getTime();
  return year + "-" + (month+1) + "-" + date //+ "-" + timestamp;
}


function getPrettyTime(){
  var time = new Date();
  return time.customFormat("#hhh#-#mm#-#ss#");
}


// Start file download.
document.getElementById("dwn-btn").addEventListener("click", function(){
    var time = new Date(time);
    var action = document.getElementById("actionType").value;
    // Generate download file with some content
    var text = document.getElementById("text-val").value;
    // var filename = year + "-" + (month+1) + "-" + date + "-" + time + "_" + action + ".json";
    var filename = getCurrentDate() + "_" + getPrettyTime() + "_" + action + ".json";

    download(filename, text);
}, false);
