//function to log to the console with colors
function log(text){
    const log = text;
    return console.log(`%c ${log}`,'color: green; font-weight: bold; font-size: 18px;');
};
//function to log errors to the console in red
function logError(text){
    const log = text;
    return console.log(`%c ${log}`,'color: red; font-weight: bold; font-size: 18px;');
};

// function to create and display modal

function createModal(id, array){
    const usersArray = array;
    const firstName = usersArray[id].firstName;
    const lastName = usersArray[id].lastName;
    const email = usersArray[id].email;
    const city = usersArray[id].city;
    const state = usersArray[id].state;
    const image = usersArray[id].image;
    const phone = usersArray[id].phone;
    const street = usersArray[id].street;
    const streetNumber = usersArray[id].streetNumber;
    const birthday = usersArray[id].birthday;

    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container';
    modalContainer.innerHTML = 
    `
    <div class="modal">
    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
    <div class="modal-info-container">
        <img class="modal-img" src="${image}" alt="profile picture">
        <h3 id="name" class="modal-name cap">${firstName} ${lastName}</h3>
        <p class="modal-text">${email}</p>
        <p class="modal-text cap">${city}</p>
        <hr>
        <p class="modal-text">${phone}</p>
        <p class="modal-text">${street}, ${state} ${streetNumber}</p>
        <p class="modal-text">Birthday: ${birthday}</p>
    </div>
    `;
    gallery.appendChild(modalContainer);
};

function deleteModal(){

    const modalContainer = document.querySelector('.modal-container');
    modalContainer.remove();

};

//function to fetch api with try and catch

async function fetchApi(url){

      try{

        const response = await fetch(url);
        const data = await response.json();
        log('Data recieved');
        return data;

      }catch(error){

        logError(error);

      };

  };
  
  const gallery = document.querySelector('div#gallery');
  
  (async function(){

    const userNumber = 12;
    const url = `https://randomuser.me/api/?results=${userNumber}&nat=us`;
    const data = await fetchApi(url);
    const results = await data.results;
    console.log(results);

    // Map over the complete response from api and return an array with object specific data
    const users = await results.map( element => {
        
       return {

           image: element.picture.medium,
           firstName: element.name.first,
            lastName: element.name.last,
            email: element.email,
            city: element.location.city,
            state: element.location.state,
            phone: element.cell,
            street: element.location.street.name,
            streetNumber: element.location.street.number,
            birthday: element.dob.date.replace(/(\d\d\d\d)-(\d\d)-(\d\d)(.*)/g, '$2/$3/$1')

        };
        
    });
    log('Users array created');
    console.table(users);

    // Gallery markup: 


    let idCounter = 0;
    await users.forEach(element => {
        const firstName = element.firstName;
        const lastName = element.lastName;
        const email = element.email;
        const city = element.city;
        const state = element.state;
        const image = element.image;
        //creating and apending elements element
        let card = document.createElement('div');
        card.className = 'card';
        card.id = idCounter;
        gallery.appendChild(card);
        card.innerHTML= 
        `<div class="card-img-container">
            <img class="card-img" src="${image}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${firstName} ${lastName}</h3>
            <p class="card-text">${email}</p>
            <p class="card-text cap">${city}, ${state}</p>
        </div>`;
        idCounter++
    });

    gallery.addEventListener('click', (e) =>{
        if(e.target.id !== 'gallery'){

            if(e.target.className === 'card'){
                const card = e.target;
                createModal(card.id, users);
            } else if(e.target.className !== 'card'){
               if(e.target.parentElement.className === 'card'){
                    const card = e.target.parentElement;
                    createModal(card.id, users);
               }else if(e.target.parentElement.parentElement.className === 'card'){
                    const card = e.target.parentElement.parentElement;
                    createModal(card.id, users);
               }else if(e.target.tagName === 'BUTTON' || e.target.tagName === 'STRONG'){
                   deleteModal();
               };
            };
        };
    });

})();



