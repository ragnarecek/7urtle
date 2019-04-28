import * as λ from '../src';

test('Maybe.of() outputs instance of Maybe.', () => {
  expect(λ.Maybe.of(3) instanceof λ.Maybe).toBe(true);
});

test('Maybe.of(a) outputs Just for an input a that is not null or undefined.', () => {
  expect(λ.Maybe.of(3).inspect()).toBe('Just(3)');
});

test('Maybe.of(a) outputs Nothing for an input a that is null or undefined.', () => {
  expect(λ.Maybe.of(null).inspect()).toBe('Nothing');
  expect(λ.Maybe.of(undefined).inspect()).toBe('Nothing');
});

test('Maybe.of(a).isJust() of an input a outputs true for a value that is not null or undefined.', () => {
  expect(λ.Maybe.of(3).isJust()).toBe(true);
});

test('Maybe.of(a).isNothing() of an input a outputs true for a value that is null or undefined.', () => {
  expect(λ.Maybe.of(null).isNothing()).toBe(true);
  expect(λ.Maybe.of(undefined).isNothing()).toBe(true);
});

test('Maybe.of(a).map(a -> b) executes function over Maybe input a.', () => {
  expect(λ.Maybe.of(3).map(a => a + 2).inspect()).toBe('Just(5)');
});

test('Maybe.of(a).map(a -> b) hides over null, undefined, empty string and empty array values.', () => {
  expect(λ.Maybe.of(null).map(a => a + 2).inspect()).toBe('Nothing');
  expect(λ.Maybe.of(undefined).map(a => a + 2).inspect()).toBe('Nothing');
  expect(λ.Maybe.of('').map(a => a + 2).inspect()).toBe('Nothing');
  expect(λ.Maybe.of([]).map(a => a + 2).inspect()).toBe('Nothing');
});

test('Maybe.of(a).chain(a -> b) executes function over Maybe input a returns its raw value through join.', () => {
  expect(λ.Maybe.of(3).chain(a => a + 2)).toBe(5);
  expect(λ.Maybe.of(λ.Maybe.of(3).chain(a => a + 2)).inspect()).toBe('Just(5)');
});