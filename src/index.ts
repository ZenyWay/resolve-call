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
export interface ResolveFactory {
  (opts?: Partial<ResolveSpec>): Resolve
}

export interface ResolveSpec {
  Promise: PromiseResolver
}

export interface PromiseResolver {
  all: typeof Promise.all
  resolve: typeof Promise.resolve
}

export interface Resolve {
  <T>(fn: (...args: any[]) => T|PromiseLike<T>): (...args: any[]) => PromiseLike<T>
}

const getResolve: ResolveFactory = function (opts?: Partial<ResolveSpec>): Resolve {
  const _Promise = getPromiseResolver(opts)

  return function <T>(fn: (...args: any[]) => T|PromiseLike<T>): (...args: any[]) => PromiseLike<T> {
    if (typeof fn !== 'function') {
      throw new TypeError('argument is not a function')
    }

    return function (...args: any[]): PromiseLike<T> {
      return _Promise.all(args.map((arg: any) => _Promise.resolve(arg)))
      .then(args => fn.apply(this, args))
    }
  }
}

function getPromiseResolver(opts?: Partial<ResolveSpec>): PromiseResolver {
  return opts && isValidPromiseResolver(opts.Promise) ? opts.Promise : Promise
}

function isValidPromiseResolver (val?: any): val is PromiseResolver {
  return !!val && isFunction(val.all) && isFunction(val.resolve)
}

function isFunction (val: any): val is Function {
  return typeof val === 'function'
}

export default getResolve
