/**
 * Initialize the script properties of a GAS script
 *
 * @param event - When executing `clasp run` with `—params`, to be an object is containing `params`
 */
function _initScriptProperties(event?: {
    params?: { LINE_TOKEN?: string; TIRASHI_URL?: string }
}): any {
    if (event?.params?.LINE_TOKEN != null) {
        // If there is more than one, separate them with `,`.
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

    // Simply to confirm the value after execution of
    // `clasp run _initScriptProperties`
    return event?.params ?? {}
}
