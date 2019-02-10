function Calculate(sourceForm, targetForm) {
  // A simple wrapper function to validate input before making the conversion
  var sourceValue = sourceForm.unit_input.value;

  // First check if the user has given numbers or anything that can be made to one...
  sourceValue = parseFloat(sourceValue);
  if (!isNaN(sourceValue)) {
    // If we can make a valid floating-point number, put it in the text box and convert!
    ConvertFromTo(sourceForm, targetForm);
  }
}

function ConvertFromTo(sourceForm, targetForm) {
  var factor;
  var result;

  if (sourceForm.name === "form_A"){
    factor = 360; //for Kyu 1min is equal to 6h > 360min
  } else {
    factor = 1 / 360;
  }

  result = sourceForm.unit_input.value;
  result = result * factor;

  // Update the target input box:
  targetForm.unit_input.value = result;
  UpdateForHuman(targetForm, targetForm.unit_input.value);
  UpdateForHuman(sourceForm, sourceForm.unit_input.value);
}

function UpdateForHuman(form, value) {
  var node;
  console.log(form);
  for (var i = 0; i < form.childNodes.length; i++) {
    console.log(form.childNodes[i].className)
    if (form.childNodes[i].className == "unit human") {
      node = form.childNodes[i];
      break;
    }
  }
  node.innerText = secondsToString(value);
}

function secondsToString(minutes) {
  var seconds = minutes * 60;
  var numyears = Math.floor(seconds / 31536000);
  var numdays = Math.floor((seconds % 31536000) / 86400); 
  var numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
  var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
  var numseconds = (((seconds % 31536000) % 86400) % 3600) % 60;
  return numyears + " years " +  numdays + " days " + numhours + " hours " + numminutes + " minutes " + numseconds + " seconds";

}

// Restricting textboxes to accept numbers + navigational keys only
document.getElementByClass('numbersonly').addEventListener('keydown', function(e) {
  var key = e.keyCode ? e.keyCode : e.which;

  if (!([8, 9, 13, 27, 46, 110, 190].indexOf(key) !== -1 ||
      (key == 65 && (e.ctrlKey || e.metaKey)) || // Select All 
      (key == 67 && (e.ctrlKey || e.metaKey)) || // Copy
      (key == 86 && (e.ctrlKey || e.metaKey)) || // Paste
      (key >= 35 && key <= 40) || // End, Home, Arrows
      (key >= 48 && key <= 57 && !(e.shiftKey || e.altKey)) || // Numeric Keys
      (key >= 96 && key <= 105) // Numpad
      (key == 190) // Numpad
    )) e.preventDefault();
});