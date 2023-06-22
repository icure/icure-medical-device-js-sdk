export namespace UtiDetector {
  const jpegExtensions = ['jpeg', 'jpg', 'jfif', 'jpe']
  const txtExtensions = ['txt', 'text', 'ini']
  const rtfExtensions = ['rtf', 'rtx']
  const htmlExtensions = ['html', 'htm', 'xhtml', 'xhtm', 'shtml', 'shtm']
  const xmlExtensions = ['xml', 'xsd', 'xsl']

  export const getUtiFor = (documentName: string | undefined) => {
    if (documentName == undefined) {
      return undefined
    }

    let pos = documentName.lastIndexOf('.')
    let fileExtension = pos != -1 ? documentName.substring(pos + 1, documentName.length) : undefined
    if (fileExtension == undefined) {
      return undefined
    }

    if (jpegExtensions.includes(fileExtension)) {
      return 'public.jpeg'
    }

    if (txtExtensions.includes(fileExtension)) {
      return 'public.plain-text'
    }

    if (rtfExtensions.includes(fileExtension)) {
      return 'public.rtf'
    }

    if (htmlExtensions.includes(fileExtension)) {
      return 'public.html'
    }

    if (fileExtension == 'json') {
      return 'public.json'
    }

    if (xmlExtensions.includes(fileExtension)) {
      return 'public.xml'
    }

    if (fileExtension == 'png') {
      return 'public.png'
    }

    if (fileExtension == 'pdf') {
      return 'public.adobe.pdf'
    }

    return undefined
  }
}
