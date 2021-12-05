import axios from 'axios'; 

const API = axios.create({
    baseURL:'https://covid-19-data.p.rapidapi.com',

    headers: {
        'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
    'x-rapidapi-key': 'bbffdb51fbmshfb6f35e67afda15p17a33ajsn987019cb6191'
      }
}); //creating an instance of axios

export default API;

