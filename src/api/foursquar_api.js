const api_search_url = 'https://api.foursquare.com/v2/venues/search'
const client_id ='DZE2FDXYU1RKDOXRFYW335UWLTFDZL5DU2V52GAIN0HKPFRK'
const client_secret = 'UWMKCODDJFOQCR0QQY4BV2ZSH0P43GJ5OIDTPTVGCTGJ3HP4'
const api_venus_detail_api = "https://api.foursquare.com/v2/venues/"
const auth_para =`client_id=${client_id}&client_secret=${client_secret}&v=20180323`


export  const search = (keys,ll) => {
    return fetch(`${api_search_url}?client_id=${client_id}&client_secret=${client_secret}&v=20180323&limit=1&ll=${ll}&query=${keys}`)
}

export  const venus_url = (id) => {
    return fetch(
        `${api_venus_detail_api}${id}?${auth_para}`
    ).then(
        res => res.json()
    )
}

export const getVenusDetailsByKey = (keys,ll) => {
       return  search(keys,ll).then(
         res => res.json()
     ).then(
         data => {
             const  id = data.response.venues[0].id
             return venus_url(id)

         }
     )
}

