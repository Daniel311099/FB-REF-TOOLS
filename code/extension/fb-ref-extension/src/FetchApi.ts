//FetchApi.js

import axios from "axios";
    
async function fetchPosts() {
    const { data } = await axios.post('http://127.0.0.1:8000/api/', {query: `
    {
        customTable{
          name
          tabId
        }
      }
    `})
    return data
}
    
export default fetchPosts;