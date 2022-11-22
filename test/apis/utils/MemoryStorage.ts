import { StorageFacade } from '@icure/api'

export class MemoryStorage implements StorageFacade<string> {
  public storage: Record<string, string> = {}

  async removeItem(key: string): Promise<void> {
    delete this.storage[key]
  }

  async getItem(key: string): Promise<string | undefined> {
    return this.storage[key]
  }

  async setItem(key: string, valueToStore: string): Promise<void> {
    this.storage[key] = valueToStore
  }
}
