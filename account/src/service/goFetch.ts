import {getBackend} from "./backend";
import {getToken} from "./token";

export const proceedFetch = async (url: string, body: string|undefined, isPost: boolean, addToken: boolean): Promise<any> => {
    const backend = await getBackend()
    const fullUrl = `${backend}${url}`
    const response = await fetch(fullUrl, buildConfig(isPost, addToken, body));
    const data = await response.json();

    if (response.status >= 400) {
        throw data;
    }

    return data;
}

export const proceedBlob = async (url: string, body: string|undefined, isPost: boolean, addToken: boolean): Promise<any> => {
    const backend = await getBackend()
    const fullUrl = `${backend}${url}`
    const response = await fetch(fullUrl, buildConfig(isPost, addToken, body));

    let fileNameHeader = response.headers.get('Content-Disposition')
    fileNameHeader = fileNameHeader == null ? '' : fileNameHeader;
    const fileName = getFileName(fileNameHeader);

    if (response.status >= 400) {
        throw new Error("error");
    }
    const blob = await response.blob()

    // it is a promise anyway
    return {blob, fileName};
}

const buildConfig = (post: boolean, addToken: boolean, body: string|undefined) : RequestInit => {
    const headers: HeadersInit = new Headers();
    headers.append('content-type', 'application/json');
    if (addToken) {
        const token = getToken();
        headers.append('authorization', `${token}`);
    }

    const res: RequestInit = {
        headers,
        method: post ? 'post' : 'get'
    }

    if (body !== undefined && post) {
        res.body = body;

    }

    return res;
}

function getFileName(fileNameHeader: string) {
    let fileName = fileNameHeader.replace(/[^=]*=(.*)/, '$1');
    fileName = fileName.replace(/:+/g, '')
    return fileName
}
