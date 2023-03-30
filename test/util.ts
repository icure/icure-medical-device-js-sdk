import { formatICureApiUrl, isCodeInRange } from '../src/util'
import { ICURE_CLOUD_URL, ICURE_FREE_URL } from '../index'
import { assert, expect } from 'chai'

describe('Util', () => {
  it('isCodeInRange - Possible cases', async () => {
    // Given
    expect(isCodeInRange('0', 0)).to.be.true
    expect(isCodeInRange('123', 123)).to.be.true
    expect(isCodeInRange('12X', 125)).to.be.true
    expect(isCodeInRange('XXX', 654)).to.be.true
    expect(isCodeInRange('XXX', 954)).to.be.true
    expect(isCodeInRange('12354687956452', 12354687956452)).to.be.true

    expect(isCodeInRange('124', 12)).to.be.false
    expect(isCodeInRange('123', 124)).to.be.false
  })

  it('Index.ts Constants successfully considered as valid API URLs', async () => {
    // A few valid API URLs
    expect(formatICureApiUrl(ICURE_CLOUD_URL)).to.eq(ICURE_CLOUD_URL)
    expect(formatICureApiUrl('https://kraken.icure.cloud')).to.eq(ICURE_CLOUD_URL)
    expect(formatICureApiUrl('https://kraken.icure.cloud/')).to.eq(ICURE_CLOUD_URL)

    expect(formatICureApiUrl(ICURE_FREE_URL)).to.eq(ICURE_FREE_URL)
    expect(formatICureApiUrl('http://localhost:16043')).to.eq(ICURE_FREE_URL)
    expect(formatICureApiUrl('http://localhost:16044/rest/v1')).to.eq('http://localhost:16044/rest/v1')
    expect(formatICureApiUrl('http://localhost:16044/rest/v1/')).to.eq('http://localhost:16044/rest/v1')

    expect(formatICureApiUrl('https://kraken.icure.dev')).to.eq('https://kraken.icure.dev/rest/v2')
    expect(formatICureApiUrl('https://kraken.icure.dev/rest/v1')).to.eq('https://kraken.icure.dev/rest/v1')

    expect(formatICureApiUrl('http://kraken-1/rest/v2')).to.eq('http://kraken-1/rest/v2')
  })

  it('Invalid iCure API URLs', async () => {
    // A few invalid API URLs
    expect(() => formatICureApiUrl('https://kraken.icure.cloud/rest')).to.throw(
      'Invalid API URL: Should respect the format ^https?://[a-zA-Z0-9.-]+{2,}(:d+)?/rest/v[1-2]$. Consider using only the constants of index.ts, except if you received any other information from the iCure Team',
      'Incomplete Path should not be accepted'
    )
    expect(() => formatICureApiUrl('https://kraken.icure.cloud/rest/v3')).to.throw(
      'Invalid API URL: Should respect the format ^https?://[a-zA-Z0-9.-]+{2,}(:d+)?/rest/v[1-2]$. Consider using only the constants of index.ts, except if you received any other information from the iCure Team',
      'Wrong versions should not be accepted'
    )
  })
})
