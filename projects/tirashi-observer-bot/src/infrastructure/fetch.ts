export function fetchText(
    url: string,
    data: {
        method: GoogleAppsScript.URL_Fetch.HttpMethod
        headers?: { [key: string]: string }
        data: string
    }
): string {
    const fetchParams: Partial<GoogleAppsScript.URL_Fetch.URLFetchRequestOptions> =
        { method: data.method, payload: data.data }

    if (data.headers?.['Content-Type'] === 'application/json') {
        fetchParams.contentType = data.headers?.['Content-Type']
    }

    if (typeof data.headers?.Authorization === 'string') {
        if (fetchParams.headers == null) {
            fetchParams.headers = {}
        }

        fetchParams.headers.Authorization = data.headers.Authorization
    }

    const response = UrlFetchApp.fetch(url, fetchParams)

    return response.getContentText()
}

export type FetchText = typeof fetchText
export type FetchTextData = Parameters<FetchText>[1]
