import type { Document } from '../domains/document'

export class TobDocument implements Document {
    constructor(
        private readonly documentApp: GoogleAppsScript.Document.DocumentApp
    ) {}

    getText(id: string): string {
        const document = this.documentApp.openById(id)
        return document.getBody().getText()
    }
}
