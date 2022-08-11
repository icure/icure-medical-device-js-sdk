import {assert} from "chai";
import {delegationEquality, setEquality, systemMetaDataEncryptedEquality} from "../../src/utils/equality";
import {Delegation} from "../../src/models/Delegation";
import {SystemMetaDataEncrypted} from "../../src/models/SystemMetaDataEncrypted";

class DummyData {
  constructor(
    public field1: string,
    public field2: string
  ) {}
}

function dummyDataEquality(obj1: DummyData, obj2: DummyData): boolean {
  return obj1.field1 === obj2.field1 && obj1.field2 === obj2.field2;
}

const firstSet = () => new Set<DummyData>([new DummyData("a", "b"), new DummyData("c", "d")]);

describe("Equality functions test", () => {
  it("setEquality should be able to check if two sets are equal", () => {
    assert(setEquality<DummyData>(firstSet(), firstSet(), dummyDataEquality));
  });

  it("setEquality should be able to check if two sets are equal independently from the order of the elements", () => {
    const secondSet = new Set<DummyData>([new DummyData("c", "d"), new DummyData("a", "b")]);
    assert(setEquality<DummyData>(firstSet(), secondSet, dummyDataEquality));
  });

  it("setEquality should fail if the Sets have different lengths", () => {
    const secondSet = new Set<DummyData>([new DummyData("a", "b")]);
    assert(!setEquality<DummyData>(firstSet(), secondSet, dummyDataEquality));
  });

  it("setEquality should fail if the Sets have different elements", () => {
    const secondSet = new Set<DummyData>([new DummyData("a", "b"), new DummyData("a", "b")]);
    assert(!setEquality<DummyData>(firstSet(), secondSet, dummyDataEquality));
  });

  it("delegationEquality should be able to check if two Delegations are equal", () => {
    const firstDelegation = new Delegation({
      tags: ["a", "b"],
      owner: "owner",
      delegatedTo: "delegate",
      key: "key"
    });
    const secondDelegation = new Delegation({
      tags: ["a", "b"],
      owner: "owner",
      delegatedTo: "delegate",
      key: "key"
    });
    assert(delegationEquality(firstDelegation, secondDelegation));
  });

  it("delegationEquality should be able to check if two Delegations are equal if the tags are in different order", () => {
    const firstDelegation = new Delegation({
      tags: ["b", "a"]
    });
    const secondDelegation = new Delegation({
      tags: ["a", "b"]
    });
    assert(delegationEquality(firstDelegation, secondDelegation));
  });

  it("delegationEquality should be able to check if two Delegations are tags are null", () => {
    const firstDelegation = new Delegation({
      owner: "owner",
      delegatedTo: "delegate",
      key: "key"
    });
    const secondDelegation = new Delegation({
      owner: "owner",
      delegatedTo: "delegate",
      key: "key"
    });
    assert(delegationEquality(firstDelegation, secondDelegation));
  });

  it("delegationEquality delegationEquality should return true if Delegations are empty", () => {
    assert(delegationEquality(new Delegation({}), new Delegation({})));
  });

  it("delegationEquality should fail if tags have different lengths", () => {
    const firstDelegation = new Delegation({
      tags: ["b", "a", "c"]
    });
    const secondDelegation = new Delegation({
      tags: ["a", "b"]
    });
    assert(!delegationEquality(firstDelegation, secondDelegation));
  });

  it("delegationEquality should fail if tags have different elements", () => {
    const firstDelegation = new Delegation({
      tags: ["b", "c"]
    });
    const secondDelegation = new Delegation({
      tags: ["a", "b"]
    });
    assert(!delegationEquality(firstDelegation, secondDelegation));
  });

  it("delegationEquality should fail if owner is different", () => {
    const firstDelegation = new Delegation({
      owner: "owner",
    });
    const secondDelegation = new Delegation({
      owner: "owner1",
    });
    assert(!delegationEquality(firstDelegation, secondDelegation));
  });

  it("delegationEquality should fail if delegatedTo is different", () => {
    const firstDelegation = new Delegation({
      delegatedTo: "delegate",
    });
    const secondDelegation = new Delegation({
      delegatedTo: "delegate1",
    });
    assert(!delegationEquality(firstDelegation, secondDelegation));
  });

  it("delegationEquality should fail if key is different", () => {
    const firstDelegation = new Delegation({
      key: "key"
    });
    const secondDelegation = new Delegation({
      key: "key2"
    });
    assert(!delegationEquality(firstDelegation, secondDelegation));
  });

  it("systemMetaDataEncryptedEquality should be able to check if two systemMetaDataEncrypted are equal", () => {
    const metaData1 = new SystemMetaDataEncrypted({
      secretForeignKeys: ["s1", "s2"],
      cryptedForeignKeys: {"key1": new Set([new Delegation({owner: "o"})])},
      delegations: {"key2": new Set([new Delegation({owner: "o"}), new Delegation({owner: "o2"})])},
      encryptionKeys: {"key3": new Set([new Delegation({owner: "o2"})]), "key4": new Set([new Delegation({owner: "o3"})])}
    });
    const metaData2 = new SystemMetaDataEncrypted({
      secretForeignKeys: ["s1", "s2"],
      cryptedForeignKeys: {"key1": new Set([new Delegation({owner: "o"})])},
      delegations: {"key2": new Set([new Delegation({owner: "o"}), new Delegation({owner: "o2"})])},
      encryptionKeys: {"key3": new Set([new Delegation({owner: "o2"})]), "key4": new Set([new Delegation({owner: "o3"})])}
    });
    assert(systemMetaDataEncryptedEquality(metaData1, metaData2));
  });

  it("systemMetaDataEncryptedEquality should be able to check if two systemMetaDataEncrypted are equal if secretForeignKeys are in different order", () => {
    const metaData1 = new SystemMetaDataEncrypted({
      secretForeignKeys: ["s2", "s1"]
    });
    const metaData2 = new SystemMetaDataEncrypted({
      secretForeignKeys: ["s1", "s2"]
    });
    assert(systemMetaDataEncryptedEquality(metaData1, metaData2));
  });

  it("systemMetaDataEncryptedEquality should be able to check if two systemMetaDataEncrypted are equal if they are empty", () => {
    assert(systemMetaDataEncryptedEquality(new SystemMetaDataEncrypted({}), new SystemMetaDataEncrypted({})));
  });

  it("systemMetaDataEncryptedEquality should be able to check if two systemMetaDataEncrypted are equal if they are undefined", () => {
    assert(systemMetaDataEncryptedEquality());
  });

  it("systemMetaDataEncryptedEquality should fail if two systemMetaDataEncrypted are equal if secretForeignKeys have different lengths", () => {
    const metaData1 = new SystemMetaDataEncrypted({
      secretForeignKeys: ["s2", "s1", "s3"]
    });
    const metaData2 = new SystemMetaDataEncrypted({
      secretForeignKeys: ["s1", "s2"]
    });
    assert(!systemMetaDataEncryptedEquality(metaData1, metaData2));
  });

  it("systemMetaDataEncryptedEquality should fail if two systemMetaDataEncrypted are equal if secretForeignKeys have different elements", () => {
    const metaData1 = new SystemMetaDataEncrypted({
      secretForeignKeys: ["s2", "s3"]
    });
    const metaData2 = new SystemMetaDataEncrypted({
      secretForeignKeys: ["s1", "s2"]
    });
    assert(!systemMetaDataEncryptedEquality(metaData1, metaData2));
  });

  it("systemMetaDataEncryptedEquality should fail if two systemMetaDataEncrypted are equal if cryptedForeignKeys have different keys", () => {
    const metaData1 = new SystemMetaDataEncrypted({
      cryptedForeignKeys: {"key1": new Set([new Delegation({owner: "o"})])},
    });
    const metaData2 = new SystemMetaDataEncrypted({
      cryptedForeignKeys: {"key2": new Set([new Delegation({owner: "o"})])},
    });
    assert(!systemMetaDataEncryptedEquality(metaData1, metaData2));
  });

  it("systemMetaDataEncryptedEquality should fail if two systemMetaDataEncrypted are equal if cryptedForeignKeys have different number of keys", () => {
    const metaData1 = new SystemMetaDataEncrypted({
      cryptedForeignKeys: {"key1": new Set([new Delegation({owner: "o"})])},
    });
    const metaData2 = new SystemMetaDataEncrypted({
      cryptedForeignKeys: {"key2": new Set([new Delegation({owner: "o"})]), "key1": new Set([new Delegation({owner: "o"})])},
    });
    assert(!systemMetaDataEncryptedEquality(metaData1, metaData2));
  });

  it("systemMetaDataEncryptedEquality should fail if two systemMetaDataEncrypted are equal if cryptedForeignKeys have different elements", () => {
    const metaData1 = new SystemMetaDataEncrypted({
      cryptedForeignKeys: {"key1": new Set([new Delegation({owner: "o"})])},
    });
    const metaData2 = new SystemMetaDataEncrypted({
      cryptedForeignKeys: {"key1": new Set([new Delegation({owner: "o1"})])},
    });
    assert(!systemMetaDataEncryptedEquality(metaData1, metaData2));
  });

  it("systemMetaDataEncryptedEquality should fail if two systemMetaDataEncrypted are equal if delegations have different keys", () => {
    const metaData1 = new SystemMetaDataEncrypted({
      delegations: {"key1": new Set([new Delegation({owner: "o"})])},
    });
    const metaData2 = new SystemMetaDataEncrypted({
      delegations: {"key2": new Set([new Delegation({owner: "o"})])},
    });
    assert(!systemMetaDataEncryptedEquality(metaData1, metaData2));
  });

  it("systemMetaDataEncryptedEquality should fail if two systemMetaDataEncrypted are equal if delegations have different number of keys", () => {
    const metaData1 = new SystemMetaDataEncrypted({
      delegations: {"key1": new Set([new Delegation({owner: "o"})])},
    });
    const metaData2 = new SystemMetaDataEncrypted({
      delegations: {"key2": new Set([new Delegation({owner: "o"})]), "key1": new Set([new Delegation({owner: "o"})])},
    });
    assert(!systemMetaDataEncryptedEquality(metaData1, metaData2));
  });

  it("systemMetaDataEncryptedEquality should fail if two systemMetaDataEncrypted are equal if delegations have different elements", () => {
    const metaData1 = new SystemMetaDataEncrypted({
      delegations: {"key1": new Set([new Delegation({owner: "o"})])},
    });
    const metaData2 = new SystemMetaDataEncrypted({
      delegations: {"key1": new Set([new Delegation({owner: "o1"})])},
    });
    assert(!systemMetaDataEncryptedEquality(metaData1, metaData2));
  });

  it("systemMetaDataEncryptedEquality should fail if two systemMetaDataEncrypted are equal if encryptionKeys have different keys", () => {
    const metaData1 = new SystemMetaDataEncrypted({
      encryptionKeys: {"key1": new Set([new Delegation({owner: "o"})])},
    });
    const metaData2 = new SystemMetaDataEncrypted({
      encryptionKeys: {"key2": new Set([new Delegation({owner: "o"})])},
    });
    assert(!systemMetaDataEncryptedEquality(metaData1, metaData2));
  });

  it("systemMetaDataEncryptedEquality should fail if two systemMetaDataEncrypted are equal if encryptionKeys have different number of keys", () => {
    const metaData1 = new SystemMetaDataEncrypted({
      encryptionKeys: {"key1": new Set([new Delegation({owner: "o"})])},
    });
    const metaData2 = new SystemMetaDataEncrypted({
      encryptionKeys: {"key2": new Set([new Delegation({owner: "o"})]), "key1": new Set([new Delegation({owner: "o"})])},
    });
    assert(!systemMetaDataEncryptedEquality(metaData1, metaData2));
  });

  it("systemMetaDataEncryptedEquality should fail if two systemMetaDataEncrypted are equal if encryptionKeys have different elements", () => {
    const metaData1 = new SystemMetaDataEncrypted({
      encryptionKeys: {"key1": new Set([new Delegation({owner: "o"})])},
    });
    const metaData2 = new SystemMetaDataEncrypted({
      encryptionKeys: {"key1": new Set([new Delegation({owner: "o1"})])},
    });
    assert(!systemMetaDataEncryptedEquality(metaData1, metaData2));
  });

});
