import {assert} from "chai";
import "mocha";
import {medTechApi} from "../src/apis/medTechApi";
import "isomorphic-fetch";
import {webcrypto} from "crypto";
import {User} from "../src/models/User";
import {HealthcareProfessional} from "../src/models/HealthcareProfessional";
import {SystemMetaDataOwner} from "../src/models/SystemMetaDataOwner";

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
          name: "HCP TS MedTech Test",
          systemMetaData: new SystemMetaDataOwner({
            publicKey: medtechApi.cryptoApi.utils.jwk2spki(keyPair.publicKey),
            hcPartyKeys: {},
            privateKeyShamirPartitions: {},
          }),
        })
      );

    assert(hcp);

    const user = await medtechApi.userApi.createOrModifyUser(
      new User({
        login: "test@icure.com",
        passwordHash: "d8119326-cf9e-11ec-a673-fbb45f6bb7f2",
        email: "test@icure.com",
        healthcarePartyId: hcp.id,
      })
    );

    assert(user.id != null);
    assert(user.login == "test@icure.com");
    assert(user.passwordHash != "d8119326-cf9e-11ec-a673-fbb45f6bb7f2");
    assert(user.email == "test@icure.com");
    assert(user.healthcarePartyId == hcp.id);
  });
});
