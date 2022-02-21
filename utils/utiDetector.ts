export namespace UtiDetector {

  export const getUtiFor = (documentName: string | undefined) => {
    if (documentName == undefined) {
      return undefined;
    }

    let pos = documentName.lastIndexOf('.');
    let fileExtension = (pos != -1) ? documentName.substring(pos, documentName.length) : undefined;
    if (fileExtension == undefined) {
      return undefined;
    }

    if (fileExtension in ["jpeg", "jpg", "jfif", "jpe"]) {
      return "public.jpeg";
    }

    if (fileExtension in ["txt", "text", "ini"]) {
      return "public.plain-text";
    }

    if (fileExtension in ["rtf", "rtx"]) {
      return "public.rtf";
    }

    if (fileExtension in ["html", "htm", "xhtml", "xhtm", "shtml", "shtm"]) {
      return "public.html";
    }

    if (fileExtension == "json") {
      return "public.json";
    }

    if (fileExtension in ["xml", "xsd", "xsl"]) {
      return "public.xml";
    }

    if (fileExtension == "png") {
      return "public.png";
    }

    if (fileExtension == "pdf") {
      return "public.adobe.pdf";
    }

    return undefined;
  }
}
