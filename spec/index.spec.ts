/*
 * Copyright 2017 Stephane M. Catala
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *  http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * Limitations under the License.
 */
;
import resolve from '../src'

interface Result<T> {
  value: T
  error: Error
}

describe('function resolve <T>(fn: (..args: any[]) => T|Promise<T>): ' +
'(..args: any[]) => Promise<T>', () => {
  describe('when called with a function', () => {
    let test: Function
    beforeEach(() => {
      test = () => resolve(() => {})
    })
    it('returns a function', () => {
      expect(test).not.toThrow()
      expect(test()).toEqual(jasmine.any(Function))
    })
  })

  describe('when called with an argument that is not a function', () => {
    let tests: Function[]
    beforeEach(() => {
      tests = [ null, undefined, true, 42, 'foo', {} ]
      .map<Function>(arg => resolve.bind(null, {}, arg))
    })
    it('throws an "argument is not a function" TypeError', () => {
      tests.forEach(test => {
        expect(test).toThrowError(TypeError, 'argument is not a function')
      })
    })
  })

  describe('the \'resolved\' function', () => {
    let fn: jasmine.Spy
    let resolved: Function
    let result: any
    beforeEach((done) => {
      fn = jasmine.createSpy('fn').and.returnValue(Promise.resolve('foo'))
      resolved = resolve<string>(fn).bind('this')
      resolved('bar', Promise.resolve('baz'), 42)
      .then((val: any) => result = val)
      .catch(done.fail)
      .then(done)
    })
    it('resolves its arguments then calls the original function ' +
    'with the resolved arguments', () => {
      expect(fn).toHaveBeenCalledWith('bar', 'baz', 42)
    })
    it('returns a Promise that resolves to the resolved result ' +
    'of the original function', () => {
      expect(result).toBe('foo')
    })
    it('binds the original function\'s `this` to its own `this`', () => {
      expect(fn.calls.all()).toEqual([
        jasmine.objectContaining({ object: 'this' })
      ])
    })
  })
})
