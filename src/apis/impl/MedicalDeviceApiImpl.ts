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

export class MedicalDeviceApiImpl implements MedicalDeviceApi {
  private readonly deviceApi: IccDeviceApi;
  private readonly errorHandler: ErrorHandler;
  private readonly sanitizer: Sanitizer;

  constructor(api: { deviceApi: IccDeviceApi }, errorHandler: ErrorHandler, sanitizer: Sanitizer) {
    this.deviceApi = api.deviceApi
    this.errorHandler = errorHandler;
    this.sanitizer = sanitizer;
  }

  async createOrModifyMedicalDevice(medicalDevice: MedicalDevice): Promise<MedicalDevice> {
    try {
      const createdDevice = firstOrNull(await this.createOrModifyMedicalDevices([medicalDevice]));
      if (createdDevice != undefined) {
        return createdDevice;
      } else {
        throw this.errorHandler.createErrorWithMessage("Couldn't create medical device")
      }
    } catch (error) {
      if (error instanceof Error) {
        throw this.errorHandler.createError(error);
      }
      throw error;
    }
  }

  async createOrModifyMedicalDevices(medicalDevice: Array<MedicalDevice>): Promise<Array<MedicalDevice>> {
    try {
      const medicalDevicesToCreate = medicalDevice.filter(dev => !dev.rev);
      const medicalDevicesToUpdate = medicalDevice.filter(dev => !!dev.rev);

      if (!medicalDevicesToUpdate.every(device => device.id != null && forceUuid(device.id))) {
        throw this.errorHandler.createErrorWithMessage("Update id should be provided as an UUID");
      }

      const deviceToCreate = medicalDevicesToCreate.map(d => MedicalDeviceMapper.toDeviceDto(d));
      const deviceToUpdate = medicalDevicesToCreate.map(d => MedicalDeviceMapper.toDeviceDto(d));

      const createdDevices = await this.deviceApi.createDevices(deviceToCreate);
      const updatedDevices = await this.deviceApi.updateDevices(deviceToUpdate);
      const processedDeviceIds = [...createdDevices, ...updatedDevices].map(d => d.id!);

      return (await this.deviceApi.getDevices(new ListOfIds({ids: processedDeviceIds}))).map(d => MedicalDeviceMapper.toMedicalDevice(d));
    } catch (error) {
      if (error instanceof Error) {
        throw this.errorHandler.createError(error);
      }
      throw error;
    }
  }

  async deleteMedicalDevice(medicalDeviceId: string): Promise<string> {
    try {
      const deletedDeviceRev = (await this.deviceApi.deleteDevice(medicalDeviceId)).rev
      if (deletedDeviceRev != undefined) {
        return deletedDeviceRev;
      }
      throw this.errorHandler.createErrorWithMessage(`Couldn't delete medical device ${medicalDeviceId}`);
    } catch (error) {
      if (error instanceof Error) {
        throw this.errorHandler.createError(error);
      }
      throw error;
    }
  }

  async deleteMedicalDevices(requestBody: Array<string>): Promise<Array<string>> {
    try {
      return (await this.deviceApi.deleteDevices(new ListOfIds({ids: requestBody}))).filter(d => !!d.rev).map(d => d.rev!);
    } catch (error) {
      if (error instanceof Error) {
        throw this.errorHandler.createError(error);
      }
      throw error;
    }
  }

  async filterMedicalDevices(filter: Filter<MedicalDevice>, nextDeviceId?: string, limit?: number): Promise<PaginatedListMedicalDevice> {
    try {
      return PaginatedListMapper.toPaginatedListMedicalDevice(await this.deviceApi.filterDevicesBy(nextDeviceId, limit, new FilterChainDevice({
        filter: FilterMapper.toAbstractFilterDto<DeviceDto>(filter, 'MedicalDevice')
      })))!
    } catch (error) {
      if (error instanceof Error) {
        throw this.errorHandler.createError(error);
      }
      throw error;
    }
  }

  async getMedicalDevice(medicalDeviceId: string): Promise<MedicalDevice> {
    try {
      return MedicalDeviceMapper.toMedicalDevice(await this.deviceApi.getDevice(medicalDeviceId));
    } catch (error) {
      if (error instanceof Error) {
        throw this.errorHandler.createError(error);
      }
      throw error;
    }
  }

  async matchMedicalDevices(filter: Filter<MedicalDevice>): Promise<Array<string>> {
    try {
      return this.deviceApi.matchDevicesBy(FilterMapper.toAbstractFilterDto<MedicalDevice>(filter, 'User'));
    } catch (error) {
      if (error instanceof Error) {
        throw this.errorHandler.createError(error);
      }
      throw error;
    }
  }
}
