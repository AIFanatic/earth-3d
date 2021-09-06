export async function GetURL(url: string) {
    return new Promise<ArrayBuffer>((resolve, reject) => {
        fetch(url)
        .then(response => {
            if (!response.ok) {
                reject(url);
                return;
            }
            return response.arrayBuffer()
        })
        .then(buffer => {
            resolve(buffer);
        })
        .catch(error => {
            reject(error);
        })
    });
}