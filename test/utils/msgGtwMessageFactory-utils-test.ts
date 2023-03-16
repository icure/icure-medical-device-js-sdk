import { assert, expect } from 'chai'
import { ICureRegistrationEmail, ICureRegistrationSMS } from '../../src/utils/msgGtwMessageFactory'
import { Patient } from '../../src/models/Patient'
import { User } from '../../src/models/User'
import { HealthcareProfessional } from '../../src/models/HealthcareProfessional'
import { Telecom } from '../../src/models/Telecom'
import { Address } from '../../src/models/Address'
import { newCodingReference } from '../models/codingReferenceTest'
import { newPersonName } from '../models/personNameTest'

describe('ICureRegistrationEmail', () => {
  const patient = new Patient({
    labels: new Set([newCodingReference()]),
    codes: new Set([newCodingReference()]),
    lastName: 'Ann',
    firstName: 'Stanton',
    names: [newPersonName()],
    addresses: [
      new Address({
        telecoms: [
          new Telecom({
            telecomType: 'email',
            telecomNumber: 'annstanton@example.com',
          }),
        ],
      }),
    ],
  })

  const patientWithPhoneNumber = new Patient({
    labels: new Set([newCodingReference()]),
    codes: new Set([newCodingReference()]),
    lastName: 'Ann',
    firstName: 'Stanton',
    names: [newPersonName()],
    addresses: [
      new Address({
        telecoms: [
          new Telecom({
            telecomType: 'mobile',
            telecomNumber: '380737225349',
          }),
        ],
      }),
    ],
  })

  const healthcareProfessional = new HealthcareProfessional({
    labels: new Set([newCodingReference()]),
    codes: new Set([newCodingReference()]),
    name: 'name',
    lastName: 'Doe',
    firstName: 'John',
    names: [newPersonName()],
    addresses: [
      new Address({
        telecoms: [
          new Telecom({
            telecomType: 'email',
            telecomNumber: 'johndoe@example.com',
          }),
        ],
      }),
    ],
  })

  const hcpWithoutEmail = new HealthcareProfessional({
    labels: new Set([newCodingReference()]),
    codes: new Set([newCodingReference()]),
    name: 'name',
    lastName: 'Doe',
    firstName: 'John',
    names: [newPersonName()],
    addresses: [
      new Address({
        telecoms: [
          new Telecom({
            telecomType: 'email',
            telecomNumber: 'very-bad-hcp',
          }),
        ],
      }),
    ],
  })

  const recipient = new User({
    name: 'name',
    roles: new Set(['roles']),
    login: 'login',
    passwordHash: 'passwordHash', // pragma: allowlist secret
    sharingDataWith: { all: new Set(['sharingDataWith']) },
    email: 'email',
    mobilePhone: 'mobilePhone',
  })
  const recipientPassword = 'password' // pragma: allowlist secret
  const solutionName = 'iCure'
  const link = 'https://www.example.com'

  it('should create an instance of ICureRegistrationEmail', () => {
    const email = new ICureRegistrationEmail(healthcareProfessional, link, solutionName, patient)
    expect(email).is.instanceof(ICureRegistrationEmail)
  })

  it('should throw an error when HCP does not have a valid email', () => {
    expect(() => {
      new ICureRegistrationEmail(hcpWithoutEmail, link, solutionName, patient)
      throw new Error('HCP does not have a valid email!')
    }).to.throw()
  })

  it('should generate an email message with the correct properties', () => {
    const email = new ICureRegistrationEmail(healthcareProfessional, link, solutionName, patient)
    const emailMessage = email.get(recipient, recipientPassword)

    assert(emailMessage.from === healthcareProfessional.addresses[0].telecoms[0].telecomNumber)
    expect(emailMessage.html).to.include(`Dear ${patient.firstName}`)
    expect(emailMessage.html).to.include(`invited by ${healthcareProfessional.lastName}`)
    expect(emailMessage.html).to.include(`use ${solutionName}`)
    expect(emailMessage.html).to.include(`Go to the link ${link}`)
    expect(emailMessage.html).to.include(`credentials : ${recipient.login} & ${recipientPassword}`)
    expect(emailMessage.subject).to.include(`You have been invited to use ${solutionName}`)
  })
  it('should return SMS message with correct content', () => {
    const sms = new ICureRegistrationSMS(healthcareProfessional, link, solutionName, patientWithPhoneNumber)
    const expectedMessage = `Dear ${patientWithPhoneNumber.firstName}, you have been invited by ${healthcareProfessional.lastName} to use ${solutionName}. Go to the link ${link} and use the following credentials : ${recipient.login} & ${recipientPassword}`
    const result = sms.get(recipient, recipientPassword)

    expect(result.message).to.equal(expectedMessage)
  })
  it('should set properties correctly', () => {
    const sms = new ICureRegistrationSMS(healthcareProfessional, link, solutionName, patientWithPhoneNumber)

    expect(sms.dataOwner).to.deep.equal(healthcareProfessional)
    expect(sms.link).to.equal(link)
    expect(sms.solutionName).to.equal(solutionName)
    expect(sms.patient).to.deep.equal(patientWithPhoneNumber)
  })
})
