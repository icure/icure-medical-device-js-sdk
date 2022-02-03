import { Patient } from "@icure/api"
import { Patient as EfactPatient } from "../../model/models"
import * as _ from "lodash"

export function toPatient(patient: Patient): EfactPatient {
  const efactPatient = new EfactPatient(patient)
  _.each(efactPatient.insurabilities, ins => {
    ins.parameters = _.pick(ins.parameters, [
      "status",
      "tc1",
      "tc2",
      "preferentialstatus",
      "chronicaldisease",
      "paymentapproval"
    ]) as { [key: string]: string }
  })
  return efactPatient
}
