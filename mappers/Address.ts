import {Address as AddressDto, Telecom as TelecomDto} from "@icure/api";
import {Address, AddressAddressTypeEnum} from "../models/Address";
import {map} from "./utils";
import {Telecom, TelecomTelecomTypeEnum} from "../models/Telecom";

namespace AddressMapper {
  const toAddress = (dto?: AddressDto) => dto ? new Address({
      telecoms: map(dto.telecoms, toTelecom),
      addressType: dto.addressType as AddressAddressTypeEnum,
      description: dto.descr,
      street: dto.street,
      houseNumber: dto.houseNumber,
      postboxNumber: dto.postboxNumber,
      postalCode: dto.postalCode,
      city: dto.city,
      state: dto.state,
      country: dto.country,
      note: dto.note
    }) : undefined;

  const toAddressDto = (obj?: Address) => obj ? new AddressDto({
    telecoms: map(obj.telecoms, toTelecomDto),
    addressType: obj.addressType as AddressDto.AddressTypeEnum,
    descr: obj.description,
    street: obj.street,
    houseNumber: obj.houseNumber,
    postboxNumber: obj.postboxNumber,
    postalCode: obj.postalCode,
    city: obj.city,
    state: obj.state,
    country: obj.country,
    note: obj.note}) : undefined;

  const toTelecom = (dto?: TelecomDto) => dto ? new Telecom({
      telecomType: dto.telecomType as TelecomTelecomTypeEnum,
      telecomNumber: dto.telecomNumber,
      telecomDescription: dto.telecomDescription,
    }) : undefined;

  const toTelecomDto = (obj?: Telecom) => obj ? new TelecomDto({
      telecomType: obj.telecomType as TelecomDto.TelecomTypeEnum,
      telecomNumber: obj.telecomNumber,
      telecomDescription: obj.telecomDescription,
    }) : undefined;
}
