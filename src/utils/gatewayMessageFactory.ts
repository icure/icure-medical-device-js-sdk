import {HealthcareProfessional} from "../models/HealthcareProfessional";
import {Patient} from "../models/Patient";
import {User} from "../models/User";
import {filteredContactsFromAddresses} from "./addressUtils";

export type SMSMessage = {message: string};
export type EmailMessage = {from: string, html: string, subject: string}

export interface GatewayMessageFactory<T extends SMSMessage | EmailMessage> {
  hcp: HealthcareProfessional;
  link: string;
  patient: Patient;

  get(recipient: User, recipientPassword: string): T;
}

export interface EmailMessageFactory extends GatewayMessageFactory<EmailMessage> {}

export interface SMSMessageFactory extends GatewayMessageFactory<SMSMessage> {}

export class ICureRegistrationEmail implements EmailMessageFactory {
  hcp: HealthcareProfessional;
  hcpEmail: string;
  link: string;
  solutionName: string;
  patient: Patient;

  constructor(
    hcp: HealthcareProfessional,
    link: string,
    solutionName: string,
    patient: Patient
  ) {
    this.hcp = hcp;
    this.link = link;
    this.solutionName = solutionName
    const availableHcpEmail = filteredContactsFromAddresses(this.hcp.addresses, "email")
    if (!availableHcpEmail || !availableHcpEmail.telecomNumber)
      throw new Error("HCP does not have a valid email!")
    this.hcpEmail = availableHcpEmail.telecomNumber;
    this.patient = patient;
  }

  get(recipient: User, recipientPassword: string): EmailMessage {
    return {
      from: this.hcpEmail,
      html: `Dear ${this.patient.firstName}, you have been invited by ${this.hcp.lastName} to use ${this.solutionName}. Go to the link ${this.link} and use the following credentials : ${recipient.login} & ${recipientPassword}`,
      subject: `You have been invited to use ${this.solutionName}`
    }
  }
}

export class ICureRegistrationSMS implements SMSMessageFactory {
  hcp: HealthcareProfessional;
  link: string;
  solutionName: string;
  patient: Patient;

  constructor(
    hcp: HealthcareProfessional,
    link: string,
    solutionName: string,
    patient: Patient
    ) {
    this.hcp = hcp;
    this.link = link;
    this.solutionName = solutionName;
    this.patient = patient;
  }

  get(recipient: User, recipientPassword: string): SMSMessage {
    return {
      message: `Dear ${this.patient.firstName}, you have been invited by ${this.hcp.lastName} to use ${this.solutionName}. Go to the link ${this.link} and use the following credentials : ${recipient.login} & ${recipientPassword}`
    }
  }

}
