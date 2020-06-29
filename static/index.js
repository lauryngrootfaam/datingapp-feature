// Gebruikte bronnen: 
//https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_form_steps
//https://www.w3schools.com/howto/howto_js_progressbar.asp
//https://www.codingnepalweb.com/2020/06/multi-step-form.html
//https://webdevtrick.com/multi-step-form/

//fieldsets gebruik ik om progressive closure toe te passen
const fieldset = document.getElementsByTagName("fieldset");
let currentFieldset = 0;

//om te kijken of het werkt (niet perse relevant)
const allFieldsets = fieldset.length;
console.log("aantal fieldsets: " + allFieldsets);

//buttons
const nextButton = document.body.getElementsByClassName("next");
const prevButton = document.body.getElementsByClassName("prev");

//progressbar
let progressbar = document.getElementById("progressbar");

//progressbar percentage
let averagePercentage = (100 / allFieldsets);

//validation
// const input = document.body.getElementsByTagName("input");

//aanroepen van de functie showCurrentFieldset
showCurrentFieldset();

//deze functie zorgt ervoor dat je alleen de stap (fieldset), te zien krijgt waar je op dat moment bent.
function showCurrentFieldset() {

  //als currentFieldset gelijk is aan 0, voegt hij aan het huidige fieldset het styleattribuut display: none toe.
  //Omdat de value van de var currentFieldset buiten deze functie op nul staat, begint hij altijd bij 0
  //en zet hij dus alle fieldsets op display none  
  if (currentFieldset === 0) {

    for (let i = 0; i < fieldset.length; i++) {
      fieldset[i].style.display = "none";
    }
    fieldset[currentFieldset].style.display = "block"; //hier zet ik het style element display op block voor fieldset[0] 

  } else {

    fieldset[currentFieldset].style.display = "block"; //de huidige fieldset wordt getoond
    fieldset[currentFieldset - 1].style.display = "none" //voorgaande fieldset wordt weer op display none gezet
  }

  //progressbar
  if (currentFieldset === 0) {
    progressbar.style.width = averagePercentage + "%";
  } else if (currentFieldset === 1) {
    let percentage = averagePercentage * 2;
    progressbar.style.width = percentage + "%"
  } else if (currentFieldset === 2) {
    let percentage = averagePercentage * 3;
    progressbar.style.width = percentage + "%"
  } else {
    progressbar.style.width = 100 + "%"
  }

}



function prevNextFieldset() {
  fieldset[currentFieldset + 1].style.display = "none"; //volgende fieldset ook op display none
  fieldset[currentFieldset].style.display = "block";

  //progressbar
  if (currentFieldset === 0) {
    progressbar.style.width = averagePercentage + "%";
  } else if (currentFieldset === 1) {
    let percentage = averagePercentage * 2;
    progressbar.style.width = percentage + "%"
  } else if (currentFieldset === 2) {
    let percentage = averagePercentage * 3;
    progressbar.style.width = percentage + "%"
  } else {
    progressbar.style.width = 100 + "%"
  }

}



for (let i = 0; i < fieldset.length; i++) {
  nextButton[i].addEventListener('click', function () {
   
    // let input = fieldset[currentFieldset].getElementsByTagName("input");
    let valid;
  

    let name = document.getElementById("name").value;    
    let lastname = document.getElementById("lastname").value;            
  

   if (currentFieldset === 0){
    if (name === "" || name ===null)                                  
    { 
        window.alert("Please enter your name.");  
        valid = false; 
        return valid;
    } 

    if (lastname === "" || lastname ===null){
      window.alert("Please enter your lastname.");  
      valid = false; 
      return valid;
    }
  }

  // if (currentFieldset === 1){
  //   if(test === "" || test == null){
  //     window.alert("Please");  
  //     valid = false; 
  //     return valid;
  //   }
  // }

     valid = true;
    
    if (valid == true) {
      currentFieldset += 1;
      showCurrentFieldset();
    }
  });

}

for (let i = 0; i < prevButton.length; i++) {

  prevButton[i].addEventListener('click', function () {
    currentFieldset -= 1;
    prevNextFieldset();
    //    console.log("percentage: " + averagePercentage + "current: " + currentFieldset);
  });

}



//oude code 
// showCurrentFieldset(currentFieldset);
// function showCurrentFieldset (currentFieldset){

//     fieldset[currentFieldset].style.display = "block";


// }