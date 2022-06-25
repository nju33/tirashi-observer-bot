import type { Fetch } from '../domains/fetch'

export const fetch: Fetch<GoogleAppsScript.URL_Fetch.HTTPResponse> = (
    url,
    data,
    muteHttpExceptions
) => {
    const fetchParams: Partial<GoogleAppsScript.URL_Fetch.URLFetchRequestOptions> =
        {
            muteHttpExceptions,
            method: data.method,
            payload: data.data
        }

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

    return response
}
