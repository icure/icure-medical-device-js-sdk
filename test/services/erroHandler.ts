import 'mocha'
import 'isomorphic-fetch'
import { assert } from 'chai'
import { ErrorHandlerImpl } from '../../src/services/impl/ErrorHandlerImpl'
import { XHR } from '@icure/api'
import { setLocalStorage } from '../test-utils'
import XHRError = XHR.XHRError

setLocalStorage(fetch)

const headers: Headers = new Headers({
  'X-Request-Id': '123456789',
})

const xhrError = new XHRError('https://kraken.icure.cloud/api/v1', 'Bad Request', 400, '400', headers)

describe('ErrorHandler', () => {
  const errorHandler = new ErrorHandlerImpl()

  it('should return a valid error message', () => {
    assert(errorHandler.createErrorWithMessage('test').message === 'test', 'Error message should be valid')
    assert(errorHandler.createErrorFromAny('An error occurred').message === 'An error occurred', 'Error message should be valid')

    const errorFromAny = errorHandler.createErrorFromAny(xhrError)
    assert(errorFromAny.message.includes('400 - Bad Request'), 'Error message should contain status and error code')
    assert(errorFromAny.message.includes('X-Request-Id: 123456789'), 'Error message should contain X-Request-Id')
    assert(errorFromAny.message.includes('URL: https://kraken.icure.cloud/api/v1'), 'Error message should contain URL')
  })

  it('should return a valid XHRError', () => {
    const error = errorHandler.createError(xhrError)

    assert(error.message.includes('400 - Bad Request'), 'Error message should contain status and error code')
    assert(error.message.includes('X-Request-Id: 123456789'), 'Error message should contain X-Request-Id')
    assert(error.message.includes('URL: https://kraken.icure.cloud/api/v1'), 'Error message should contain URL')
  })
})
