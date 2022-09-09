import {Address, AddressAddressTypeEnum} from "../../src/models/Address";
import {Telecom, TelecomTelecomTypeEnum} from "../../src/models/Telecom";
import {filteredContactsFromAddresses} from "../../src/utils/addressUtils";
import {assert} from "chai";

const addressTypes = ["home", "work", "vacation", "hospital", "clinic", "hq", "other", "temporary", "postal", "diplomatic", "reference"];
const telecomTypes = ["mobile", "phone", "email", "fax", "skype", "im", "medibridge", "ehealthbox", "apicrypt", "web", "print", "disk", "other", "pager"];
const allAddresses: Array<Address> = [];
const noAddresses: Array<Address> = [];
const onlyMobiles: Array<Address> = [];

describe("Address utils tests", () => {

  before(() => {
      addressTypes.forEach( (addressType) => {
        onlyMobiles.push(
          new Address({
            addressType: addressType as AddressAddressTypeEnum,
            telecoms: [
              new Telecom({
                telecomType: "mobile",
                telecomNumber: "TEST VALUE"
              })
            ]
          })
        )
        telecomTypes.forEach( (telecomType) => {
          allAddresses.push(
            new Address({
              addressType: addressType as AddressAddressTypeEnum,
              telecoms: [
                new Telecom({
                  telecomType: telecomType as TelecomTelecomTypeEnum,
                  telecomNumber: telecomType
                })
              ]
            })
          )
        });
      });
  });

  it("filteredContactsFromAddresses can extract any type of address/telecom combination", () => {
    addressTypes.forEach( (addressType) => {
      telecomTypes.forEach( (telecomType) => {
        const filteredTelecom = filteredContactsFromAddresses(
          allAddresses,
          telecomType as TelecomTelecomTypeEnum,
          addressType as AddressAddressTypeEnum)
        assert(!!filteredTelecom);
        assert(filteredTelecom.telecomType === telecomType);
        assert(filteredTelecom.telecomNumber === telecomType);
      });
    });
  });

  it("filteredContactsFromAddresses can extract any telecom combination if address type is not provided", () => {
      telecomTypes.forEach( (telecomType) => {
        const filteredTelecom = filteredContactsFromAddresses(
          allAddresses,
          telecomType as TelecomTelecomTypeEnum)
        assert(!!filteredTelecom);
        assert(filteredTelecom.telecomType === telecomType);
        assert(filteredTelecom.telecomNumber === telecomType);
      });
  });

  it("filteredContactsFromAddresses fails if there are no addresses", () => {
    addressTypes.forEach( (addressType) => {
      telecomTypes.forEach( (telecomType) => {
        const filteredTelecom = filteredContactsFromAddresses(
          noAddresses,
          telecomType as TelecomTelecomTypeEnum,
          addressType as AddressAddressTypeEnum)
        assert(!filteredTelecom);
      });
    });
  });

  it("filteredContactsFromAddresses fails if there are no telecoms with that type", () => {
    addressTypes.forEach( (addressType) => {
        const filteredTelecom = filteredContactsFromAddresses(
          onlyMobiles,
          "email",
          addressType as AddressAddressTypeEnum)
        assert(!filteredTelecom);
    });
  });

});
