import axios from "axios"

const YOUTUBE_BASE_URL='https://www.googleapis.com/youtube/v3'
const getvideos=async(query)=>{
    const params={
        part:'snippet',
        q:query,
        maxResults:1,
        key:process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
    }
    const resp=await axios.get(YOUTUBE_BASE_URL+'/search',{
        params
    });

    return resp.data.items;
}
export default{
    getvideos
}