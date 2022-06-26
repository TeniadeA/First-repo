  /* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();


//let temp= allData.main.temp;

// Personal API Key for OpenWeatherMap API

let baseURL = 'http://api.openweathermap.org/geo/1.0/zip?zip=';

const apiKey = '&appid=d90a53b1971cdb38422b3600e7136376&units=imperial';



// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */

function performAction(e){
    const postCode =document.getElementById('zip').value;
    const feel = document.getElementById('feelings').value;
    
  //const content = document.getElementById ('content').value;
  //const date =  document.getElementById('date').value;
    getInfo(baseURL, postCode, apiKey)
    // New Syntax!
    .then(function(data){
      // Add data
      console.log(data);
      postData('/place', { date:newDate, temp:temp, content:feel } )
   // })
    //.then(
      retrieveData();
    })
    };


/* Function to GET Web API Data*/
const getInfo = async (baseURL, zip, key)=>{

    const response = await fetch(baseURL+zip+key)
    try {
  
      const data = await response.json();
      //console.log(data)
      return data;
    }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  }


/* Function to POST data */
const postData = async ( url = '', data = {})=>{
      console.log(data);
      const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });
  
      try {
        const newData = await response.json();
         console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      // appropriately handle the error
      }
  }


  /* Function to GET Project Data */
  const retrieveData = async () =>{
    const request = await fetch('/all');
    try {
    // Transform into JSON
    const allData = await request.json()
   console.log(allData)
    // Write updated data to DOM elements
    document.getElementById('date').innerHTML =`Today's date is: allData.date`;
    document.getElementById('temp').innerHTML = `Current temperature is: Math.round(allData.temp)+ 'degrees'`;
    document.getElementById('content').innerHTML =`I am: allData.feel`;
    
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
   }
  // const newInfo=newInfo(baseURL, postCode, apiKey);
//const temp = getInfo.main.temp;