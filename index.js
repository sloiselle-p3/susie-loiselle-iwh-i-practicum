require('dotenv').config();     // npm install dotenv in cmd line for this to work
const express = require('express');
const axios = require('axios');

const app = express();
app.set( 'view engine', 'pug' );

app.use( express.static(__dirname + '/public') );
app.use( express.urlencoded({ extended: true }) );
app.use( express.json() );


// *DO NOT INCLUDE the private app access token in your repo. Don't do this practicum in your normal account
const PRIVATE_APP_TOKEN = process.env.PRIVATE_APP_TOKEN;


// TODO: ROUTE 1 - Create a new app.get route for the homepage to call your custom object data. Pass this data along to the front-end and create a new pug template in the views folder.
app.get('/', async (req, res) => {
    // http://localhost:3000/
    const childrenURL = `https://api.hubapi.com/crm/v3/objects/2-61512082?properties=name,date_of_birth,ethnicity,blood_type`;
    
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_TOKEN}`,
        'Content-Type': 'application/json'
    }
    try {
        const response = await axios.get(childrenURL, { headers });
        const data = response.data.results || [];
        res.render('homepage', { title: 'Children | HubSpot APIs', data });  
    } catch (error) {
        console.error(error);
    }
});


// TODO: ROUTE 2 - Create a new app.get route for the form to create or update new custom object data. Send this data along in the next route.
app.get('/update-cobj', async (req, res) => {
    // http://localhost:3000/update-cobj
    const childURL = `https://api.hubapi.com/crm/v3/objects/2-61512082?properties=name,date_of_birth,ethnicity,blood_type`;
    
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_TOKEN}`,
        'Content-Type': 'application/json'
    }
    try {
        const response = await axios.get(childURL, { headers });
        const data = response.data.results || [];
        res.render('updates', { title: 'Update Custom Object Form | Integrating With HubSpot I Practicum', data });  
    } catch (error) {
        console.error(error);
    }
});


// TODO: ROUTE 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.
app.post('/update-cobj/', async (req, res) => {
    const childData = {
        properties: {
            "name": req.body.name,
            "date_of_birth": req.body.date_of_birth,
            "ethnicity": req.body.ethnicity,
            "blood_type": req.body.blood_type
        }
    }

    const registerChild = `https://api.hubapi.com/crm/v3/objects/2-61512082/`;

    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_TOKEN}`,
        'Content-Type': 'application/json'
    };

    try { 
        await axios.post(registerChild, childData, { headers } );
        res.redirect('/');
    } catch(error) {
        console.error(error);
    }

});


// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));