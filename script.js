const URL_FIREBASE = 'https://js-imer-default-rtdb.firebaseio.com/'; //quitamos .json para concatenarlo a la funcion deletePersona


const name = document.querySelector('#name')
const lastName = document.querySelector('#lastName')
const birthDate = document.querySelector('#birthDate')
const enviar = document.querySelector('#add-person')
const containerList = document.querySelector('#list-person');
const listPerson = [];

const renderPersona = (infoPersona, index) => {
    console.log(infoPersona)
    const li = document.createElement('li');
    const span = document.createElement('span');
    const buttonDelete = document.createElement('button');
    const buttonEdit = document.createElement('button');
    const name = infoPersona.name + ' ' + infoPersona.lastName + ' '+ infoPersona.birthDate;

    buttonDelete.className = 'btn btn-link';
    buttonEdit.className = 'btn btn-link';
    span.textContent = name;
    buttonDelete.textContent = 'Eliminar';
    buttonEdit.textContent = 'Editar';
    buttonDelete.dataset.persona = infoPersona.id;
    buttonEdit.dataset.persona = infoPersona.id;

    buttonDelete.addEventListener('click',(event) => {
        const elementToRemove = event.target.dataset.persona;
        //listPerson.splice(Number(elementToRemove), 1);
        deletePersona(elementToRemove)
    });

    li.appendChild(span);
    li.appendChild(buttonDelete);
    li.appendChild(buttonEdit);
    containerList.appendChild(li);
};

const renderList = (listToRender) => {
    console.log(listToRender)
    listToRender.forEach(( persona, index ) => {
        renderPersona(persona, index);
    });
};

const cleanList = () => {
    while(containerList.firstChild) {
        containerList.removeChild(containerList.firstChild)
        //padre.removeChild(child)
    };
};

const deletePersona = async(id) => {
    console.log(id)
    const url = URL_FIREBASE + id + '.json'
    const deleted = await fetch(url, {
        method: 'DELETE'
    });
    if(deleted.status === 200){
        getPersonasApi()
    }
}

const postPersonas = async(persona) => {
    const url = URL_FIREBASE + '.json'
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-type': 'application/json;charset=UTF-8',},
        body: JSON.stringify(persona),
    });
    if(create.status === 200){
        getPersonasApi()
    }
};

enviar.addEventListener('click', ()=> {
    const persona = {
        name: name.value,
        lastName: lastName.value,
        birthDate: birthDate.value,
    }
   postPersonas(persona) 
}); 

const getPersonasApi = async() => {
     try {
        const url = URL_FIREBASE + '.json'
         const response = await fetch(url, {
             method: 'GET'          
         });         
         if(response.status != 201){
            const parsed = await response.json();
            const responseParsered = parserResponseFireBase(parsed);
            cleanList()
            //console.log(responseParsered)
            renderList(responseParsered)
         }
         

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

