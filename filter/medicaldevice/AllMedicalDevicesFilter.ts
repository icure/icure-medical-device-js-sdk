import {MedicalDevice} from "../../models/MedicalDevice";
import {Filter} from "../Filter";

export interface AllMedicalDevicesFilter extends Filter<MedicalDevice> {
    description?: string
}
