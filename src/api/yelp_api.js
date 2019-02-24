import yelp from 'yelp-fusion'

const api_key = 'ikIvj0CEVzUY7xnjPDh-kuKxa0VQ03qrmDP5bSXsVpxTDyQ26WlG-rE4pV2UCakjra_YOe1LVYQ5Dk5Mc9jkBjYuOrTgZM9WK2JrWkAkIT8hBuZw_8PVhcO-b9NrXHYx'
const client_id = 'LdB-WSZJ3K3o46-wP_wwlg'

const api_url = 'https://api.yelp.com/v3/businesses'
const api_search = '/search'
const api_reviews = '/reviews'

const headers = {
    'Accept' : 'application/json',
    'Authorization' : `Bearer${api_key}`,
    'origin':'*'
}

const client = yelp.client(api_key)

export const search = ({lat =0.0,lng = 0.0}) =>{

    // fetch(`${api_url}${api_search}?latitude=${lat}&longitude=${lng}&origin=*`,{headers :headers ,mode:'no-cors'}).then(
    //     resopnse => console.log(resopnse)
    // )
        client.search(lat,lng).then(
            response => {
                const firstResult = response.jsonBody.businesses[0]
                const prettyJson = JSON.stringify(firstResult,null,4)
                console.log(prettyJson)
            }
        ).catch( e=> {
            console.log(e)
        })
}



