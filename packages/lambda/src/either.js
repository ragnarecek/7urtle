import {deepInspect} from "./utils";
import {identity} from "./core";

/**
 * Either.of() outputs instance of Either.
 * Either.of(a) outputs instance of Right holding its input value.
 * Either.Right(a) outputs instance of Right holding its input value.
 * Either.Left(a) outputs instance of Left holding its input value.
 * Either.of(a).isRight() always outputs true.
 * Either.Left(a).isLeft() outputs false if Either is Left.
 * Either.try(a -> b) outputs Right(b) if no error is thrown.
 * Either.try(a -> b) outputs Left(e.message) if error is thrown.
 * Either.of(a).map(a -> b) executes function over Either input a.
 * Either.Left(a).map(a -> b) does not execute provided function and retains Left input value.
 * Either.of(a).chain(a -> b) executes function over Either input a returns its raw value through join.
 * Either.Left(a).chain(a -> b) does not execute provided function and retains Left input value.
 */
export class Either {
  constructor(x) {
    this.value = x;
  }

  static of(x) {
    return new Right(x);
  }

  static Right(x) {
    return new Right(x);
  }

  static Left(x) {
    return new Left(x);
  }

  static try(fn) {
    try {
      return new Right(fn());
    } catch(e) {
      return new Left(e.message);
    }
  }
}

class Left extends Either {
  inspect() {
    return `Left(${deepInspect(this.value)})`;
  }

  isLeft() {
    return true;
  }

  isRight() {
    return false;
  }

  map() {
    return this;
  }

  ap() {
    return this;
  }

  chain() {
    return this;
  }

  join() {
    return this;
  }

  sequence(of) {
    return of(this);
  }

  traverse(of, fn) {
    return of(this);
  }
}

class Right extends Either {
  inspect() {
    return `Right(${deepInspect(this.value)})`;
  }

  isLeft() {
    return false;
  }

  isRight() {
    return true;
  }

  map(fn) {
    return Either.of(fn(this.value));
  }

  ap(f) {
    return f.map(this.value);
  }

  chain(fn) {
    return fn(this.value);
  }

  join() {
    return this.value;
  }

  sequence(of) {
    return this.traverse(of, identity);
  }

  traverse(of, fn) {
    fn(this.value).map(Either.of);
  }
}