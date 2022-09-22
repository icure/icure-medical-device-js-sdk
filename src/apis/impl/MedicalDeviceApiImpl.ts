import {MedicalDevice} from '../../models/MedicalDevice';
import {PaginatedListMedicalDevice} from "../../models/PaginatedListMedicalDevice";
import {MedicalDeviceApi} from "../MedicalDeviceApi";
import {Device as DeviceDto, FilterChainDevice, IccDeviceApi, ListOfIds} from "@icure/api";
import {forceUuid} from "../../mappers/utils";
import {MedicalDeviceMapper} from "../../mappers/medicalDevice";
import {PaginatedListMapper} from "../../mappers/paginatedList";
import {FilterMapper} from "../../mappers/filter";
import {Filter} from "../../filter/Filter";
import {firstOrNull} from "../../utils/functionalUtils";
import {ErrorHandler} from "../../services/ErrorHandler";

export class MedicalDeviceApiImpl implements MedicalDeviceApi {
  private readonly deviceApi: IccDeviceApi;
  private readonly errorHandler: ErrorHandler;

  constructor(api: { deviceApi: IccDeviceApi }, errorHandler: ErrorHandler) {
    this.deviceApi = api.deviceApi
    this.errorHandler = errorHandler;
  }

  async createOrModifyMedicalDevice(medicalDevice: MedicalDevice): Promise<MedicalDevice> {
    const createdDevice = firstOrNull(await this.createOrModifyMedicalDevices([medicalDevice]));
    if (createdDevice != undefined) {
      return createdDevice;
    } else {
      throw this.errorHandler.createErrorWithMessage("Couldn't create medical device")
    }
  }

  async createOrModifyMedicalDevices(medicalDevice: Array<MedicalDevice>): Promise<Array<MedicalDevice>> {
    const medicalDevicesToCreate = medicalDevice.filter(dev => !dev.rev);
    const medicalDevicesToUpdate = medicalDevice.filter(dev => !!dev.rev);

    if (!medicalDevicesToUpdate.every(device => device.id != null && forceUuid(device.id))) {
      throw this.errorHandler.createErrorWithMessage("Update id should be provided as an UUID");
    }

    const deviceToCreate = medicalDevicesToCreate.map(d => MedicalDeviceMapper.toDeviceDto(d));
    const deviceToUpdate = medicalDevicesToCreate.map(d => MedicalDeviceMapper.toDeviceDto(d));

    const createdDevices = await this.deviceApi.createDevices(deviceToCreate).catch(e => {
      throw this.errorHandler.createErrorFromAny(e)
    });
    const updatedDevices = await this.deviceApi.updateDevices(deviceToUpdate).catch(e => {
      throw this.errorHandler.createErrorFromAny(e)
    });
    const processedDeviceIds = [...createdDevices, ...updatedDevices].map(d => d.id!);

    return (await this.deviceApi.getDevices(new ListOfIds({ids: processedDeviceIds}))).map(d => MedicalDeviceMapper.toMedicalDevice(d));
  }

  async deleteMedicalDevice(medicalDeviceId: string): Promise<string> {
    const deletedDeviceRev = (await this.deviceApi.deleteDevice(medicalDeviceId).catch(e => {
      throw this.errorHandler.createErrorFromAny(e)
    })).rev
    if (deletedDeviceRev != undefined) {
      return deletedDeviceRev;
    }
    throw this.errorHandler.createErrorWithMessage(`Couldn't delete medical device ${medicalDeviceId}`);
  }

  async deleteMedicalDevices(requestBody: Array<string>): Promise<Array<string>> {
    return (await this.deviceApi.deleteDevices(new ListOfIds({ids: requestBody})).catch(e => {
      throw this.errorHandler.createErrorFromAny(e)
    })).filter(d => !!d.rev).map(d => d.rev!);
  }

  async filterMedicalDevices(filter: Filter<MedicalDevice>, nextDeviceId?: string, limit?: number): Promise<PaginatedListMedicalDevice> {
    return PaginatedListMapper.toPaginatedListMedicalDevice(await this.deviceApi.filterDevicesBy(nextDeviceId, limit, new FilterChainDevice({
      filter: FilterMapper.toAbstractFilterDto<DeviceDto>(filter, 'MedicalDevice')
    })).catch(e => {
      throw this.errorHandler.createErrorFromAny(e)
    }))!
  }

  async getMedicalDevice(medicalDeviceId: string): Promise<MedicalDevice> {
    return MedicalDeviceMapper.toMedicalDevice(await this.deviceApi.getDevice(medicalDeviceId).catch(e => {
      throw this.errorHandler.createErrorFromAny(e)
    }));
  }

  async matchMedicalDevices(filter: Filter<MedicalDevice>): Promise<Array<string>> {
    return this.deviceApi.matchDevicesBy(FilterMapper.toAbstractFilterDto<MedicalDevice>(filter, 'User')).catch(e => {
      throw this.errorHandler.createErrorFromAny(e)
    });
  }
}
