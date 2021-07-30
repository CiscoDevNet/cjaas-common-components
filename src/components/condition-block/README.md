## CJaaS Condition Block

Common component used to build Action Configuration. It recursively create condition blocks or conditions to represent an action configuration.

## Usage

```html
<cjaas-condition-block
    .root=${true}
    .conditions=${mockConditions}
    .optionList=${mockOptionsList}
    .innerRelation=${"AND"}
  ></cjaas-condition-block>
```

You may take a look at `src/[sandbox]/sandbox.mock.ts` file to see how to structure the mock objects or see examples down below.

### properties

#### `relation string`
represents the relation `AND` or `OR` for the conditions or condition blocks within parent conditiono block block in the parent block

#### `innerRelation string`
stores the relation for conditions within the condition block

#### `root boolean`
denotes if the current condition block is the root. Defaults to `false`.

#### `conditions Array<Condition>`
Array of objects that consitute a condition block

#### `index number`
index of the current condition block in the list of conditions under parent condition block

#### `optionList Array<{}>`
Array of attributes from the template configuration. This gets passed down from the widget.