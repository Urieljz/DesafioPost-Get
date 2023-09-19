const URL_FIREBASE = 'https://js-imer-default-rtdb.firebaseio.com/.json';


const name = document.querySelector('#name')
const lastName = document.querySelector('#lastName')
const birthDate = document.querySelector('#birthDate')
const button = document.querySelector('#add-person')

const container = document.querySelector('#list-person');
const listPerson = [];

const renderPersona = (infoPersona, index) => {
    console.log(infoPersona)
    const li = document.createElement('li');
    const span = document.createElement('span');
    const button = document.createElement('button');
    const name = infoPersona.name + ' ' + infoPersona.lastName + ' '+ infoPersona.birthDate;

    button.className = 'btn btn-link';
    span.textContent = name;
    //button.textContent = 'Eliminar';
    button.dataset.persona = index;

    button.addEventListener('click',(event) => {
        const elementToRemove = event.target.dataset.persona;
        listPerson.splice(Number(elementToRemove), 1);
        cleanList();
        renderList(listPerson);
    });

    li.appendChild(span);
    li.appendChild(button);
    container.appendChild(li);
};

const renderList = (listToRender) => {
    console.log(listToRender)
    listToRender.forEach(( persona, index ) => {
        renderPersona(persona, index);
    });
};

const cleanList = () => {
    while(container.firstChild) {
        container.removeChild(container.firstChild)
        //padre.removeChild(child)
    };
};

button.addEventListener('click', ()=> {
    const persona = {
        name: name.value,
        lastName: lastName.value,
        birthDate: birthDate.value,
    }
   postPersonas(persona) 
}); 


const postPersonas = async(persona) => {
    const response = await fetch(URL_FIREBASE, {
        method: 'POST',
        headers: { 'Content-type': 'application/json;charset=UTF-8',},
        body: JSON.stringify(persona),
    });
};


const getPersonasApi = async() => {
     try {
         const response = await fetch(URL_FIREBASE, {
             method: 'GET'
         });
         const parsed = await response.json();
         const result = parserResponseFireBase(parsed);
         console.log(result)
         renderList(result)

     } catch (error) {
         console.error(error)
     }
};
 getPersonasApi()


 const parserResponseFireBase = (response) => {
    const parsedResponse = []
        for(const key in response){
            const element = {
                id: key,
                lastName: response[key].lastName,
                name: response[key].name,
                birthDate: response[key].birthDate,
            };
            parsedResponse.push(element)
        };
    return parsedResponse;
};

