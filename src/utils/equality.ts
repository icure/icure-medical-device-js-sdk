import {SystemMetaDataEncrypted} from "../models/SystemMetaDataEncrypted";
import {Delegation} from "../models/Delegation";

export function setEquality<T>(set1: Set<T>, set2: Set<T>, equals: (arg0: T, arg1: T) => boolean): boolean {
  const arr1 = Array.from(set1);
  const arr2 = Array.from(set2);
  return arr1.length === arr2.length &&
    arr1.every( (val1, _) => arr2.some( (val2) => equals(val1, val2)));
}

export function delegationEquality(obj1: Delegation, obj2: Delegation): boolean {
  return ((!obj1.tags && !obj2.tags) ||
      (!!obj1.tags && !!obj2.tags && obj1.tags.length === obj2.tags.length &&
        obj1.tags.every( (val, _) => obj2.tags.includes(val)))) &&
    obj1.owner === obj2.owner &&
    obj1.delegatedTo === obj2.delegatedTo &&
    obj1.key === obj2.key;
}

function metaDataObjectEquality(obj1: {[key: string]: Set<Delegation>}, obj2: {[key: string]: Set<Delegation>}): boolean {
  return (!obj1 && !obj2) ||
    (!!obj1 && !!obj2 &&
      Object.keys(obj1).length === Object.keys(obj2).length &&
      Object.keys(obj1).every( (key, _) => key in obj2 &&
        setEquality<Delegation>(obj1[key], obj2[key], delegationEquality)));
}

export function systemMetaDataEncryptedEquality(obj1?: SystemMetaDataEncrypted, obj2?: SystemMetaDataEncrypted): boolean {
  return (!obj1 && !obj2) || (!!obj1 && !!obj2 && ((!obj1.secretForeignKeys && !obj2.secretForeignKeys) ||
      (!!obj1.secretForeignKeys && !!obj2.secretForeignKeys && obj1.secretForeignKeys.length === obj2.secretForeignKeys.length &&
      obj1.secretForeignKeys.every( (val, _) => obj2.secretForeignKeys.includes(val)))) &&
    metaDataObjectEquality(obj1.cryptedForeignKeys, obj2.cryptedForeignKeys) &&
    metaDataObjectEquality(obj1.delegations, obj2.delegations) &&
    metaDataObjectEquality(obj1.encryptionKeys, obj2.encryptionKeys));
}
