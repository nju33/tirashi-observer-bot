import type { Drive, File } from '../domains/drive'
import { TobFile as _TobFile } from '../domains/drive'

const TobFile: typeof _TobFile =
    typeof _TobFile === 'undefined' ? exports.TobFile : _TobFile

export class TobDrive implements Drive<GoogleAppsScript.Base.Blob> {
    constructor(private readonly drive: GoogleAppsScript.Drive) {}

    insertFile(
        imageAsBlob: GoogleAppsScript.Base.Blob,
        mimeType: string,
        parentId: string
    ): File {
        const fileMeta = {
            parents: [{ id: parentId }],
            title: imageAsBlob.getName(),
            mimeType
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const inserted = this.drive.Files!.insert(fileMeta, imageAsBlob, {
            convert: true,
            ocr: true,
            ocrLanguage: 'ja'
        })

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const file = DriveApp.getFileById(inserted.id!)
        return new TobFile(file)
    }
}
