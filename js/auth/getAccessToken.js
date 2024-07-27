export default function getAccessToken(){
    return (sessionStorage.getItem("loginUser"))? JSON.parse(sessionStorage.getItem("loginUser")).accessToken : "";
}