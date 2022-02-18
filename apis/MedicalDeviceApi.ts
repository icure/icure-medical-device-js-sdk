import {Filter} from '../models/Filter';
import {MedicalDevice} from '../models/MedicalDevice';
import {PaginatedListMedicalDevice} from '../models/PaginatedListMedicalDevice';

/**
  * no description
  */
  export interface MedicalDeviceApi {

    /**
      * When modifying a device, you must ensure that the rev obtained when getting or creating the device is present as the rev is used to guarantee that the device has not been modified by a third party.
      * Create or update a [MedicalDevice]
      * @param medicalDevice
    */
    createOrModifyMedicalDevice(medicalDevice: MedicalDevice, ): Promise<MedicalDevice >;
    /**
      * When modifying a device, you must ensure that the rev obtained when getting or creating the device is present as the rev is used to guarantee that the device has not been modified by a third party.
      * Create or update a batch of [MedicalDevice]
      * @param medicalDevice
    */
    createOrModifyMedicalDevices(medicalDevice: Array<MedicalDevice>, ): Promise<Array<MedicalDevice> >;
    /**
      * Deletes the medical device identified by the provided unique [medicalDeviceId].
      * Delete a [MedicalDevice]
      * @param medicalDeviceId
    */
    deleteMedicalDevice(medicalDeviceId: string, ): Promise<string >;
    /**
      * Deletes the batch of medical device identified by the provided [medicalDeviceIds].
      * Delete a batch of [MedicalDevice]
      * @param requestBody
    */
    deleteMedicalDevices(requestBody: Array<string>, ): Promise<Array<string> >;
    /**
      * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [MedicalDevice] are AllDevicesFilter and DevicesByIdsFilter. This method returns a paginated list of medical devices (with a cursor that lets you query the following items).
      * Load devices from the database by filtering them using the provided [filter].
      * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
      * @param nextDeviceId The id of the first device in the next page
      * @param limit The number of devices to return in the queried page
    */
    filterMedicalDevices(filter: Filter, nextDeviceId?: string, limit?: number, ): Promise<PaginatedListMedicalDevice >;
    /**
      * Each medical device is uniquely identified by a device id. The device id is a UUID. This [medicalDeviceId] is the preferred method to retrieve one specific device.
      * Get a Medical Device
      * @param medicalDeviceId
    */
    getMedicalDevice(medicalDeviceId: string, ): Promise<MedicalDevice >;
    /**
      * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [MedicalDevice] are AllDevicesFilter and DevicesByIdsFilter. This method returns the list of the ids of the users matching the filter.
      * Load medical device ids from the database by filtering them using the provided Filter.
      * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
    */
    matchMedicalDevices(filter: Filter, ): Promise<Array<string> >;
    }

