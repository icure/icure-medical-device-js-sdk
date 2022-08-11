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

const firstDelegation = () => new Delegation({
  tags: ["a", "b"],
  owner: "owner",
  delegatedTo: "delegate",
  key: "key"
});

const firstDelegationWithNullTags = () => new Delegation({
  owner: "owner",
  delegatedTo: "delegate",
  key: "key"
});

const metaData1 = () => new SystemMetaDataEncrypted({
  secretForeignKeys: ["s1", "s2"],
  cryptedForeignKeys: {"key1": new Set([new Delegation({owner: "o"})])},
  delegations: {"key2": new Set([new Delegation({owner: "o"}), new Delegation({owner: "o2"})])},
  encryptionKeys: {"key3": new Set([new Delegation({owner: "o2"})]), "key4": new Set([new Delegation({owner: "o3"})])}
});

describe("Equality functions test", () => {
  it("setEquality should be able to check if two sets are equal", () => {
    assert(setEquality<DummyData>(firstSet(), firstSet(), dummyDataEquality));
  });

  it("setEquality should be able to check if two sets are equal independently from the order of the elements", () => {
    assert(setEquality<DummyData>(
      firstSet(),
      new Set<DummyData>([new DummyData("c", "d"), new DummyData("a", "b")]),
      dummyDataEquality)
    );
  });

  it("setEquality should fail if the Sets have different lengths", () => {
    assert(!setEquality<DummyData>(
      firstSet(),
      new Set<DummyData>([new DummyData("a", "b")]),
      dummyDataEquality)
    );
  });

  it("setEquality should fail if the Sets have different elements", () => {
    assert(!setEquality<DummyData>(
      firstSet(),
      new Set<DummyData>([new DummyData("a", "b"), new DummyData("a", "b")]),
      dummyDataEquality)
    );
  });

  it("delegationEquality should be able to check if two Delegations are equal", () => {
    assert(delegationEquality(firstDelegation(), firstDelegation()));
  });

  it("delegationEquality should be able to check if two Delegations are equal if the tags are in different order", () => {
    assert(delegationEquality(
      new Delegation({tags: ["b", "a"]}),
      new Delegation({tags: ["a", "b"]})
      ));
  });

  it("delegationEquality should be able to check if two Delegations are tags are null", () => {
    assert(delegationEquality(firstDelegationWithNullTags(), firstDelegationWithNullTags()));
  });

  it("delegationEquality delegationEquality should return true if Delegations are empty", () => {
    assert(delegationEquality(new Delegation({}), new Delegation({})));
  });

  it("delegationEquality should fail if tags have different lengths", () => {
    assert(!delegationEquality(
      new Delegation({tags: ["b", "a", "c"]}),
      new Delegation({tags: ["a", "b"]}))
    );
  });

  it("delegationEquality should fail if tags have different elements", () => {
    assert(!delegationEquality(
      new Delegation({tags: ["b", "c"]}),
      new Delegation({tags: ["a", "b"]}))
    );
  });

  it("delegationEquality should fail if owner is different", () => {
    assert(!delegationEquality(
      new Delegation({owner: "owner"}),
      new Delegation({owner: "owner1"}))
    );
  });

  it("delegationEquality should fail if delegatedTo is different", () => {
    assert(!delegationEquality(
      new Delegation({delegatedTo: "delegate"}),
      new Delegation({delegatedTo: "delegate1"}))
    );
  });

  it("delegationEquality should fail if key is different", () => {
    assert(!delegationEquality(
      new Delegation({key: "key"}),
      new Delegation({key: "key2"})));
  });

  it("systemMetaDataEncryptedEquality should be able to check if two systemMetaDataEncrypted are equal", () => {
    assert(systemMetaDataEncryptedEquality(metaData1(), metaData1()));
  });

  it("systemMetaDataEncryptedEquality should be able to check if two systemMetaDataEncrypted are equal if secretForeignKeys are in different order", () => {
    assert(systemMetaDataEncryptedEquality(
      new SystemMetaDataEncrypted({secretForeignKeys: ["s2", "s1"]}),
      new SystemMetaDataEncrypted({secretForeignKeys: ["s1", "s2"]})
      ));
  });

  it("systemMetaDataEncryptedEquality should be able to check if two systemMetaDataEncrypted are equal if they are empty", () => {
    assert(systemMetaDataEncryptedEquality(new SystemMetaDataEncrypted({}), new SystemMetaDataEncrypted({})));
  });

  it("systemMetaDataEncryptedEquality should be able to check if two systemMetaDataEncrypted are equal if they are undefined", () => {
    assert(systemMetaDataEncryptedEquality());
  });

  it("systemMetaDataEncryptedEquality should fail if two systemMetaDataEncrypted are equal if secretForeignKeys have different lengths", () => {
    assert(!systemMetaDataEncryptedEquality(
      new SystemMetaDataEncrypted({secretForeignKeys: ["s2", "s1", "s3"]}),
      new SystemMetaDataEncrypted({secretForeignKeys: ["s1", "s2"]})
      ));
  });

  it("systemMetaDataEncryptedEquality should fail if two systemMetaDataEncrypted are equal if secretForeignKeys have different elements", () => {
    assert(!systemMetaDataEncryptedEquality(
      new SystemMetaDataEncrypted({secretForeignKeys: ["s2", "s3"]}),
      new SystemMetaDataEncrypted({secretForeignKeys: ["s1", "s2"]})
      ));
  });

  it("systemMetaDataEncryptedEquality should fail if two systemMetaDataEncrypted are equal if cryptedForeignKeys have different keys", () => {
    assert(!systemMetaDataEncryptedEquality(
      new SystemMetaDataEncrypted({cryptedForeignKeys: {"key1": new Set([new Delegation({owner: "o"})])}}),
      new SystemMetaDataEncrypted({cryptedForeignKeys: {"key2": new Set([new Delegation({owner: "o"})])}})
      ));
  });

  it("systemMetaDataEncryptedEquality should fail if two systemMetaDataEncrypted are equal if cryptedForeignKeys have different number of keys", () => {
    assert(!systemMetaDataEncryptedEquality(
      new SystemMetaDataEncrypted({cryptedForeignKeys: {"key1": new Set([new Delegation({owner: "o"})])}}),
      new SystemMetaDataEncrypted({cryptedForeignKeys: {"key2": new Set([new Delegation({owner: "o"})]), "key1": new Set([new Delegation({owner: "o"})])}}))
    );
  });

  it("systemMetaDataEncryptedEquality should fail if two systemMetaDataEncrypted are equal if cryptedForeignKeys have different elements", () => {
    assert(!systemMetaDataEncryptedEquality(
      new SystemMetaDataEncrypted({cryptedForeignKeys: {"key1": new Set([new Delegation({owner: "o"})])}}),
      new SystemMetaDataEncrypted({cryptedForeignKeys: {"key1": new Set([new Delegation({owner: "o1"})])}})
      ));
  });

  it("systemMetaDataEncryptedEquality should fail if two systemMetaDataEncrypted are equal if delegations have different keys", () => {
    assert(!systemMetaDataEncryptedEquality(
      new SystemMetaDataEncrypted({delegations: {"key1": new Set([new Delegation({owner: "o"})])}}),
      new SystemMetaDataEncrypted({delegations: {"key2": new Set([new Delegation({owner: "o"})])}})
      ));
  });

  it("systemMetaDataEncryptedEquality should fail if two systemMetaDataEncrypted are equal if delegations have different number of keys", () => {
    assert(!systemMetaDataEncryptedEquality(
      new SystemMetaDataEncrypted({delegations: {"key1": new Set([new Delegation({owner: "o"})])}}),
      new SystemMetaDataEncrypted({delegations: {"key2": new Set([new Delegation({owner: "o"})]), "key1": new Set([new Delegation({owner: "o"})])}})
      ));
  });

  it("systemMetaDataEncryptedEquality should fail if two systemMetaDataEncrypted are equal if delegations have different elements", () => {
    assert(!systemMetaDataEncryptedEquality(
      new SystemMetaDataEncrypted({delegations: {"key1": new Set([new Delegation({owner: "o"})])}}),
      new SystemMetaDataEncrypted({delegations: {"key1": new Set([new Delegation({owner: "o1"})])}})
    ));
  });

  it("systemMetaDataEncryptedEquality should fail if two systemMetaDataEncrypted are equal if encryptionKeys have different keys", () => {
    assert(!systemMetaDataEncryptedEquality(
      new SystemMetaDataEncrypted({encryptionKeys: {"key1": new Set([new Delegation({owner: "o"})])}}),
      new SystemMetaDataEncrypted({encryptionKeys: {"key2": new Set([new Delegation({owner: "o"})])}})
      ));
  });

  it("systemMetaDataEncryptedEquality should fail if two systemMetaDataEncrypted are equal if encryptionKeys have different number of keys", () => {
    assert(!systemMetaDataEncryptedEquality(
      new SystemMetaDataEncrypted({encryptionKeys: {"key1": new Set([new Delegation({owner: "o"})])}}),
      new SystemMetaDataEncrypted({encryptionKeys: {"key2": new Set([new Delegation({owner: "o"})]), "key1": new Set([new Delegation({owner: "o"})])}})
    ));
  });

  it("systemMetaDataEncryptedEquality should fail if two systemMetaDataEncrypted are equal if encryptionKeys have different elements", () => {
    assert(!systemMetaDataEncryptedEquality(
      new SystemMetaDataEncrypted({encryptionKeys: {"key1": new Set([new Delegation({owner: "o"})])}}),
      new SystemMetaDataEncrypted({encryptionKeys: {"key1": new Set([new Delegation({owner: "o1"})])}})
      ));
  });

});
