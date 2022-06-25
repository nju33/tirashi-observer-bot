/**
 * Initialize the script properties of a GAS script
 *
 * @param event - When executing `clasp run` with `—params`, to be an object is containing `params`
 */
export function _initScriptProperties(event?: {
    params?: {
        LINE_TOKEN?: string
        TIRASHI_URL?: string
        TEMPORARY_DIRECTORY_TO_DOWNLOAD_FLYER?: string
    }
}): any {
    if (event?.params?.LINE_TOKEN != null) {
        // The token of a Line channel
        PropertiesService.getScriptProperties().setProperty(
            'LINE_TOKEN',
            event?.params?.LINE_TOKEN
        )
    }

    if (event?.params?.TIRASHI_URL != null) {
        // If there is more than one, separate them with `,`.
        PropertiesService.getScriptProperties().setProperty(
            'TIRASHI_URL',
            event?.params?.TIRASHI_URL
        )
    }

    if (event?.params?.TEMPORARY_DIRECTORY_TO_DOWNLOAD_FLYER != null) {
        PropertiesService.getScriptProperties().setProperty(
            'TEMPORARY_DIRECTORY_TO_DOWNLOAD_FLYER',
            event?.params?.TEMPORARY_DIRECTORY_TO_DOWNLOAD_FLYER
        )
    }
    // Simply to confirm the value after execution of
    // `clasp run _initScriptProperties`
    return event?.params ?? {}
}
