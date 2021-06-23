## CJaaS Condition

Common component used to build Action Configuration

## Usage

```html
<cjaas-condition .optionsList=${mockAttributes} .index=${0}></cjaas-condition>
<cjaas-condition .optionsList=${mockAttributes} .index=${0} .condition=${mockCondition}></cjaas-condition>
```


You may take a look at `src/[sandbox]/sandbox.mock.ts` file to see how to structure the mock objects or see examples down below.

### properties

#### `optionList Array<{}>`
Array of attributes from the template configuration. This gets passed down from the widget.


#### `condition {field: string, operator: string, value: string | number}`
Condition for the component. 

field is the `metadata` from optionList.
operator is one of `["EQ", "NEQ", "GTE", "GT", "LTE", "LT"]`
value is the data that is compared.


#### `index number`
index of the current condition in the list of conditions under a condition block


#### `relation string`
`AND` or `OR` logic between this condition and other conditions in the same condition block


#### `showDelete optional`
Optionally show delete condition icon. It defaults to `true`