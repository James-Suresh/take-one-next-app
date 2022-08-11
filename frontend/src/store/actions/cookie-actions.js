import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const access_token_const = "token";

/* ------------------------------------------ */
// set cookies when user logs in
export function setCookies(accessToken) {
    Cookies.set(access_token_const, accessToken, { expires: 7 });

    return accessToken;
}

// get cookies when we need to request a private url
export function getCookies() {
    const token = Cookies.get(access_token_const);
    return token;
}

// remove cookies when user logs out
export function removeCookies() {
    Cookies.remove(access_token_const);
}

//
export async function getVerifiedToken() {
    const token = getCookies();
    const decoded = jwt_decode(token);

    const currentTime = new Date().getTime() / 1000

    if (currentTime > decoded.iat ) {
        // TODO: Add refresh token functionality
    }

    return token;
}

const tokenHeader = "Authorization";
const userIdHeader = "x-api-key";

export async function getHeaders(userId, forceRefresh) {
    const token = await getVerifiedToken(forceRefresh);

    return {
        headers: {
            "Content-Type": "application/json",
            ...(token && { [tokenHeader]: token, [userIdHeader]: userId }),
        },
    };
}