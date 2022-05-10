import {medTechApi, MedTechApi} from "../src/apis/medTechApi";
import {User} from "../src/models/User";
import {webcrypto} from "crypto";
import {hex2ua} from "@icure/api";

export class TestUtils {

  static async createMedTechApiAndLoggedUserFor(iCureUrl: string, userName: string, password: string, dataOwnerKey: string): Promise<{api: MedTechApi, user: User}> {
    const medtechApi = medTechApi()
      .withICureBasePath(iCureUrl)
      .withUserName(userName)
      .withPassword(password)
      .withCrypto(webcrypto as any)
      .build();

    const foundUser = await medtechApi.userApi.getLoggedUser();
    await medtechApi.cryptoApi.loadKeyPairsAsTextInBrowserLocalStorage(
      foundUser.healthcarePartyId ?? foundUser.patientId ?? foundUser.deviceId!,
      hex2ua(dataOwnerKey)
    );

    return {api: medtechApi!, user: foundUser!};
  }
}
