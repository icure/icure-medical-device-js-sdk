import { User } from '../models/User'
import { DataOwner, DataOwnerWithType } from '../models/DataOwner'

export interface DataOwnerApi {
  /**
   * Returns the data owner id of the provided user
   * @param user User for which we want to know the data owner id
   */
  getDataOwnerIdOf(user: User): string

  /**
   * Get a data owner by its id. Note that you need to be allowed to access the data owner in order for this method to
   * succeed, but you don't need to have access to the data owner in order to share data with him.
   * @param ownerId the id of a data owner
   * @return information on the data owner
   */
  getDataOwner(ownerId: string): Promise<DataOwnerWithType>

  /**
   * Get the public keys of a data owner.
   * @param dataOwner
   */
  getPublicKeysOf(dataOwner: DataOwnerWithType): string[]

  giveAccessBackTo(ownerId: string, ownerNewPublicKey: string): Promise<void>
}
