/**
 * @function doFetchRequest
 * @param {String} method The method of the Fetch request. One of: "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"
 * @param {String} url The url of the API to call, optionally with parameters.
 * @param {Object} headers The Associative Array containing the Request Headers. It must be undefined if there are no headers.
 * @param {String} body The body String to be sent to the server. It must be undefined if there is no body.
 * @returns {Promise} which receives the HTTP response.
 */
export async function doFetchRequest(method, url, headers, body) {
    try {
        if (checkMethodAndBody(method, body)) {
            let result = await fetch(url, {
                method: method,
                headers: headers,
                body: body
            });
            return result;
        } else {
            throw Error;
        }
    } catch (err) {
        throw err;
    }
}

/** @function doJSONRequest
 * @param {String} method The method of the Fetch request. One of: "GET", "POST", "PUT", "DELETE".
 * @param {String} url The url of the API to call, optionally with parameters.
 * @param {Object} headers The Associative Array containing the Request Headers. It must be undefined if there are no headers.
 * @param {Object} body The object to be sent as JSON body to the server. It must be undefined if there is no body.
 * @returns {Promise} which receives directly the object parsed from the response JSON.
 */
export async function doJSONRequest(method, url, headers, body) {
    try {
        if (checkMethodHeadersAndBody(headers, method, body)) {
            headers["Accept"] = "application/json";
            headers["Content-Type"] = "application/json";

            let result = await doFetchRequest(method, url, headers, JSON.stringify(body));
            return JSON.parse(JSON.stringify(result.devices));
        } else {
            console.log(Error);
            throw Error;
        }
    } catch (err) {
        throw err;
    }
}


/**
 * Checks body not to be undefined or not string according to REST METHOD
 * @param method
 * @param body
 * @returns {boolean}
 */
export function checkMethodAndBody(method, body) {
    switch (method) {
        case "GET":
        case "DELETE":
        case "OPTIONS":
        case "HEAD":
            return typeof body == "undefined";
        case "POST":
        case "PATCH":
        case "PUT":
            return typeof body == "string";
        default:
            return false;
    }
}

/**
 * Checks Content-type in headers
 * @param headers
 * @param method
 * @param body
 * @returns {boolean}
 */
export function checkMethodHeadersAndBody(headers, method, body) {
    if ((headers["Content-Type"] && headers["Content-Type"] !== "application/json") || (headers["Accept"] && headers["Accept"] !== "application/json")) {
        return false;
    }

    return !(typeof body != "undefined" && typeof body != "object" && !Array.isArray(body));
}
