/**
 * Initialize the script properties of a GAS script
 * 
 * @param event When executing `clasp run` with `—params`, to be an object is containing `params`
 */
function _initScriptProperties(event?: {params?: {TIRASHI_URL?: string}}) {
    if (event?.params?.TIRASHI_URL == null) {
        return
    }

    PropertiesService.getScriptProperties().setProperties({
        // If there is more than one, separate them with `,`.
        TIRASHI_URL: event?.params?.TIRASHI_URL
    })

    // Simply to confirm the value after execution of
    // `clasp run _initScriptProperties`
    return event?.params?.TIRASHI_URL
}