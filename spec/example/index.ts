/**
 * Copyright 2018 Stephane M. Catala
 * @author Stephane M. Catala
 * @license Apache@2.0
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
//
import getResolve from '../../src'
const { fetch } = require('fetch-ponyfill')()
import logsync from './console'
const resolve = getResolve()
const log = resolve(logsync('example:'))

// extract JSON from fetch result
const getJson = resolve(
  (result: any) => result && (typeof result.json === 'function') && result.json()
)

// extract user object from randomuser api result
const getUser = resolve(
  ({ results }) => Array.isArray(results) && results[0]
)

const result = getJson(fetch('https://randomuser.me/api/?inc=name,email,dob&noinfo')) // Promise
const user = getUser(result) // Promise
log(user) // { "dob": "...", "email": "...", "name": { ... } }
