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

