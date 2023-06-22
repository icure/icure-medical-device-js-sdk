export class SecureDelegation {
  constructor(json: ISecureDelegation) {
    Object.assign(this as SecureDelegation, json)

    this.secretIds = new Set(json.secretIds ?? [])
    this.encryptionKeys = new Set(json.encryptionKeys ?? [])
    this.owningEntityIds = new Set(json.owningEntityIds ?? [])
    this.parentDelegations = new Set(json.parentDelegations ?? [])
  }

  'delegator'?: string
  'delegate'?: string
  'secretIds': Set<string>
  'encryptionKeys': Set<string>
  'owningEntityIds': Set<string>
  'parentDelegations': Set<string>
  'exchangeDataId'?: string
  'permissions': AccessLevelEnum

  marshal(): ISecureDelegation {
    return {
      ...this,
      secretIds: [...this.secretIds],
      encryptionKeys: [...this.encryptionKeys],
      owningEntityIds: [...this.owningEntityIds],
      parentDelegations: [...this.parentDelegations],
    }
  }
}

interface ISecureDelegation {
  delegator?: string
  delegate?: string
  secretIds?: Set<string>
  encryptionKeys?: Set<string>
  owningEntityIds?: Set<string>
  parentDelegations?: Set<string>
  exchangeDataId?: string
  permissions: AccessLevelEnum
}

export enum AccessLevelEnum {
  READ = 'READ',
  WRITE = 'WRITE',
}
