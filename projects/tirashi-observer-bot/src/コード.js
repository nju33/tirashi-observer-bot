function convertTextFromPDFFile(file, folder) {
  return convertTextFromPDF_(convertDocumentFromPDFFile, file, folder);
}

function convertTextFromPDFBlob(blob, folder) {
  return convertTextFromPDF_(convertDocumentFromPDFBlob, blob, folder);
}

function convertTextFromPDF_(convertDocument, pdf, folder) {
  const document = convertDocument(pdf, folder);
  const text = DocumentApp.openById(document.getId()).getBody().getText();
  document.setTrashed(true);
  return text;
}

function convertDocumentFromPDFFile(file, folder) {
  if (!folder)
    folder = file.getParents().next();
  const blob = file.getBlob();
  return convertDocumentFromPDFBlob(blob, folder);
}

function convertImageIntoText(imageAsBlob) {
  const fileMeta = {title: imageAsBlob.getName(), mimeType: MimeType.PNG};
  const result = Drive.Files.insert(fileMeta, imageAsBlob, {
    convert: true,
    ocr: true,
    ocrLanguage: 'ja'
   });

   const file = DriveApp.getFileById(result.id);

   const document = DocumentApp.openById(result.id)
   const text = document.getBody().getText();

   file.setTrashed(true);

   return text;

  //  if (folder) {
  //    const parents = file.getParents();
  //    while (parents.hasNext())
  //      parents.next().removeFile(file);
  //    folder.addFile(file);
  //  }
  //  return file;
}

function matchText(word, target) {
  // TODO
}

function process() {
  // const urls = (ScriptProperties.getProperty('TIRASHI_URL') ?? '').split(',')
  // let resultText = ''
  
  // for (const url in urls) {
  //   const imageUrl = 'http://www.albismart.jp/cgi-bin/chirashi/fukui/image-f.cgi?p=1&n=1'
  //   try {
  //     const response = UrlFetchApp.fetch(imageUrl);
  //     const imageBlob = response.getBlob()

  //     resultText += convertImageIntoText(imageBlob.setName("tirashibot.png"))
  //   } catch (error) {
  //     Logger.log(error)
  //     throw error
  //   }
  // }

  const word = 'きゃべつ'

  const aa = word.split('').map(char => {
    return a.find(item => {
      if (Array.isArray(item)) {
        return item.includes(char)
      }
      
      return item === char
        return item
    })
  }).map((item, i) => {
      if (item == null) {
        return word.charAt(i)
      }

      return item
    }).filter(item => {
      return item != null
    })

  Logger.log(aa)

  const bb = aa.map((item) => {
    if (Array.isArray(item)) {
        return `[${item.join('')}]`
    } else {
       return item
    }
  }).join('|')

  Logger.log(`(?:${bb})+`)

  const pattern = new RegExp(`(?:${bb})+`)

  Logger.log(pattern.test('aaあｓｄふぁｓｄｆさｆaaキャベッああああいいいいいいいあｓｄふぁｓｆ'))
  // Logger.log(pattern.test(resultText))
}