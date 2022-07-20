//FetchApi.js

import axios from "axios";
    
async function fetchPosts() {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/users')
    return data
}
    
export default fetchPosts;