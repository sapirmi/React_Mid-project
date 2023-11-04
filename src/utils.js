import axios from "axios"

function getAll(url){
    return axios.get(url)
}

export {getAll}