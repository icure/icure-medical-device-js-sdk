import { formatICureApiUrl } from '../src/util'
import { ICURE_CLOUD_URL, ICURE_FREE_URL } from '../index'
import { assert, expect } from 'chai'

describe('Util', () => {
  it('Index.ts Constants successfully considered as valid API URLs', async () => {
    // A few valid API URLs
    assert(formatICureApiUrl(ICURE_CLOUD_URL) == ICURE_CLOUD_URL)
    assert(formatICureApiUrl('https://kraken.icure.cloud') == ICURE_CLOUD_URL)
    assert(formatICureApiUrl('https://kraken.icure.cloud/') == ICURE_CLOUD_URL)

    assert(formatICureApiUrl(ICURE_FREE_URL) == ICURE_FREE_URL)
    assert(formatICureApiUrl('http://localhost:16043') == ICURE_FREE_URL)
    assert(formatICureApiUrl('http://localhost:16044/rest/v1') == 'http://localhost:16044/rest/v1')
    assert(formatICureApiUrl('http://localhost:16044/rest/v1/') == 'http://localhost:16044/rest/v1')

    assert(formatICureApiUrl('https://kraken.icure.dev') == 'https://kraken.icure.dev/rest/v2')
    assert(formatICureApiUrl('https://kraken.icure.dev/rest/v1') == 'https://kraken.icure.dev/rest/v1')

    assert(formatICureApiUrl('http://kraken-1/rest/v2') == 'http://kraken-1/rest/v2')
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
