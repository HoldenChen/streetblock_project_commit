const wiki_url = 'https://en.wikipedia.org/w/api.php'

const headers = {
    'Accept' : 'application/json',
}

export const wiki_search = (key)=> {
    fetch(`${wiki_url}?action=query&format=json&gsrlimit=15&generator=search&origin=*&gsrsearch=${key}`,{headers}).then(
        res =>  res.json()
    ).then(
        res => console.log(res)
    )
}
