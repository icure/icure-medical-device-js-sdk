import {assert} from "chai";
import {v4 as uuid} from "uuid";
import "mocha";
import {medTechApi} from "../../src/apis/medTechApi";
import "isomorphic-fetch";
import {webcrypto} from "crypto";
import {User} from "../../src/models/User";
import {HealthcareProfessional} from "../../src/models/HealthcareProfessional";
import {SystemMetaDataOwner} from "../../src/models/SystemMetaDataOwner";
import {TestUtils} from "../test-utils";

const iCureUrl =
  process.env.ICURE_TS_TEST_URL ?? "https://kraken.icure.dev/rest/v1";
const userName = process.env.ICURE_TS_TEST_HCP_USER!;
const password = process.env.ICURE_TS_TEST_HCP_PWD!;
const hcpUserName = process.env.ICURE_TS_TEST_HCP_USER!;
const hcpPassword = process.env.ICURE_TS_TEST_HCP_PWD!;
const hcpPrivKey = process.env.ICURE_TS_TEST_HCP_PRIV_KEY!;

describe("Healthcare professional", () => {
  it("should be capable of creating a healthcare professional from scratch", async () => {
    const medtechApi = await medTechApi()
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

  it("should be capable of creating a user from a patient", async () => {
    const apiAndUser = await TestUtils.getOrCreateHcpApiAndLoggedUser(iCureUrl, hcpUserName, hcpPassword, hcpPrivKey);
  });
});
