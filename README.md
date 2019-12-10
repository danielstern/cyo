## Patch Notes
- Version 3.1 is a huge update that completely revises CYO
- CYO 3.1 is no longer dependent on angular.js - just copy the script tag (see Getting Started (ADD LINK?) and you're good to go
- Improved performance all around 

## Features
- Supports both inline and externally loaded pages

## Getting started

Getting started couldn't be easier! Just copy this script tag onto your document.

!!!INSERT-TAG-HERE!!!

CYO searches for the `<story>` tag.

```html
<story the-lost-shoe>
    <page> <!-- the first page in the story tag is the first page... it needs no title-->
        My shoe is lost.
        <choice find-shoe>
            Find that shoe
        </choice>
    </page>
    <page find-shoe>
        You look for your shoe.

        Oh, there it is.
    </page>
</story>
```

## Configuration
Limited configuration objects can be set per story by using an HTML tag.

### Example
```javascript
<story the-aztec-ruins>
    <pageDirectory pages/>
    ...
</story>
```

### Supported Configuration Settings

| Name               | Effect                                     | Default | Example
| -------------      |---------------                             | -----   |
| `pageDirectory`    | Specifies where to look for external pages | ""      | <pageDirectory pages/>


## Troubleshooting
No one gets it perfect the first time!

### Using the Console
Open the Developer Console in Chrome by pressing F12. Helpful messages will appear in yellow indicating common mistakes like mismatched file names.