import {assert, expect, use} from 'chai'
import axios, {Method} from "axios";
import 'mocha'
import {medTechApi} from "../apis/medTechApi";
import 'isomorphic-fetch'
import { webcrypto } from 'crypto'
import {v4 as uuid} from 'uuid'
import {ua2hex, XHR} from "@icure/api";
import * as md5 from 'md5'

import { LocalStorage } from 'node-localstorage'
import * as os from 'os'
const tmp = os.tmpdir()
console.log('Saving keys in ' + tmp)
;(global as any).localStorage = new LocalStorage(tmp, 5 * 1024 * 1024 * 1024)
;(global as any).Storage = ''

const API_KEY = process.env.RAPID_API_KEY!

const delay = (delay: number) => new Promise<void>((resolve) => setTimeout(() => resolve(), delay))

describe('Healthcare professional', () => {
  it('should be capable of logging in using email', async () => {
    const medtechApi = medTechApi().withICureBasePath('https://kraken.icure.dev/rest/v2')
      .withCrypto(webcrypto as any)
      .withAuthServerUrl("https://msg-gw.icure.cloud/km")
      .withAuthProcessId('abced6c6-d7cb-4f78-841e-2674ad09621e')
      .build()

    try {
      const domainOptions = {
        method: 'GET' as Method,
        url: 'https://privatix-temp-mail-v1.p.rapidapi.com/request/domains/',
        headers: {
          'X-RapidAPI-Host': 'privatix-temp-mail-v1.p.rapidapi.com',
          'X-RapidAPI-Key': API_KEY
        }
      };

      const {data: domains} = await axios.request(domainOptions)
      const email = `${uuid()}${domains[0]}`
      const emailMd5 = md5(email)
      const process = await medtechApi.authenticationApi?.startAuthentication(undefined, 'Antoine', 'Duchâteau', email, 'process.env.ICURE_RECAPTCHA')
      assert(process)

      const {publicKey, privateKey} = await medtechApi.cryptoApi.RSA.generateKeyPair()
      const publicKeyHex = ua2hex(await medtechApi.cryptoApi.RSA.exportKey(publicKey!, 'spki'))
      const privateKeyHex = ua2hex(await medtechApi.cryptoApi.RSA.exportKey(privateKey!, 'pkcs8'))

      await delay(10000)

      const emailOptions = {
        method: 'GET' as Method,
          url: `https://privatix-temp-mail-v1.p.rapidapi.com/request/mail/id/${emailMd5}/`,
        headers: {
        'X-RapidAPI-Host': 'privatix-temp-mail-v1.p.rapidapi.com',
          'X-RapidAPI-Key': API_KEY
      }
      };
      const {data: emails} = await axios.request(emailOptions)

      const subjectCode = emails[0].mail_subject!.replace(/.*?([0-9]+).*/, '$1')
      const result = await medtechApi.authenticationApi?.completeAuthentication(process!, subjectCode, [privateKeyHex, publicKeyHex], () => undefined)

      assert(result)
    } catch(e) {
      console.error('An error occured', e)
    }
  })
})
