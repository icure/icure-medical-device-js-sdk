import {assert, expect, use} from 'chai'
import 'mocha'
import {medTechApi} from "../apis/medTechApi";
import 'isomorphic-fetch'
import { webcrypto } from 'crypto'
import {User} from "../models/User";
import {HealthcareProfessional} from "../models/HealthcareProfessional";
import {SystemMetaDataOwner} from "../models/SystemMetaDataOwner";

const userName = process.env.ICURE_TS_TEST_USER!
const password = process.env.ICURE_TS_TEST_PWD!

describe('Healthcare professional', () => {
  it('should be capable of creating a healthcare professional from scratch', async () => {
    const medtechApi = medTechApi().withICureBasePath('https://kraken.icure.dev/rest/v2')
      .withUserName(userName)
      .withPassword(password)
      .withCrypto(webcrypto as any)
      .build()

    const rawKeyPair: CryptoKeyPair = await medtechApi.cryptoApi.RSA.generateKeyPair();
    const keyPair = await medtechApi.cryptoApi.RSA.exportKeys(rawKeyPair as {publicKey: CryptoKey, privateKey: CryptoKey}, 'jwk', 'jwk')

    const hcp = await medtechApi.healthcareProfessionalApi.createOrModifyHealthcareProfessional(new HealthcareProfessional({
      name: 'Kino Connect',
      systemMetaData: new SystemMetaDataOwner({
        publicKey: medtechApi.cryptoApi.utils.jwk2spki(keyPair.publicKey),
        hcPartyKeys:{},
        privateKeyShamirPartitions:{}
      })
    }))

    assert(hcp)

    const user = await medtechApi.userApi.createOrModifyUser(new User({
      login: 'kinoconnect@heartkinetics.be',
      passwordHash: 'qwy0qnTBXF6w5qCBf2',
      email: 'kinoconnect@heartkinetics.be',
      healthcarePartyId: hcp.id
    }))

    console.log(medtechApi.cryptoApi.utils.jwk2pkcs8(keyPair.privateKey))
  })
})
