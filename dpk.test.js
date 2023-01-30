const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns '1' as partitionKey the when event.partitionKey = '1'", () => {
    const key = deterministicPartitionKey({partitionKey:"1"});
    expect(key).toBe("1");
  });

  it("Returns 'hex hash' as partitionKey the when event.partitionKey is long sting", () => {
    const partitionKey = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" 
    + "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" 
    + "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    +"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    + "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    const key = deterministicPartitionKey({partitionKey});
    expect(key).toBe("e77f907f80c86c9b5189479c07f8bbb29d8e95fe14f9b44ec4070f0594a97a8f12f5b193513e59f7e2120601c3a09fcfdfea234b4df85806e58cf2e4255c058c");
  });

  // Since it is number it will be stringified
  it("Returns '1' as partitionKey the when event.partitionKey = 1", () => {
    const key = deterministicPartitionKey({partitionKey: 1});
    expect(key).toBe("1");
  });

  // Since it is object it will be stringified
  it('Returns "{"obj":1}" as partitionKey the when event.partitionKey = {obj:1}', () => {
    const key = deterministicPartitionKey({partitionKey: {obj:1}});
    expect(key).toBe('{"obj":1}');
  });
  // No partitionKey 
  it('Returns hash  as partitionKey the when event.partitionKey is undefined  {eventId:1}', () => {
    const key = deterministicPartitionKey({eventId: 1});
    // https://emn178.github.io/online-tools/sha3_512.html Check Sha value match from here.
    expect(key).toBe('df37c6e0979a67b76777fea67ddb61c322a9e63e61339df2165b0859996a188e9ef7e4d79ef35a5aa27d4f9c31625d186802c0a758df65b7c86a354b7179bece');
  });
});
