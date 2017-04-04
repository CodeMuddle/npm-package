# Answer me
A question answering system

## Goal
* You have a list of Question Answer pairs and
* You have to create a system that consumes the list then answer asked questions using the list

# Using an adapter for QA Source

An adapter is an object that acts as an **partial array** but returns 
Promised results for all its method calls.
```javascript
// example using a google sheets adapter
let qaSource = new GSAdapter();

qaSource.push().then(( /* element */ ) => { /* push returns the saved element */ } );
qaSource.pop().then((/* element */ ) => { /* pop returns the popped object */ })
qaSource.filter().then((/* elementList */ ) => { /* filter returns the list of found object */ })
qaSource.find().then((/* element */ ) => { /* find returns the found object */ })
```
* I refer to a **partial array** as an object that only implements some of the array's methods.

## Step by Step

* Create a test for adapter methods ( **unit** )
```javascript
// __tests__/ext1/adapter-unit-test.js
// Tested using Nodejs v6.9.4
var ArrayAdapter = require('../../dist/index.js').ArrayAdapter;
...
test('the asked question has an answer', function () {
    var question = 'where is drake from?';
    var answers = ['Canada', 'Toronto', 'Toronto, Canada'];
    var QASource = [{
        question, answers
    }];
    var arrayAdapter = new ArrayAdapter({
        question: question,
        answers: answers
    });
    arrayAdapter.find(qa => qa.question === question)
    .then(savedRecord => {
        expect(savedRecord).toEqual(QASource[0]);
    });
});
...
```

* Create a test for adapter inside the Answerme controller ( **integration** )
```javascript
// __tests__/ext1/adapter-int-test.js
// Tested using Nodejs v6.9.4
var ArrayAdapter = require('../../dist/index.js').ArrayAdapter;
var AnswermeWithAdapter = require('../../dist/index.js').AnswermeWithAdapter;
...
test('the asked question has an answer', function () {
    var question = 'where is drake from?';
    var answers = ['Canada', 'Toronto', 'Toronto, Canada'];
    var QASource = new ArrayAdapter({
        question: question,
        answers: answers
    });
    var answerme = new AnswermeWithAdapter(QASource);
    answerme.ask(question).then(predictedAnswer => {
        var realAnswers = answers;
        console.log('--------\n', predictedAnswer, '\n--------');
        expect(realAnswers).toContain(predictedAnswer);
    });
});
...
```

* run the tests **They should fail**
```sh
npm test
```

* Create adapter interface
```typescript
interface AdapterInterface<ITEM> {
    // we cannot return void, so we return the pushed element instead
    push(item: ITEM): Promise<ITEM>;
    pop(): Promise<ITEM>;
    filter(funct: any): Promise<Array<ITEM>>; // @TODO
    find(funct: any): Promise<ITEM>; // @TODO
}
```

* modify the controller (**I am going to create a new one!**) so that it can use the adapter instead of array
```typescript
// src/answerme-ext1/controller.ts

import { AdapterInterface } from './array-adapter/interface';
export interface QApair { question: string; answers: Array<string>; }
...
constructor(private QASource: AdapterInterface<QApair>) {
...
}
```

* register the new controller as `AnswermeWithAdapter` so that people can use it
```typescript
// src/index.ts

import { Answerme as AnswermeWithAdapterClass } from './answerme-ext1/controller';
export const AnswermeWithAdapter = AnswermeWithAdapterClass;
``` 

* register the adapter as `AnswermeWithAdapter` so that people can use it
```typescript
// src/index.ts

import { ArrayAdapter as ArrayAdapterClass } from './answerme-ext1/array-adapter/controller';
export const ArrayAdapter = ArrayAdapterClass;
```

* Run tests again **They should pass!**
```sh
npm test
```