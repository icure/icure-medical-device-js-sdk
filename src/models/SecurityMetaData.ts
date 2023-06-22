import { SecureDelegation } from './SecureDelegation'

export class SecurityMetaData {
  constructor(json: ISecurityMetadata) {
    Object.assign(this as SecurityMetaData, json)
    const { secureDelegations, keysEquivalences } = json
    this.secureDelegations = secureDelegations
      ? Object.entries(secureDelegations)
          .map(([k, d]) => [k, new SecureDelegation(d)] as [string, SecureDelegation])
          .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {})
      : {}
    this.keysEquivalences = keysEquivalences ?? {}
  }

  'secureDelegations': { [hash: string]: SecureDelegation }
  'keysEquivalences': { [hash: string]: string }

  marshal(): ISecurityMetadata {
    return {
      ...this,
      secureDelegations: Object.entries(this.secureDelegations).reduce((acc, [k, v]) => ({ ...acc, [k]: v.marshal() }), {}),
    }
  }
}

interface ISecurityMetadata {
  secureDelegations?: { [hash: string]: SecureDelegation }
  keysEquivalences?: { [hash: string]: string }
}
