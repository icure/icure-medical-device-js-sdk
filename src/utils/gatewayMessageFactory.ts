import {HealthcareProfessional} from "../models/HealthcareProfessional";
import {Patient} from "../models/Patient";
import {User} from "../models/User";
import {filteredContactsFromAddresses} from "./addressUtils";

export type SMSMessage = {message: string};
export type EmailMessage = {from: string, html: string, subject: string}

export interface GatewayMessageFactory<T extends SMSMessage | EmailMessage> {
  hcp: HealthcareProfessional;
  patient: Patient;
  user: User;
  password: string;
  link: string;

  get(): T;
}

export class EmailMessageFactory implements GatewayMessageFactory<EmailMessage> {
  hcp: HealthcareProfessional;
  hcpEmail: string;
  link: string;
  password: string;
  patient: Patient;
  solutionName: string;
  user: User;

  constructor(
    hcp: HealthcareProfessional,
    link: string,
    password: string,
    patient: Patient,
    solutionName: string,
    user: User
  ) {
    this.hcp = hcp;
    this.link = link;
    this.password = password;
    this.patient = patient;
    this.solutionName = solutionName
    this.user = user;
    const availableHcpEmail = filteredContactsFromAddresses(this.hcp.addresses, "email")
    if (!availableHcpEmail || !availableHcpEmail.telecomNumber)
      throw new Error("HCP does not have a valid email!")
    this.hcpEmail = availableHcpEmail.telecomNumber;
  }

  get(): EmailMessage {
    return {
      from: this.hcpEmail,
      html: `Dear ${this.patient.firstName}, you have been invited by ${this.hcp.name} to use ${this.solutionName}. Go to the link ${this.link} and use the following credentials : ${this.user.login} & ${this.password}`,
      subject: `You have been invited to use ${this.solutionName}`
    }
  }
}

export class SMSMessageFactory implements GatewayMessageFactory<SMSMessage> {
  hcp: HealthcareProfessional;
  link: string;
  password: string;
  patient: Patient;
  solutionName: string;
  user: User;

  constructor(
    hcp: HealthcareProfessional,
    link: string,
    password: string,
    patient: Patient,
    solutionName: string,
    user: User
  ) {
    this.hcp = hcp;
    this.link = link;
    this.password = password;
    this.patient = patient;
    this.solutionName = solutionName;
    this.user = user;
  }

  get(): SMSMessage {
    return {
      message: `Dear ${this.patient.firstName}, you have been invited by ${this.hcp.name} to use ${this.solutionName}. Go to the link ${this.link} and use the following credentials : ${this.user.email} & ${this.password}`
    }
  }

}
