export interface File {
    id: string
    delete: () => void
}

export interface Drive<Blob = any> {
    insertFile: (imageAsBlob: Blob, mimeType: string, parentId: string) => File
}

export class TobFile implements File {
    constructor(private readonly file: GoogleAppsScript.Drive.File) {}

    get id(): string {
        return this.file.getId()
    }

    delete(): void {
        this.file.setTrashed(true)
    }
}
