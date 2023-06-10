const Square = require("../../src/pointlike/square").default;

test('Square string serialize and deserialize (`h8`)', () => {
    expect(Square.fromString("h8").toString()).toBe("h8");
});

test('Square int serialize and deserialize (18)', () => {
    expect(Square.fromNum(18).toNum()).toBe(18);
});

test('Square int serialize and deserialize (8)', () => {
    expect(Square.fromNum(8).toNum()).toBe(8);
});

test('Square fromString and fromNum comparison', () => {
    expect(Square.fromString("b2").equals(Square.fromNum(9))).toBe(true);
});

test('Square fromString to num', () => {
    expect(Square.fromString("h8").toNum()).toBe(63);
});

test('Square ultimate deserialization and serialization', () => {
    // str -> square -> str -> square -> int -> square -> int -> str
    expect(Square.fromNum(Square.fromNum(Square.fromString(Square.fromString("h1").toString()).toNum()).toNum()).toString()).toBe("h1");
});
