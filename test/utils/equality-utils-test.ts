import {assert} from "chai";
import {
  deepEquality,
} from "../../src/utils/equality";
import {Delegation} from "../../src/models/Delegation";
import {SystemMetaDataEncrypted} from "../../src/models/SystemMetaDataEncrypted";

class DummyData {
  constructor(
    public field1: string,
    public field2: string
  ) {}
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
  it("deepEquality should be able to check if two sets are equal", () => {
    assert(deepEquality(firstSet(), firstSet()));
  });

  it("deepEquality should be able to check if two sets are equal independently from the order of the elements", () => {
    assert(deepEquality(
      firstSet(),
      new Set<DummyData>([new DummyData("c", "d"), new DummyData("a", "b")]))
    );
  });

  it("deepEquality should fail if the Sets have different lengths", () => {
    assert(!deepEquality(
      firstSet(),
      new Set<DummyData>([new DummyData("a", "b")]))
    );
  });

  it("deepEquality should fail if the Sets have different elements", () => {
    assert(!deepEquality(
      firstSet(),
      new Set<DummyData>([new DummyData("a", "b"), new DummyData("a", "b")]))
    );
  });

  it("deepEquality should be able to check if two Delegations are equal", () => {
    assert(deepEquality(firstDelegation(), firstDelegation()));
  });

  it("deepEquality should be able to check if two Delegations are equal if the tags are in different order", () => {
    assert(deepEquality(
      new Delegation({tags: ["b", "a"]}),
      new Delegation({tags: ["a", "b"]})
      ));
  });

  it("deepEquality should be able to check if two Delegations are tags are null", () => {
    assert(deepEquality(firstDelegationWithNullTags(), firstDelegationWithNullTags()));
  });

  it("deepEquality delegationEquality should return true if Delegations are empty", () => {
    assert(deepEquality(new Delegation({}), new Delegation({})));
  });

  it("deepEquality should fail if tags have different lengths", () => {
    assert(!deepEquality(
      new Delegation({tags: ["b", "a", "c"]}),
      new Delegation({tags: ["a", "b"]}))
    );
  });

  it("deepEquality should fail if tags have different elements", () => {
    assert(!deepEquality(
      new Delegation({tags: ["b", "c"]}),
      new Delegation({tags: ["a", "b"]}))
    );
  });

  it("deepEquality should fail if owner is different", () => {
    assert(!deepEquality(
      new Delegation({owner: "owner"}),
      new Delegation({owner: "owner1"}))
    );
  });

  it("deepEquality should fail if delegatedTo is different", () => {
    assert(!deepEquality(
      new Delegation({delegatedTo: "delegate"}),
      new Delegation({delegatedTo: "delegate1"}))
    );
  });

  it("deepEquality should fail if key is different", () => {
    assert(!deepEquality(
      new Delegation({key: "key"}),
      new Delegation({key: "key2"})));
  });

  it("deepEquality should be able to check if two systemMetaDataEncrypted are equal", () => {
    assert(deepEquality(metaData1(), metaData1()));
  });

  it("deepEquality should be able to check if two systemMetaDataEncrypted are equal if secretForeignKeys are in different order", () => {
    assert(deepEquality(
      new SystemMetaDataEncrypted({secretForeignKeys: ["s2", "s1"]}),
      new SystemMetaDataEncrypted({secretForeignKeys: ["s1", "s2"]})
      ));
  });

  it("deepEquality should be able to check if two systemMetaDataEncrypted are equal if they are empty", () => {
    assert(deepEquality(new SystemMetaDataEncrypted({}), new SystemMetaDataEncrypted({})));
  });

  it("deepEquality should be able to check if two systemMetaDataEncrypted are equal if they are undefined", () => {
    assert(deepEquality());
  });

  it("deepEquality should fail if two systemMetaDataEncrypted are equal if secretForeignKeys have different lengths", () => {
    assert(!deepEquality(
      new SystemMetaDataEncrypted({secretForeignKeys: ["s2", "s1", "s3"]}),
      new SystemMetaDataEncrypted({secretForeignKeys: ["s1", "s2"]})
      ));
  });

  it("deepEquality should fail if two systemMetaDataEncrypted are equal if secretForeignKeys have different elements", () => {
    assert(!deepEquality(
      new SystemMetaDataEncrypted({secretForeignKeys: ["s2", "s3"]}),
      new SystemMetaDataEncrypted({secretForeignKeys: ["s1", "s2"]})
      ));
  });

  it("deepEquality should fail if two systemMetaDataEncrypted are equal if cryptedForeignKeys have different keys", () => {
    assert(!deepEquality(
      new SystemMetaDataEncrypted({cryptedForeignKeys: {"key1": new Set([new Delegation({owner: "o"})])}}),
      new SystemMetaDataEncrypted({cryptedForeignKeys: {"key2": new Set([new Delegation({owner: "o"})])}})
      ));
  });

  it("deepEquality should fail if two systemMetaDataEncrypted are equal if cryptedForeignKeys have different number of keys", () => {
    assert(!deepEquality(
      new SystemMetaDataEncrypted({cryptedForeignKeys: {"key1": new Set([new Delegation({owner: "o"})])}}),
      new SystemMetaDataEncrypted({cryptedForeignKeys: {"key2": new Set([new Delegation({owner: "o"})]), "key1": new Set([new Delegation({owner: "o"})])}}))
    );
  });

  it("deepEquality should fail if two systemMetaDataEncrypted are equal if cryptedForeignKeys have different elements", () => {
    assert(!deepEquality(
      new SystemMetaDataEncrypted({cryptedForeignKeys: {"key1": new Set([new Delegation({owner: "o"})])}}),
      new SystemMetaDataEncrypted({cryptedForeignKeys: {"key1": new Set([new Delegation({owner: "o1"})])}})
      ));
  });

  it("deepEquality should fail if two systemMetaDataEncrypted are equal if delegations have different keys", () => {
    assert(!deepEquality(
      new SystemMetaDataEncrypted({delegations: {"key1": new Set([new Delegation({owner: "o"})])}}),
      new SystemMetaDataEncrypted({delegations: {"key2": new Set([new Delegation({owner: "o"})])}})
      ));
  });

  it("deepEquality should fail if two systemMetaDataEncrypted are equal if delegations have different number of keys", () => {
    assert(!deepEquality(
      new SystemMetaDataEncrypted({delegations: {"key1": new Set([new Delegation({owner: "o"})])}}),
      new SystemMetaDataEncrypted({delegations: {"key2": new Set([new Delegation({owner: "o"})]), "key1": new Set([new Delegation({owner: "o"})])}})
      ));
  });

  it("deepEquality should fail if two systemMetaDataEncrypted are equal if delegations have different elements", () => {
    assert(!deepEquality(
      new SystemMetaDataEncrypted({delegations: {"key1": new Set([new Delegation({owner: "o"})])}}),
      new SystemMetaDataEncrypted({delegations: {"key1": new Set([new Delegation({owner: "o1"})])}})
    ));
  });

  it("deepEquality should fail if two systemMetaDataEncrypted are equal if encryptionKeys have different keys", () => {
    assert(!deepEquality(
      new SystemMetaDataEncrypted({encryptionKeys: {"key1": new Set([new Delegation({owner: "o"})])}}),
      new SystemMetaDataEncrypted({encryptionKeys: {"key2": new Set([new Delegation({owner: "o"})])}})
      ));
  });

  it("deepEquality should fail if two systemMetaDataEncrypted are equal if encryptionKeys have different number of keys", () => {
    assert(!deepEquality(
      new SystemMetaDataEncrypted({encryptionKeys: {"key1": new Set([new Delegation({owner: "o"})])}}),
      new SystemMetaDataEncrypted({encryptionKeys: {"key2": new Set([new Delegation({owner: "o"})]), "key1": new Set([new Delegation({owner: "o"})])}})
    ));
  });

  it("deepEquality should fail if two systemMetaDataEncrypted are equal if encryptionKeys have different elements", () => {
    assert(!deepEquality(
      new SystemMetaDataEncrypted({encryptionKeys: {"key1": new Set([new Delegation({owner: "o"})])}}),
      new SystemMetaDataEncrypted({encryptionKeys: {"key1": new Set([new Delegation({owner: "o1"})])}})
      ));
  });

});
