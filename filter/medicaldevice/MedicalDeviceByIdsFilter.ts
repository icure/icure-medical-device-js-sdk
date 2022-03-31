import {Filter} from "../Filter";
import {MedicalDevice} from "../../models/MedicalDevice";

export interface MedicalDeviceByIdsFilter extends Filter<MedicalDevice> {
    description?: string
    ids: string[]
  '$type': 'MedicalDeviceByIdsFilter'
}
