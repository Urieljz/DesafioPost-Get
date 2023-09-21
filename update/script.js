const URL_FIREBASE = 'https://js-imer-default-rtdb.firebaseio.com/'
const search = window.location.search;
const url = new URLSearchParams(search);
const ID_PERSONA = url.get('id');


const name = document.querySelector('#name')
const lastName = document.querySelector('#lastName')
const birthDate = document.querySelector('#birthDate')
const buttonSave = document.querySelector('#add-person')


const updatePersona = async() => {
    const persona = {
        name: name.value,
        lastName: lastName.value,
        birthDate: birthDate.value,
    }

    const url = URL_FIREBASE + ID_PERSONA + '.json';
    const response = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(persona)
    })
    if(response.status === 200){
        window.location.href = 'http://localhost:5500/Desafio.Post-Get/create/'
    }
    console.log(response);
}

buttonSave.addEventListener('click', () => {
    updatePersona()
});


const getInfoById = async() => {
    const url = URL_FIREBASE + ID_PERSONA + '.json';
    const info = await fetch(url)
    const parsed = await info.json()
    console.log(parsed)
    name.value = parsed.name
    lastName.value = parsed.lastName
    birthDate.value = parsed.birthDate
}

getInfoById()