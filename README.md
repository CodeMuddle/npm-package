# Sakwe Sakwe

## Goal
* You have a list of Question Answer pairs and
* You have to create a system that consumes the list then answer asked questions using the list

## Step by Step 

* Decide on what technology stack to use
    * The system is a `nodejs package`
    * We use `Typescript` as the coding language
    * We use `Gulp` as the build system (along with Typescript and Babel plugins)
    * We use `jest` for testing

* Initialize the project
```sh
# in your terminal
mkdir sakwesakwe
cd sakwesakwe
npm init -y
```

* Create the project structure
```sh
/-
 | - __tests__
    | - index.js # we test javascript usage
    | - index.ts # Make sure our package can be used in other typescript projects
 | - src
    | - index.ts
 | - dist
    | - index.js
```

* Install development related packages
```sh
npm install --save-dev typescript
npm install --save-dev @types/node
npm install --save-dev gulp-cli
npm install --save-dev gulp
npm install --save-dev gulp-sourcemaps
npm install --save-dev gulp-typescript
npm install --save-dev gulp-babel babel-plugin-transform-runtime babel-preset-es2015
npm install --save-dev jest
npm install --save-dev ts-jest @types/jest
```

* Create Typescript configuration file `tsconfig.json`
```javascript
// inside package.json
{
...
    "scripts": {
...
        "tsc:init": "node ./node_modules/typescript/lib/tsc --init",
        "tsc:compile": "node ./node_modules/typescript/lib/tsc"
...
    }
...    
}
```

```sh
npm run tsc:init
```

* Modify the Typescript config file `tsconfig.json` so that it compiles to es6
```javascript
{
...
    "compilerOptions": {
        "target": "es6"
    }
...
}
```

* Add Jest configuration info to `package.json`
```javascript
// inside package.json
{
...
    "scripts": {
...
        "test": "jest"
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
    ]
  }
...
}
```

* Create a `gulpfile.js`
```sh
touch gulpfile.js
```

* Add script content to the Gulp file
```javascript
var gulp = require('gulp');  
var sourcemaps = require('gulp-sourcemaps');  
var ts = require('gulp-typescript');  
var babel = require('gulp-babel');

var tsProject = ts.createProject('./tsconfig.json');

gulp.task('default', function() {  
    return gulp.src('src/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject))
        .pipe(babel({
            presets: ['es2015', 'transform-runtime']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});
```

* Create a test for Javascript usage
```sh
touch __tests__/index.js
```

```javascript
// inside __tests__/index.js
describe('matching cities to foods', function() {
    beforeEach(function() {
        console.log('About to run the index.js test');
    });
    // question: where is drake from?
    // answers: 'Canada', 'Toronto, Canada'
    test('the asked question has an answer', function() {
        var question = 'where is drake from?';
        var answers: ['Canada', 'Toronto', 'Toronto, Canada']
        var QASource = [{ 
            question: question, 
            answers: answers
        }];
        var sakwesakwe = new Sakwesakwe(QASource);
        var predictedAnswer = sakwesakwe.ask(question);
        var realAnswers = answers;
        expect(realAnswers).toContain(predictedAnswer);
    });
});
```

* Create a test for Typescript usage
```sh
touch __tests__/index.ts
```

```typescript
// inside __tests__/index.ts
describe('matching cities to foods', () => {
    beforeEach(() => {
        console.log('About to run the index.js test');
    });
    // question: where is drake from?
    // answers: 'Canada', 'Toronto, Canada'
    test('the asked question has an answer', () => {
        const question = 'where is drake from?';
        let answers: ['Canada', 'Toronto', 'Toronto, Canada']
        var QASource = [{ question, answers }];
        let sakwesakwe = new Sakwesakwe(QASource);
        let predictedAnswer = sakwesakwe.ask(question);
        let realAnswers = answers;
        expect(realAnswers).toContain(predictedAnswer);
    });
});
```

* Run the tests **They should fail**
```sh
npm test
```

* Write the required logic 
```javascript

```