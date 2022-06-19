function onEdit(event: GoogleAppsScript.Events.SheetsOnEdit): void {
    Logger.log(event)

    if (event.value === '=now()') {
        
    }
}
