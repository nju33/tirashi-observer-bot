export type Fetch<T> = (
    url: string,
    data: {
        method: GoogleAppsScript.URL_Fetch.HttpMethod
        headers?: { [key: string]: string }
        data?: string
    },
    muteHttpExceptions: boolean
) => T
