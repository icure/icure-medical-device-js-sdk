/**
 * Returns if a specific http code is in a given code range
 * where the code range is defined as a combination of digits
 * and "X" (the letter X) with a length of 3
 *
 * @param codeRange string with length 3 consisting of digits and "X" (the letter X)
 * @param code the http status code to be checked against the code range
 */
export function isCodeInRange(codeRange: string, code: number): boolean {
  // This is how the default value is encoded in OAG
  if (codeRange === '0') {
    return true
  }
  if (codeRange == code.toString()) {
    return true
  } else {
    const codeString = code.toString()
    if (codeString.length != codeRange.length) {
      return false
    }
    for (let i = 0; i < codeString.length; i++) {
      if (codeRange.charAt(i) != 'X' && codeRange.charAt(i) != codeString.charAt(i)) {
        return false
      }
    }
    return true
  }
}

/**
 * Returns if it can consume form
 *
 * @param consumes array
 */
export function canConsumeForm(contentTypes: string[]): boolean {
  return contentTypes.indexOf('multipart/form-data') !== -1
}

export function formatICureApiUrl(iCureUrl: string): string {
  let formattedEndUrl = removeSlashEndOfApiUrl(iCureUrl)

  if (formattedEndUrl.match('^https?://[a-zA-Z0-9.-]+(:[0-9]+)?$') != null) {
    return formattedEndUrl + '/rest/v2'
  }

  if (formattedEndUrl.match('^https?://[a-zA-Z0-9.-]+(:[0-9]+)?/rest/v[1-2]$') != null) {
    return formattedEndUrl
  }

  throw Error(
    `Invalid API URL: Should respect the format ^https?://[a-zA-Z0-9.-]+{2,}(:d+)?/rest/v[1-2]$. Consider using only the constants of index.ts, except if you received any other information from the iCure Team`
  )
}

function removeSlashEndOfApiUrl(apiUrl: string): string {
  return apiUrl.endsWith('/') ? apiUrl.substring(0, apiUrl.length - 1) : apiUrl
}
