import {assert} from "chai";
import {v4 as uuid} from "uuid";
import "mocha";
import {medTechApi} from "../apis/medTechApi";
import "isomorphic-fetch";
import {webcrypto} from "crypto";
import {User} from "../models/User";
import {HealthcareProfessional} from "../models/HealthcareProfessional";
import {SystemMetaDataOwner} from "../models/SystemMetaDataOwner";

const iCureUrl =
  process.env.ICURE_TS_TEST_URL ?? "https://kraken.icure.dev/rest/v1";
const userName = process.env.ICURE_TS_TEST_USER!;
const password = process.env.ICURE_TS_TEST_PWD!;

describe("Healthcare professional", () => {
  it("should be capable of creating a healthcare professional from scratch", async () => {
    const medtechApi = medTechApi()
      .withICureBasePath(iCureUrl)
      .withUserName(userName)
      .withPassword(password)
      .withCrypto(webcrypto as any)
      .build();

    const rawKeyPair: CryptoKeyPair =
      await medtechApi.cryptoApi.RSA.generateKeyPair();
    const keyPair = await medtechApi.cryptoApi.RSA.exportKeys(
      rawKeyPair as { publicKey: CryptoKey; privateKey: CryptoKey },
      "jwk",
      "jwk"
    );

    const hcp =
      await medtechApi.healthcareProfessionalApi.createOrModifyHealthcareProfessional(
        new HealthcareProfessional({
          name: `Med-ts-ic-test-${uuid()}`,
          systemMetaData: new SystemMetaDataOwner({
            publicKey: medtechApi.cryptoApi.utils.jwk2spki(keyPair.publicKey),
            hcPartyKeys: {},
            privateKeyShamirPartitions: {},
          }),
        })
      );

    assert(hcp);

    let userEmail = `${uuid()}@med-ts-ic-test.com`;
    let userPwd = `${uuid()}`;
    const user = await medtechApi.userApi.createOrModifyUser(
      new User({
        login: userEmail,
        passwordHash: userPwd,
        email: userEmail,
        healthcarePartyId: hcp.id,
      })
    );

    assert(user.id != null);
    assert(user.login == userEmail);
    assert(user.email == userEmail);
    assert(user.healthcarePartyId == hcp.id);
    assert(user.passwordHash != userPwd);
  });
});
