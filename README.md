# Answer me
A question answering system

[![Build Status][travis-image]][travis-url] [![codecov][codecov-image]][codecov-url] [![Dependency Status][dependency-image]][dependency-url] [![Code Climate][climate-image]][climate-url] [![MIT License][license-image]][license-url]

## Goal
* You have a list of Question Answer pairs and
* You have to create a system that consumes the list then answer asked questions using the list

```js
const answerme = require('answerme');
answerme = new Answerme();

let question = 'How are you?', answers = ['I am good!', 'Fine! how are you?']; 
await answerme.register(question, answers);
```
```js
// ask a question
let  question = 'How are you?';
let predictedAnswer = await answerme.ask(question);
```
```js
// check to see if you know an answer to a given question
let question = 'How are you?', answer = 'I am good!';
let isCorrect = await answerme.answer(question, answer);
```

* Passing a QAPair storage source
```js
const GsheetAdapter = require('answerme').GsheetAdapter;
const answerme = require('answerme').AnswermeWithAdapter;
let spreadSheetId; // identity of the google sheet
let credentials; // contains 'client_id' and 'client_secret' , you download this from google developers console website 'https://console.developers.google.com/apis/credentials'
let tokenStore; // obsolute path to the folder where the generated token will be stored
const QASource = new GsheetAdapter(spreadSheetId, credentials, tokenStore);
answerme = new Answerme(QASource);
```


## Step by Step 

* Decide on what technology stack to use
    * The system is a `nodejs package`
    * We use `Typescript` as the coding language
    * We use `Rollup` as the build system (Babel plugins)
    * We use `jest` for testing

* Initialize the project
```sh
# in your terminal
mkdir answer-me
cd answer-me
npm init -y # this will create package.json file
```

* Create the project structure
```sh
# /- refers to the project root folder - "answer-me" in my case
/-
 | - __tests__
    | - index.js # we test javascript usage
    | - index.ts # Make sure our package can be used in other typescript projects
 | - src
    | - index.ts
 | - dist
    | - index.js
```

* Modify the *main entry* inside `package.json`
```javascript
// inside package.json
{
...
    "main": "dist/index.js"
...
}
```

* Install development related packages
```sh
# in your terminal
npm install --save-dev typescript
npm install --save-dev @types/node
npm install --save-dev rollup
npm install --save-dev rollup-plugin-node-resolve
npm install --save-dev rollup-plugin-babel
npm install --save-dev babel-preset-latest babel-plugin-external-helpers
npm install --save-dev rollup-plugin-typescript
npm install --save-dev rollup-plugin-eslint
npm install --save-dev rollup-plugin-replace
npm install --save-dev rollup-plugin-uglify
npm install --save-dev jest
npm install --save-dev ts-jest @types/jest
```

* Create Typescript configuration file `tsconfig.json`
```javascript
// inside package.json
// npm uses scripts from your node_modules/.bin folder
{
...
    "scripts": {
...
        "tsc:init": "tsc --init",
        "tsc:compile": "tsc"
...
    }
...    
}
```

```sh
# in your terminal
npm run tsc:init
```

* Modify the Typescript config file `tsconfig.json` so that it compiles to es6
```javascript
{
...
    "compilerOptions": {
        "module": "es6",
        "target": "es6"
    }
...
}
```

```json
// .babelrc
{
  "presets": [
    ["latest", {
      "es2015": {
        "modules": false
      }
    }]
  ],
  "plugins": ["external-helpers"]
}
```

* Add Jest configuration info to `package.json`
```javascript
// inside package.json
{
...
    "scripts": {
...
        "test": "jest --no-cache"
...
    }
...
    "jest": {
        "transform": {
            ".(ts|tsx)": "<rootDir>/node_modules/ts-jest/preprocessor.js"
        },
        "testRegex": "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
        "moduleFileExtensions": [
            "ts",
            "tsx",
            "js"
        ],
        "testResultsProcessor": "<rootDir>/node_modules/ts-jest/coverageprocessor.js"
    }
...
}
```

* Create a `rollup.config.js`
```sh
# in your terminal
touch rollup.config.js
```

* Add script content to the Rollup config file
```javascript
// Rollup plugins
import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';


export default {
    entry: 'compiled/index.js',
    dest: 'dist/index.js',
    format: 'cjs',
    exports: 'named',
    sourceMap: (process.env.NODE_ENV === 'production')? false: 'inline',
    plugins: [
        resolve({
            jsnext: true,
            main: true
        }),
        commonjs(),
        eslint({
            exclude: [
                'src/styles/**'
            ]
        }),
        babel({
            exclude: 'node_modules/**',
        }),
        replace({
            ENV: JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        (process.env.NODE_ENV === 'production' && uglify())
    ]
}
```

* Create a test for Javascript usage
```sh
# in your terminal
touch __tests__/index-test.js
```

```javascript
// inside __tests__/index-test.js
describe('Testing ask function of Question Answering System', function() {
    beforeEach(function() {
        console.log('About to run the index.js test');
    });
    // question: where is drake from?
    // answers: 'Canada', 'Toronto, Canada'
    test('the asked question has an answer', function() {
        var question = 'where is drake from?';
        var answers = ['Canada', 'Toronto', 'Toronto, Canada'];
        var QASource = [{ 
            question: question, 
            answers: answers
        }];
        var answerme = new Answerme(QASource);
        answerme.ask(question).then(predictedAnswer => {
            var realAnswers = answers;
            expect(realAnswers).toContain(predictedAnswer);
        });
    });
});
```

* Create a test for Typescript usage
```sh
# in your terminal
touch __tests__/index-test.ts
```

```typescript
// inside __tests__/index-test.ts
describe('Testing ask function of Question Answering System', () => {
    beforeEach(() => {
        console.log('About to run the index.ts test');
    });
    // question: where is drake from?
    // answers: 'Canada', 'Toronto, Canada'
    async test('the asked question has an answer', () => {
        const question = 'where is drake from?';
        let answers = ['Canada', 'Toronto', 'Toronto, Canada'];
        var QASource = [{ question, answers }];
        let answerme = new Answerme(QASource);
        let predictedAnswer = await answerme.ask(question)
        let realAnswers = answers;
        expect(realAnswers).toContain(predictedAnswer);
    });
});
```

* Run the tests *they should fail*
```sh
# in your terminal
npm test
```

* Write the required logic
```javascript
// inside src/index.ts
// we will have to create a class Answerme inside src/answerme/controller.ts
import { Answerme } from './answerme/controller';

Answerme.Answerme = Answerme;
export default Answerme;
```

* Add compile commands to package.json 
```javascript
// inside package.json 
// 1. compile .ts to es6 using typescript
// 2. compile es6 to es5 using rollup 
{
...
    "scripts": {
...
    "tsc:compile": "tsc",
    "rollup:build": "rollup -c",
    "build": "npm run tsc:compile && npm run rollup:build"
...
    }
...    
}
```

* Run the command
```sh
npm run build
```

* Run the tests again *they should pass!!*
```sh
# in your terminal
npm test
```



[travis-image]: https://travis-ci.org/CodeMuddle/npm-package-tutorial.svg?branch=master
[travis-url]: https://travis-ci.org/CodeMuddle/npm-package-tutorial

[codecov-image]: https://codecov.io/gh/CodeMuddle/npm-package-tutorial/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/CodeMuddle/npm-package-tutorial

[dependency-image]: https://gemnasium.com/badges/github.com/CodeMuddle/npm-package-tutorial.svg?style=flat
[dependency-url]: https://gemnasium.com/github.com/CodeMuddle/npm-package-tutorial

[climate-image]: https://codeclimate.com/github/CodeMuddle/npm-package-tutorial/badges/gpa.svg
[climate-url]: https://codeclimate.com/github/CodeMuddle/npm-package-tutorial

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE
