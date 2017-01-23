# resolve-call [![Join the chat at https://gitter.im/ZenyWay/resolve-call](https://badges.gitter.im/ZenyWay/resolve-call.svg)](https://gitter.im/ZenyWay/resolve-call?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![NPM](https://nodei.co/npm/resolve-call.png?compact=true)](https://nodei.co/npm/resolve-call/)
[![build status](https://travis-ci.org/ZenyWay/resolve-call.svg?branch=master)](https://travis-ci.org/ZenyWay/resolve-call)
[![coverage status](https://coveralls.io/repos/github/ZenyWay/resolve-call/badge.svg?branch=master)](https://coveralls.io/github/ZenyWay/resolve-call)
[![Dependency Status](https://gemnasium.com/badges/github.com/ZenyWay/resolve-call.svg)](https://gemnasium.com/github.com/ZenyWay/resolve-call)

`Promise.resolve` for functions:
turn any function into one that runs when its arguments are resolved,
and write async code that reads like synchronous code.

# <a name="example"></a> example
```ts
import resolve from '../../src'
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
```
the files of this example are available [here](./spec/example).

a live version of this example can be viewed [here](https://cdn.rawgit.com/ZenyWay/resolve-call/v1.0.0/spec/example/index.html)
in the browser console,
or by cloning this repository and running the following commands from a terminal:
```bash
npm install
npm run example
```

# <a name="api"></a> API v1.0 stable
`ES5` and [`Typescript`](http://www.typescriptlang.org/) compatible.
coded in `Typescript 2`, transpiled to `ES5`.

```ts
function resolve <T>(fn: (...args: any[]) => T|Promise<T>): (...args: any[]) => Promise<T>
```

throws a `TypeError` "argument is not a function" when `fn` is not a function.

for a detailed specification of the API,
run the [unit tests](https://cdn.rawgit.com/ZenyWay/resolve-call/v1.0.0/spec/web/index.html)
in your browser.

# <a name="contributing"></a> CONTRIBUTING
see the [contribution guidelines](./CONTRIBUTING.md)

# <a name="license"></a> LICENSE
Copyright 2017 Stéphane M. Catala

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the [License](./LICENSE) for the specific language governing permissions and
Limitations under the License.
