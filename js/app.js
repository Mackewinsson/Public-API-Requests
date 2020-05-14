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
  
  (async function(){

    const userNumber = 12;
    const url = `https://randomuser.me/api/?results=${userNumber}`;
    const data = await fetchApi(url);
    const results = await data.results;
    console.log(results);

    // Map over the complete response from api and return an array with object specific data
    const users = await results.map( element => {
        
       return {

           image: element.picture.thumbnail,
           firstName: element.name.first,
            lastName: element.name.last,
            email: element.email,
            city: element.location.city,
            state: element.location.state

        };
        
    });
    log('Users array created');
    console.table(users);
    // Gallery markup: 

    await users.forEach(element => {
        const gallery = document.querySelector('div#gallery');
        const firstName = element.firstName;
        const lastName = element.lastName;
        const email = element.email;
        const city = element.city;
        const state = element.state;
        const image = element.image;
        //creating and apending elements elements
        const card =
            `<div class="card">
                <div class="card-img-container">
                    <img class="card-img" src="${image}" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${firstName} ${lastName}</h3>
                    <p class="card-text">${email}</p>
                    <p class="card-text cap">${city}, ${state}</p>
                </div>
            </div>`;
        console.log(card);
        gallery.appendChild(card);
       
        
    });

    // You can use the commented out markup below as a template
    // for each of your Gallery items, but you must use JS to 
    // create and append them to the `gallery` div.

    // IMPORTANT: Altering the arrangement of the markup and the 
    // attributes used may break the styles or functionality.

    // <div class="card">
    //     <div class="card-img-container">
    //         <img class="card-img" src="https://placehold.it/90x90" alt="profile picture">
    //     </div>
    //     <div class="card-info-container">
    //         <h3 id="name" class="card-name cap">first last</h3>
    //         <p class="card-text">email</p>
    //         <p class="card-text cap">city, state</p>
    //     </div>
    // </div>

})();