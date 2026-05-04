require('dotenv').config();     // npm install dotenv in cmd line for this to work
const express = require('express');
const axios = require('axios');

const app = express();
app.set( 'view engine', 'pug' );

app.use( express.static(__dirname + '/public') );
app.use( express.urlencoded({ extended: true }) );
app.use( express.json() );


// *DO NOT INCLUDE the private app access token in your repo. Don't do this practicum in your normal account
const PRIVATE_APP_TOKEN = process.env.CLIENT_ID;


// TODO: ROUTE 1 - Create a new app.get route for the homepage to call your custom object data. 
// Pass this data along to the front-end and create a new pug template in the views folder.
app.get('/children', async (req, res) => {
    // http://localhost:3000/children
    const childrenURL = `https://api.hubapi.com/crm/v3/objects/2-61512082?properties=ethnicity`;
    
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_TOKEN}`,
        'Content-Type': 'application/json'
    }
    try {
        const response = await axios.get(childrenURL, { headers });
        console.log('API RESPONSE:', response.data);
        const data = response.data.results || [];
        console.log(JSON.stringify(response.data.results[0].properties, null, 2));
        res.render('children', { title: 'Children | HubSpot APIs', data });  
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.render('children', { data: [] });
    }
});

// TODO: ROUTE 2 - Create a new app.get route for the form to create or update new custom object data. Send this data along in the next route.


// TODO: ROUTE 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.



/** 
* * This is sample code to give you a reference for how you should structure your calls. 

* * App.get sample
app.get('/contacts', async (req, res) => {
    const contacts = 'https://api.hubspot.com/crm/v3/objects/contacts';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_TOKEN}`,
        'Content-Type': 'application/json'
    }
    try {
        const resp = await axios.get(contacts, { headers });
        const data = resp.data.results;
        res.render('contacts', { title: 'Contacts | HubSpot APIs', data });      
    } catch (error) {
        console.error(error);
    }
});

* * App.post sample
app.post('/update', async (req, res) => {
    const update = {
        properties: {
            "favorite_book": req.body.newVal
        }
    }

    const email = req.query.email;
    const updateContact = `https://api.hubapi.com/crm/v3/objects/contacts/${email}?idProperty=email`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_TOKEN}`,
        'Content-Type': 'application/json'
    };

    try { 
        await axios.patch(updateContact, update, { headers } );
        res.redirect('back');
    } catch(err) {
        console.error(err);
    }

});
*/


// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));