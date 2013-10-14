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

		*<i>Something doesn't feel right here.</i>*

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
	
</page>
```html

### Events

```
<p>You pick up a shiny locket.</p>
<event found-shiny-locket></event>
```

The `event` tag lets you remember something for later using the `condition` tag.

### Conditions

```html
<condition found-shiny-locket>
	<p>As you walk through the room, the locket begins to glow. Suddenly, a new doorway appears in the wall.</p>
	<choice go-through-hidden-doorway>Go through the doorway.</choice>
</condition>
```

You can nest events in conditions, and conditions in conditions, to create a unique storytelling experience.

```html
<condition not found-shiny-locket>
	<p>You walk into the room. Hmm... it's empty.</p>
	<choice go-back-to-the-hallway>Nothing here.</choice>
</condition>
```

### Shortcuts

You can nest an event within a choice using the following shortform syntax:

```html
<choice use-the-wand condition="found-wand" />
```

You can reverse this condition by adding the attribute "unless"

```html
<choice use-the-wand unless condition="wand-was-stolen" />
```

If you have a choice that the user has to make again and again, and you can create a shortcut with the `crossroads` directive.

```html
<crossroads get-to-the-woods />
// story/get-to-the-woods.html
	<snippet>
	  <choice go-left />
	  <choice go-right />
	  <choice use-flashlight condition="got-flashlight" />
	</snippet>
```