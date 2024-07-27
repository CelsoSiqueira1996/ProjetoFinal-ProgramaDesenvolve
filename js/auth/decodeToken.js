export default function decodeTokenPayload() {
    const token = JSON.parse(sessionStorage.getItem("loginUser")).accessToken;
    const payload = JSON.parse(window.atob(token.split(".")[1]));
    return payload;
}