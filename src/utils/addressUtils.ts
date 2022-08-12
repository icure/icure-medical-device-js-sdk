import {Address, AddressAddressTypeEnum} from "../models/Address";
import {Telecom, TelecomTelecomTypeEnum} from "../models/Telecom";

export function filteredContactsFromAddresses(addresses: Array<Address>, telecomType: TelecomTelecomTypeEnum, addressType?: AddressAddressTypeEnum): Telecom | undefined {
  return addresses
    .filter( address => (!addressType || address.addressType === addressType) &&
      address.telecoms.filter( telecom => telecom.telecomType === telecomType).length > 0)
    .map( address => address.telecoms.filter( telecom => telecom.telecomType === telecomType).pop())
    .filter( telecom => !!telecom)[0];
}
