# Examples


----
## DomHelpers

**DomHelpers #1**
```js
let attributes = {
    src: "https://i0.wp.com/www.php.net/images/meta-image.png?fit=256%2C256&ssl=1",
    alt: "Image",
    title: "My image"
}

let tag = _helpers.DomHelpers.createTag('img', attributes)
console.log(tag)
```

----
## NumberHelpers

**NumberHelpers #1**
```js
_helpers.NumberHelpers.isNumeric(2) //true
_helpers.NumberHelpers.isNumeric('2') //true
_helpers.NumberHelpers.isNumeric('') //false
_helpers.NumberHelpers.isNumeric(null) //false
```

----
## DatasetHelpers

**DatasetHelpers #2**
```html
<tag data-json-info='{"name":"Tiago"}' />
```
```js
_helpers.DatasetHelpers.object.getFromJson('[data-json-info]', 'jsonInfo', {}) // Object { name: "Tiago" }
```
