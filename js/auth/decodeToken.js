export default function decodeTokenPayload() {
    const token = JSON.parse(sessionStorage.getItem("loginUser")).accessToken;
    const payload = JSON.parse(b64DecodeUnicode(token.split(".")[1]));
    return payload;
}

function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}
