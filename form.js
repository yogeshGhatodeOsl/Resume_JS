let id_user = 1;

const url = window.location.href;
user_id_str = url.split("?");

if(user_id_str != ""){
    let user_id = parseInt(user_id_str, 10);

    if(JSON.parse(localStorage.getItem(`${user_id}`))) {
        displayResume(user_id);
    }
}


const form = document.getElementById('thisForm');
form.addEventListener('submit', helperSubmit);

function helperSubmit(event) {
    event.preventDefault();

    let ResumeData = {
        id : id_user,
        personal : {},
        education : [],
        experience : [],
        skills : {
            language : [],
            tools :  []
        }
    }
    id_user++;
    
    // for personal information. 
    // as this input fields wants be changed we do not iterate.
    ResumeData.personal.name = event.target.elements.name.value;
    ResumeData.personal.email = event.target.elements.email.value;
    ResumeData.personal.phone = event.target.elements.phone.value;
    ResumeData.personal.address = event.target.elements.address.value;
    
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
            }
            else if( j == 4){
                edu_ele.degree = input.value;
            }
            else if( j == 7){
                edu_ele.gradYear = input.value;
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
            }
            else if( j == 4){
                exp_ele.position = input.value;
            }
            else if( j == 7){
                exp_ele.duration = input.value;
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
    }

    let tools_div =  event_tar_skill.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.children;
    let count_tool = 0;

    for(let tool of tools_div){
        if(count_tool == 0){
            count_tool++;
            continue;
        }

        ResumeData.skills.tools.push(tool.firstElementChild.value);
    }

    // saving resume data to the local storage
    localStorage.setItem( `${ResumeData.id}` , JSON.stringify(ResumeData) );

    // display resume data function 
    displayResume(`${ResumeData.id}`);
    

}


let displayResume = (resumeId) => {
    const ResumeItem = JSON.parse(localStorage.getItem(`${resumeId}`));

    const resumeDisplay = document.querySelector('.resumeDisplay');

    resumeDisplay.innerHTML = ``;

    const resumeHeading = document.createElement('h2');
    resumeHeading.innerHTML =  `Your Resume`;
    resumeDisplay.appendChild(resumeHeading);

    const personalDiv = document.createElement('div');
    personalDiv.innerHTML = `<h4>Personal Information:</h4>
                            <div>
                                <p><strong>Name:</strong> ${ResumeItem.personal.name} </p>
                                <p><strong>Email:</strong> ${ResumeItem.personal.email} </p>
                                <p><strong>Phone</strong> ${ResumeItem.personal.name} </p>
                                <p><strong>Address:</strong> ${ResumeItem.personal.name} </p>
                            </div>`
    
    resumeDisplay.appendChild(personalDiv);

    // educations section
    const educationHead = document.createElement('h2');
    educationHead.innerHTML = `Educational Background:`;
    resumeDisplay.appendChild(educationHead);

    for(let eduItem of ResumeItem.education){
        const educationDiv = document.createElement('div');
        educationDiv.innerHTML = `  <h4> ${eduItem.degree} </h4>
                                    <p><strong>University:</strong> ${eduItem.university} </p>
                                    <p><strong>Degree:</strong> ${eduItem.degree} </p>
                                    <p><strong>Graduation Year:</strong> ${eduItem.gradYear} </p>`;
        
        resumeDisplay.appendChild(educationDiv);        
    }

    // experienced section
    const experienceHead = document.createElement('h2');
    experienceHead.innerHTML = `Work Experience`;
    resumeDisplay.appendChild(experienceHead);

    for(let eduItem of ResumeItem.experience){
        const experienceDiv = document.createElement('div');
        experienceDiv.innerHTML = ` <h4> ${eduItem.position} </h4>
                                    <p><strong>Company:</strong> ${eduItem.company} </p>
                                    <p><strong>Position:</strong> ${eduItem.position} </p>
                                    <p><strong>Duration:</strong> ${eduItem.duration} </p>`;
        
        resumeDisplay.appendChild(experienceDiv);        
    }    

    const skillsHead = document.createElement('h2');
    skillsHead.innerHTML =  `Skills`;
    resumeDisplay.appendChild(skillsHead);

    const langHead = document.createElement('h4');
    langHead.innerHTML =  `Programming Languages`;
    resumeDisplay.appendChild(langHead);

    for(let langItem of ResumeItem.skills.language){
        const langDiv = document.createElement('div');
        langDiv.innerHTML = ` ${langItem}`;
        
        resumeDisplay.appendChild(langDiv);        
    } 

    const toolsHead = document.createElement('h4');
    toolsHead.innerHTML =  `Tools`;
    resumeDisplay.appendChild(toolsHead);

    for(let toolsItem of ResumeItem.skills.tools){
        const toolsDiv = document.createElement('div');
        toolsDiv.innerHTML = `${toolsItem}`;
        
        resumeDisplay.appendChild(toolsDiv);        
    } 
} 


