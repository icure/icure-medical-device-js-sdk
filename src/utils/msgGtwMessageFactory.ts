import {HealthcareProfessional} from "../models/HealthcareProfessional";
import {Patient} from "../models/Patient";
import {User} from "../models/User";
import {filteredContactsFromAddresses} from "./addressUtils";

export type SMSMessage = {message: string};
export type EmailMessage = {from: string, html: string, subject: string}
export type AuthenticationProcessBody = {
  'g-recaptcha-response': string,
  'firstName': string,
  'lastName': string,
  'from': string | undefined,
  'email': string | undefined,
  'mobilePhone': string | undefined,
  'hcpId': string | undefined
}

export interface MsgGtwMessageFactory<T extends SMSMessage | EmailMessage> {
  dataOwner: HealthcareProfessional | Patient;
  link: string;
  patient: Patient;

  get(recipient: User, recipientPassword: string): T;
}

export interface EmailMessageFactory extends MsgGtwMessageFactory<EmailMessage> {}

export interface SMSMessageFactory extends MsgGtwMessageFactory<SMSMessage> {}

export class ICureRegistrationEmail implements EmailMessageFactory {
  dataOwner: HealthcareProfessional | Patient;
  hcpEmail: string;
  link: string;
  solutionName: string;
  patient: Patient;

  constructor(
    dataOwner: HealthcareProfessional | Patient,
    link: string,
    solutionName: string,
    patient: Patient
  ) {
    this.dataOwner = dataOwner;
    this.link = link;
    this.solutionName = solutionName
    const availableHcpEmail = filteredContactsFromAddresses(this.dataOwner.addresses, "email")
    if (!availableHcpEmail || !availableHcpEmail.telecomNumber)
      throw new Error("HCP does not have a valid email!")
    this.hcpEmail = availableHcpEmail.telecomNumber;
    this.patient = patient;
  }

  get(recipient: User, recipientPassword: string): EmailMessage {
    return {
      from: this.hcpEmail,
      html: `Dear ${this.patient.firstName}, you have been invited by ${this.dataOwner.lastName} to use ${this.solutionName}. Go to the link ${this.link} and use the following credentials : ${recipient.login} & ${recipientPassword}`,
      subject: `You have been invited to use ${this.solutionName}`
    }
  }
}

export class ICureRegistrationSMS implements SMSMessageFactory {
  dataOwner: HealthcareProfessional | Patient;
  link: string;
  solutionName: string;
  patient: Patient;

  constructor(
    dataOwner: HealthcareProfessional | Patient,
    link: string,
    solutionName: string,
    patient: Patient
    ) {
    this.dataOwner = dataOwner;
    this.link = link;
    this.solutionName = solutionName;
    this.patient = patient;
  }

  get(recipient: User, recipientPassword: string): SMSMessage {
    return {
      message: `Dear ${this.patient.firstName}, you have been invited by ${this.dataOwner.lastName} to use ${this.solutionName}. Go to the link ${this.link} and use the following credentials : ${recipient.login} & ${recipientPassword}`
    }
  }

}
