const api_search_url = 'https://api.foursquare.com/v2/venues/search'
const client_id ='DZE2FDXYU1RKDOXRFYW335UWLTFDZL5DU2V52GAIN0HKPFRK'
const client_secret = 'UWMKCODDJFOQCR0QQY4BV2ZSH0P43GJ5OIDTPTVGCTGJ3HP4'
const api_venus_detail_api = "https://api.foursquare.com/v2/venues/"
const auth_para =`client_id=${client_id}&client_secret=${client_secret}&v=20180323`



function _fetch(fetch_promise, timeout) {
    var abort_fn = null;

    //这是一个可以被reject的promise
    var abort_promise = new Promise(function(resolve, reject) {
        abort_fn = function() {
            reject('abort promise');
        };
    });

    //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
    var abortable_promise = Promise.race([
        fetch_promise,
        abort_promise
    ]);

    setTimeout(function() {
        abort_fn();
    }, timeout);

    return abortable_promise;
}

export  const search = (keys,ll) => {
    return _fetch(fetch(`${api_search_url}?client_id=${client_id}&client_secret=${client_secret}&v=20180323&limit=1&ll=${ll}&query=${keys}`),2000)
}

export  const venus_url = (id) => {
    return _fetch(fetch(
        `${api_venus_detail_api}${id}?${auth_para}`)
    ,3000).then(
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

