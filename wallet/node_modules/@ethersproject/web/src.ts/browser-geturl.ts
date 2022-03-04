"use strict";

import { arrayify } from "@ethersproject/bytes";

import type { GetUrlResponse, Options } from "./types";

export { GetUrlResponse, Options };

export async function getUrl(href: string, options?: Options): Promise<GetUrlResponse> {
    if (options == null) { options = { }; }

    const request: RequestInit = {
        method: (options.method || "GET"),
        headers: (options.headers || { }),
        body: (options.body || undefined),
    };

    if (options.skipFetchSetup !== true) {
        request.mode = <RequestMode>"cors";              // no-cors, cors, *same-origin
        request.cache = <RequestCache>"no-cache";        // *default, no-cache, reload, force-cache, only-if-cached
        request.credentials = <RequestCredentials>"same-origin";  // include, *same-origin, omit
        request.redirect = <RequestRedirect>"follow";    // manual, *follow, error
        request.referrer = "client";                     // no-referrer, *client
    };

    const response = await fetch(href, request);
    const body = await response.arrayBuffer();

    const headers: { [ name: string ]: string } = { };
    if (response.headers.forEach) {
        response.headers.forEach((value, key) => {
            headers[key.toLowerCase()] = value;
        });
    } else {
        (<() => Array<string>>((<any>(response.headers)).keys))().forEach((key) => {
            headers[key.toLowerCase()] = response.headers.get(key);
        });
    }

    return {
        headers: headers,
        statusCode: response.status,
        statusMessage: response.statusText,
        body: arrayify(new Uint8Array(body)),
    }
}
