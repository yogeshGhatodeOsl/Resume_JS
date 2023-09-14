
const form = document.getElementById('thisForm');
form.addEventListener('submit', helperSubmit);


function helperSubmit(event) {
    event.preventDefault();

    if(!checkValidation()){
        return;
    }

    let ResumeData = {
        id : localStorage.length,
        personal : {},
        education : [],
        experience : [],
        skills : {
            language : [],
            tools :  []
        }
    }    
    // for personal information. 
    // as this input fields wants be changed we do not iterate.

    let targetElement =  event.target.elements;

    ResumeData.personal.name = targetElement.name.value;
    targetElement.name.value = "";

    ResumeData.personal.email = targetElement.email.value;
    targetElement.email.value = "";

    ResumeData.personal.phone = targetElement.phone.value;
    targetElement.phone.value = "";

    ResumeData.personal.address = targetElement.address.value;
    targetElement.address.value = "";
    
    let educations_div =  event.target.firstElementChild.nextElementSibling.children;
    let count_div = 0;

    for(let edu of educations_div){
        if(count_div == 0){
            count_div++;
            continue;
        }

        let edu_itr = edu.children, j = 0;
        let edu_ele = {};

        for(let input of edu_itr){
            if(j == 1){
                edu_ele.university = input.value;
                input.value = "";
            }
            else if( j == 4){
                edu_ele.degree = input.value;
                input.value = "";
            }
            else if( j == 7){
                edu_ele.gradYear = input.value;
                input.value = "";
            }
            j++;
        }

        ResumeData.education.push(edu_ele);
    }

    let event_tar = event.target.firstElementChild.nextElementSibling;
    let experience_div =  event_tar.nextElementSibling.children;
    let count_exp = 0;

    for(let exp of experience_div){
        if(count_exp == 0){
            count_exp++;
            continue;
        }

        let exp_itr = exp.children, j = 0;
        let exp_ele = {};

        for(let input of exp_itr){
            if(j == 1){
                exp_ele.company = input.value;
                input.value = "";
            }
            else if( j == 4){
                exp_ele.position = input.value;
                input.value = "";
            }
            else if( j == 7){
                exp_ele.duration = input.value;
                input.value = "";
            }
            j++;
        }

        ResumeData.experience.push(exp_ele);
    }

    let event_tar_skill = event.target.firstElementChild.nextElementSibling.nextElementSibling;
    let language_div =  event_tar_skill.nextElementSibling.firstElementChild.nextElementSibling.children;
    let count_lang = 0;

    for(let lang of language_div){
        if(count_lang == 0){
            count_lang++;
            continue;
        }

        ResumeData.skills.language.push(lang.firstElementChild.value);
        lang.firstElementChild.value = "";
    }

    let tools_div =  event_tar_skill.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.children;
    let count_tool = 0;

    for(let tool of tools_div){
        if(count_tool == 0){
            count_tool++;
            continue;
        }

        ResumeData.skills.tools.push(tool.firstElementChild.value);
        tool.firstElementChild.value = "";
    }

    // saving resume data to the local storage
    localStorage.setItem( `${ResumeData.id}` , JSON.stringify(ResumeData) );

    let cur_url = window.location.href;
    cur_url += `?id=${ResumeData.id}`
    window.location.href = cur_url;
    // display resume data function 
    displayResume(`${ResumeData.id}`);
}



// display resume function :

let displayResume = (resumeId) => {
    const ResumeItem = JSON.parse(localStorage.getItem(`${resumeId}`));

    let container = document.querySelector(".resumeForm");
    container.style.display = "none";

    const resumeDisplay = document.querySelector('.resumeDisplay');
    resumeDisplay.innerHTML = ``;

    const mainHead = document.querySelector('h1');
    mainHead.innerHTML =  `Your Resume`;

    const personalDiv = document.createElement('div');
    personalDiv.innerHTML = `<div class="Resumeheader">
                                <h1><strong> ${ResumeItem.personal.name} </strong> </h1>
                                <div class="headFlex">
                                    <p><strong>Email:</strong> ${ResumeItem.personal.email}  </p>
                                    <p><strong>Phone:</strong> ${ResumeItem.personal.phone}  </p>
                                    <p><strong>Address:</strong>${ResumeItem.personal.address}  </p>
                                </div>
                            </div>`
    
    resumeDisplay.appendChild(personalDiv);

    // educations section
    const educationHead = document.createElement('h2');
    educationHead.classList.add('sectionHead');

    educationHead.innerHTML = `Educational Background:`;
    resumeDisplay.appendChild(educationHead);

    for(let eduItem of ResumeItem.education){
        const educationDiv = document.createElement('div');
        educationDiv.innerHTML = ` <div class="eduDiv">
                                        <div>
                                            <p><strong>University:</strong> ${eduItem.university} </p>
                                            <p><strong>Degree:</strong> ${eduItem.degree} </p>
                                        </div>
                                        <p><strong>Graduation Year:</strong> ${eduItem.gradYear} </p>
                                    </div>`;
        
        resumeDisplay.appendChild(educationDiv);        
    }

    // experienced section
    const experienceHead = document.createElement('h2');
    experienceHead.classList.add('sectionHead');
    experienceHead.innerHTML = `Work Experience`;
    resumeDisplay.appendChild(experienceHead);

    for(let eduItem of ResumeItem.experience){
        const experienceDiv = document.createElement('div');
        experienceDiv.innerHTML = ` <div class="eduDiv">
                                        <div>
                                            <p><strong>Company:</strong> ${eduItem.company} </p>
                                            <p><strong>Position:</strong> ${eduItem.position} </p>
                                        </div>
                                        <p><strong>Duration:</strong> ${eduItem.duration} </p>
                                    </div>`;
        
        resumeDisplay.appendChild(experienceDiv);        
    }    

    const skillsHead = document.createElement('h2');
    skillsHead.classList.add('sectionHead');
    skillsHead.innerHTML =  `Skills`;
    resumeDisplay.appendChild(skillsHead);

    const langHead = document.createElement('h4');
    langHead.classList.add('subSecHead');
    langHead.innerHTML =  `Programming Languages`;
    resumeDisplay.appendChild(langHead);

    const fulLangDiv = document.createElement('div');
    fulLangDiv.classList.add('fulLangDiv');

    for(let langItem of ResumeItem.skills.language){
        const langDiv = document.createElement('div');
        langDiv.innerHTML = ` ${langItem}`;
        
        fulLangDiv.appendChild(langDiv);  
        console.log(fulLangDiv);      
    } 

    resumeDisplay.appendChild(fulLangDiv);



    const toolsHead = document.createElement('h4');
    toolsHead.classList.add('subSecHead');
    toolsHead.innerHTML =  `Tools`;
    resumeDisplay.appendChild(toolsHead);


    const fulToolDiv = document.createElement('div');
    fulToolDiv.classList.add('fulLangDiv');

    for(let toolsItem of ResumeItem.skills.tools){
        const toolsDiv = document.createElement('div');
        toolsDiv.innerHTML = `${toolsItem}`;
        
        fulToolDiv.appendChild(toolsDiv);        
    } 

    resumeDisplay.appendChild(fulToolDiv);
} 


// -> validation checking for input 

function checkValidation(){
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const address = document.getElementById('address');
    const university = document.getElementById('university');
    const degree = document.getElementById('degree');
    const gradYear = document.getElementById('gradYear');
    const company = document.getElementById('company');
    const position = document.getElementById('position');
    const duration = document.getElementById('duration');
    const languages = document.getElementById('languages');
    const tools = document.getElementById('tools');

    // Regular expression for email validation
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

    let isValid = true;

    if (name.value.trim() === '') {
        isValid = false;
        name.nextElementSibling.innerHTML = "Name is required.";
    }

    if (!emailRegex.test(email.value)) {
        isValid = false;
        email.nextElementSibling.innerHTML = "Email address invalid.";
    }

    if (phone.value.trim() === '') {
        isValid = false;
        phone.nextElementSibling.innerHTML = "Phone is required";
    }

    if (address.value.trim() === '') {
        isValid = false;
        address.nextElementSibling.innerHTML = "Address is required.";
    }

    if (university.value.trim() === '') {
        isValid = false;
        university.nextElementSibling.innerHTML = "University is required.";
    }

    if (degree.value.trim() === '') {
        isValid = false;
        degree.nextElementSibling.innerHTML = "Degree is required.";
    }

    if (gradYear.value.trim() === '') {
        isValid = false;
        gradYear.nextElementSibling.innerHTML = "Graduation Year is required.";
    }

    if (company.value.trim() === '') {
        isValid = false;
        company.nextElementSibling.innerHTML = "Company is required.";
    }


    if (position.value.trim() === '') {
        isValid = false;
        position.nextElementSibling.innerHTML = "Position is required.";
    }

    if (duration.value.trim() === '') {
        isValid = false;
        duration.nextElementSibling.innerHTML = "Duration is required.";
    }

    if (languages.value.trim() === '') {
        isValid = false;
        languages.nextElementSibling.innerHTML = "Languages is required.";
    }

    if (tools.value.trim() === '') {
        isValid = false;
        tools.nextElementSibling.innerHTML = "Tools is required.";
    }

    return isValid;
}






// for urls generate 

let url = window.location.href;

let user_id_str = url.split('?');

if(user_id_str[1]){

    let actual_id = user_id_str[1].split('=');

    let user_id = parseInt(actual_id[1], 10);
    console.log(user_id);

    if(localStorage.getItem(user_id) !== null) {
        displayResume(user_id);
    }
    else {
        alert("Please Enter valid ID");
    }
}
else {
    let container = document.querySelector(".resumeForm");

    container.style.display = "";
}
