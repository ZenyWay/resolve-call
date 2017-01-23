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
import getResolve from '../../src'
const resolve = getResolve()
const { fetch } = require('fetch-ponyfill')()
import debug = require('debug')
const log = resolve(debug('example:'))

const getJson = resolve((result: any) => // extract JSON from fetch result
  result && (typeof result.json === 'function') && result.json())

const getUser = resolve((users: any) => // extract user object from randomuser api result
  Array.isArray(users.results) && users.results[0])

const users = getJson(fetch('https://randomuser.me/api/?inc=name,email,dob&noinfo')) // Promise
const user = getUser(users) // Promise
log(user) // { "dob": "...", "email": "...", "name": { ... } }
