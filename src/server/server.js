'use strict';


const Hapi=require('hapi');

const fetch = require('node-fetch')



const api_key = 'ikIvj0CEVzUY7xnjPDh-kuKxa0VQ03qrmDP5bSXsVpxTDyQ26WlG-rE4pV2UCakjra_YOe1LVYQ5Dk5Mc9jkBjYuOrTgZM9WK2JrWkAkIT8hBuZw_8PVhcO-b9NrXHYx'


// Create a server with a host and port
const server=Hapi.server({
    host:'localhost',
    port:8801,
    routes : {
        cors : {
            origin:['http://localhost:3000']
        }
    }
});

const searchRequest = {
    term:'Four Barrel Coffee',
    location: 'san francisco, ca'
};

// Start the server
async function start() {

    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
    console.log('Server running at:', server.info.uri);
};

server.route({
    method:'POST',
    path:'/block',
    handler:function(request,reply){

    }
});

const headers = {
    'Accept' : 'application/json',
    'Authorization' : `Bearer ${api_key}`,
}

const api_url = 'https://api.yelp.com/v3/businesses'
const api_search = '/search'

// yelp api
server.route({
    method:'POST',
    path:'/yelp_search',
    handler:function(request) {
        console.log(request.url.search)
        // const client = yelp.client(api_key)
        //
        // return client.search(request.url.search)
        const fetch_url = `${api_url}${api_search}${request.url.search}`
        console.log(fetch_url)


        return fetch(fetch_url,{headers :headers})
    }
});

start();