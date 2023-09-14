
// for creating educational fields 
const educationEle = document.querySelector('.education');

function createEducation() {
    const newDiv = document.createElement('div');
    const addEducation = document.querySelector('.education').lastElementChild.lastElementChild;
    addEducation.style.display = "none";
    const preTool = addEducation.previousElementSibling;
    console.log(preTool);
    if(preTool.tagName == "BUTTON"){
        preTool.style.display = "none";
    }

    newDiv.innerHTML = `<label for="university">University:</label>
                        <input type="text" id="university" name="university" required> 
                        <span class="Err universityErr"></span>

                        <label for="degree">Degree:</label>
                        <input type="text" id="degree" name="degree" required>
                        <span class="Err degreeErr"></span>  

                        <label for="gradYear">Graduation Year:</label>
                        <input type="text" id="gradYear" name="gradYear" required>  
                        <span class="Err gradYearErr"></span>

                        <button type="button" class="addEducation" onclick="createEducation()">Add Education</button> 
                        <button type="button" class="removeLast" onclick="removeLastEdu()"> Remove Last Education</button>`;

    // console.log(educationEle);
    educationEle.appendChild(newDiv);
}


// for creating experience fields
const experienceEle = document.querySelector('.experience');

function createExperience() {
    const newDiv = document.createElement('div');
    const addExperience = document.querySelector('.experience').lastElementChild.lastElementChild;
    addExperience.style.display = "none";
    const preTool = addExperience.previousElementSibling;

    if(preTool.tagName == "BUTTON"){
        preTool.style.display = "none";
    }

    newDiv.innerHTML = `<label for="company">Company Name:</label>
                        <input type="text" id="company" name="company" required>
                        <span class="Err companyErr"></span>

                        <label for="position">Position:</label>
                        <input type="text" id="position" name="position" required>
                        <span class="Err positionErr"></span>

                        <label for="duration">Duration:</label>
                        <input type="text" id="duration" name="duration" required>
                        <span class="Err durationErr"></span>

                        <button type="button"  class="addEducation" onclick="createExperience()">Add Experience</button>
                        <button type="button" class="removeLast" onclick="removeLastExp()">Remove Last Experience</button>`;


    experienceEle.appendChild(newDiv);
}


// for creating multiple language
const langEle = document.querySelector('.programming_lang');

function createLanguage() {
    const newDiv = document.createElement('div');
    const addLanguage = document.querySelector('.programming_lang').lastElementChild.lastElementChild;
    addLanguage.style.display = "none";
    const preTool = addLanguage.previousElementSibling;

    if(preTool.tagName == "BUTTON"){
        preTool.style.display = "none";
    }

    newDiv.innerHTML = `<input type="text" id="languages" name="languages" required>
                        <span class="Err nameErr"></span>
                        <button type="button" onclick="createLanguage()">Add Language</button>
                        <button type="button" class="removeLast" onclick="removeLastLang()">Remove Last language</button>`;

    langEle.appendChild(newDiv);
}


// for creating multiple tools 
const toolEle = document.querySelector('.tools');

function createTool() {
    const newDiv = document.createElement('div');
    const addTool = document.querySelector('.tools').lastElementChild.lastElementChild;
    const preTool = addTool.previousElementSibling;
    addTool.style.display = "none";

    if(preTool.tagName == "BUTTON"){
        preTool.style.display = "none";
    }

    newDiv.innerHTML = `<input type="text" id="tools" name="tools" required>
                        <span class="Err toolErr"></span>
                        <button type="button" onclick="createTool()">Add Tools</button>
                        <button type="button" class="removeLast" onclick="removeLastTool()">Remove Last tool</button>
                        `;

    toolEle.appendChild(newDiv);
}


// Add a click event listener to the button
function removeLastTool() {
  const Tool = document.querySelector('.tools');
  
  const lastChild = Tool.lastElementChild;

  if (lastChild) {
    Tool.removeChild(lastChild);
  }
  const addTool = Tool.lastElementChild.lastElementChild;
  addTool.style.display = "";
  addTool.previousElementSibling.style.display = "";
}


function removeLastLang() {
    const Lang = document.querySelector('.programming_lang')
  
    const lastChild = Lang.lastElementChild;
  
    if (lastChild) {
      Lang.removeChild(lastChild);
    }

    const addLang = Lang.lastElementChild.lastElementChild;
    addLang.style.display = "";
    addLang.previousElementSibling.style.display = "";
};


function removeLastExp() {
    const Exp = document.querySelector('.experience')
    
    const lastChild = Exp.lastElementChild;
  
    if (lastChild) {
      Exp.removeChild(lastChild);
    }

    const addLang = Exp.lastElementChild.lastElementChild;
    addLang.style.display = "";
    addLang.previousElementSibling.style.display = "";
};


function removeLastEdu () {
    
    const Edu = document.querySelector('.education')
    
    const lastChild = Edu.lastElementChild;
  
    if (lastChild) {
      Edu.removeChild(lastChild);
    }

    const addEdu = Edu.lastElementChild.lastElementChild;
    addEdu.style.display = "";
    addEdu.previousElementSibling.style.display = "";
};

