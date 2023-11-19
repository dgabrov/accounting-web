let url : string | null = null

const fetchBackend = async() : Promise<string> => {
    let location = window.location.href;
    if (! location.endsWith("/")) {
        location = location + "/"
    }
    const response = await fetch(location + "config/config.json");
    const data = await response.json();

    if (response.status >= 400) {
        throw data
    }

    return data.backend
}

export const getBackend = async () => {
    if (url === null) {
        url = await fetchBackend();
    }

    return url
}
