CYO
===

CYO (Choose Your Own) is an extremely simple, but powerful, storytelling engine built with Angular.js.

Introduction
------------
CYO uses Angular directives to create rich storytelling experiences with an extremely easy-to-remember syntax.


Implementation
--------------
- Clone this repository
- Delete every file in `story/` except `intro.html`


###Story
You initialize your CYO with a simple `story` tag.

```html
<story intro />
```

Alternatively,

```html
<story url="intro" />
```

This tag tells the program to find the first chapter of your story at `story/intro.html`. There's not a lot to the `story` tag.

###Chapter
You normally do not need to make `chapter` tags, as they are created automatically by `story`. However, they can be used anywhere just like a story tag.

```html
<chapter enter-the-spooky-house />
```

Chapter tags point to html files. Those files have the following basic makeup:

```html
<page>
	<p>
		You see a grizzled old man tending a hearth.
		<i>Something doesn't feel right here.</i>
	</p>
</page>
```

Thanks to [btford] and [showdown], chapters can be written in markdown (JOY!) by including the `<md>` tag.

```html
<page>
	<md>
		You see a grizzled old man tending a hearth.

		*Something doesn't feel right here.*

	</md>
</page>
```

### Choice

Choices make up the bread and butter of the interactive storytelling process. They are mercifully simple to execute.

```html
<page>
	<md>
		You see a fork in the path. 

		*Hmm... should I go left or right?*

	</md>
	<choice go-left>Guess I'll go left.</choice>
	<choice go-left>Right, definately right.</choice>
</page>
```html

Choices look like buttons. When you click one, it automatically loads the chapter. `go-left` would load the file `story/go-left.html` and so-on. 

Note that you cannot nest choices or other special entities in markdown blocks yet.

### Event

```html
<p>You find a flashlight.</p>
<event found-flashlight />
```

`event` tags are powerful tools that are automatically remembered for the whole story. They can change what the user sees and what choices they have when used in conjunction with the equally simple `condition` tag.

### Condition

`condition` tags will show or hide the content inside them based on `event` tags that the storygoer has previously encountered in their adventure.

```html
<p>Suddenly, you hear a terrifying noise.</p>
<condition found-flashlight>
	<p>Don't be afraid, for the night is dark and full of terrors.</p>
	<choice use-flashlight>Turn on your flashlight</choice>
</condition>
<choice run-away>Run for it!</choice>
```

Note, in the example above, the storygoer would still be able to run away if they choose.

You can reverse a condition to its negative by adding the word `not`

```html
<condition not pocket-knife-broke>
	<md>
		"Don't worry... we can use my trusty pocket knife!"

		"Don't you mean your *rusty* pocket knife?"

	</md>
</condition>

```

Often you will want to nest just a single `<choice>` tag in a `condition`. For that, you can use the following shortcut:

```html
<choice use-the-wand condition="found-wand" />
```

The condition shortcut can also be turned into its negative with `unless`:

```html
<choice use-the-wand unless condition="found-wand" />
```

### Crossroad

If you have a particular set of choices you are writing again, and again, you can put them in a single outside file and call it with the `crossroads` tag.

```html
<crossroads the-eight-sided-room />
```
