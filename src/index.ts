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
export type GenericFunction<T> = (...args: any[]) => T

export default function resolve <T>(fn: (...args: any[]) => T|Promise<T>): (...args: any[]) => Promise<T> {
  if (typeof fn !== 'function') {
    throw new TypeError('argument is not a function')
  }

  return function (...args: any[]): Promise<T> {
    return Promise.all(args.map((arg: any) => Promise.resolve(arg)))
    .then(args => fn.apply(this, args))
  }
}
