import "isomorphic-fetch";
import {medTechApi, MedTechApi} from "../../src/apis/medTechApi";
import {User} from "../../src/models/User";
import {Patient} from "../../src/models/Patient";
import {webcrypto} from "crypto";
import {hex2ua} from "@icure/api";
import {getEnvVariables, setLocalStorage, TestUtils} from "../test-utils";
import {Address} from "../../src/models/Address";
import {Telecom} from "../../src/models/Telecom";
import {assert, expect} from "chai";
import {ICureRegistrationEmail} from "../../src/utils/messageGatewayUtils";
import {HealthcareProfessional} from "../../src/models/HealthcareProfessional";

setLocalStorage(fetch);

const {iCureUrl: iCureUrl, hcpUserName: hcpUserName, hcpPassword: hcpPassword, hcpPrivKey: hcpPrivKey,
      msgGtwUrl: msgGtwUrl} = getEnvVariables()

let medtechApi: MedTechApi;
let hcpUser: User;
let hcp: HealthcareProfessional

describe("A Healthcare Party", () => {

  before(async () => {
    medtechApi = await medTechApi()
      .withICureBasePath(iCureUrl)
      .withUserName(hcpUserName)
      .withPassword(hcpPassword)
      .withAuthServerUrl(msgGtwUrl)
      .withCrypto(webcrypto as any)
      .build();

    hcpUser = await medtechApi.userApi.getLoggedUser();
    await medtechApi.cryptoApi.loadKeyPairsAsTextInBrowserLocalStorage(
      hcpUser.healthcarePartyId ?? hcpUser.patientId ?? hcpUser.deviceId!,
      hex2ua(hcpPrivKey)
    );

    const hcpEmail = await TestUtils.getTempEmail();
    hcp = await medtechApi.healthcareProfessionalApi.getHealthcareProfessional(hcpUser.healthcarePartyId!);
    hcp.addresses = [new Address({
      addressType: "home",
      description: "London",
      telecoms: [
        new Telecom({
          telecomType: "email",
          telecomNumber: hcpEmail
        })
      ]
    })]
  });

  async function userFromPatient(patient: Patient) {
    const existingPatient = await medtechApi.patientApi.createOrModifyPatient(patient);
    assert(!!existingPatient);

    const messageFactory = new ICureRegistrationEmail(
      hcp,
      "test",
      "iCure",
      existingPatient
    )
    const createdUser = await medtechApi.userApi.createAndInviteUser(existingPatient, messageFactory);
    assert(!!createdUser);
    assert(createdUser.patientId === existingPatient.id);
  }

  it("should be able to create a new User from an existing Patient with an Email", async () => {
    const email = await TestUtils.getTempEmail();
    const newPatient = new Patient({
      firstName: "Marc",
      lastName: "Specter",
      addresses: [new Address({
        addressType: "home",
        description: "London",
        telecoms: [
          new Telecom({
            telecomType: "email",
            telecomNumber: email
          })
        ]
      })]
    });
    await userFromPatient(newPatient);
  }).timeout(300000);
  
  it("should not be able to create a new User if the Patient has no contact information", async () => {
    const newPatient = new Patient({
      firstName: "Marc",
      lastName: "Specter"
    });

    try {
      await userFromPatient(newPatient);
      expect(true, "promise should fail").eq(false);
    } catch (e) {
      expect((e as Error).message).to.eq("No email or mobile phone information provided in patient");
    }
  });

  it("should not be able to create a new User if it already exists for that Patient", async () => {
    const email = await TestUtils.getTempEmail();
    const newPatient = await medtechApi.patientApi.createOrModifyPatient(
      new Patient({
        firstName: "Marc",
        lastName: "Specter"
      })
    );
    assert(!!newPatient);
    const newUser = await medtechApi.userApi.createOrModifyUser(new User({
      login: email,
      patientId: newPatient.id,
      email: email
    }))
    assert(!!newUser)

    try {
      await medtechApi.userApi.createAndInviteUser(newPatient, new ICureRegistrationEmail(
        hcp,
        "test",
        "iCure",
        newPatient));
      expect(true, "promise should fail").eq(false);
    } catch (e) {
      expect((e as Error).message).to.eq("A User already exists for this Patient");
    }
  });

});
