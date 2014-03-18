CYO
===

CYO (Choose Your Own) is an extremely simple, but powerful, storytelling engine built with Angular.js.


Introduction
------------
CYO uses Angular directives to create rich storytelling experiences with an extremely easy-to-remember syntax.


Getting Started with CYO
--------------
### The Very Simple Way:
- Clone this repository
- Open an example you like
- Delete every file in `story/` except `intro.html`
- Start writing your own story, starting with `intro.html`

###More Detailed Instructions:

All you need to do to get started with CYO is require the module in your Angular app.

```html
<body ng-app="gameApp">
</body>
<script src='lib/angular/angular.min.js'></script>
<script src='js/cyo.js'></script>
<script>
	angular.module('gameApp', ['cyo'])
</script>

<!-- You are good to go -->
```

Requiring the CYO module gives you access to all the directives necessary to make your own adventure. These modules are detailed below.

<a target="_new" href="http://danielstern.github.io/cyo/">Full getting started details are available at the project page.</a>

The Characters
-----------
*Also known as "The Directives", wherein an interactive adventure is created, and Javascript fumes about not being needed.*

You can use these tools freely in your project to create your own interactive story adventure.

###Story
The story tag initializes your story by pointing to your first chapter.

You initialize your CYO with a simple `story` tag.

```html
<story intro />
<!-- points to story/intro.html -->
```

Alternatively,

```html
<story url="intro" />
```

This tag tells the program to find the first chapter of your story at `story/intro.html`. There's not a lot to the `story` tag.

###Chapter
You normally do not need to make `chapter` tags, as they are created automatically by `story`. However, they can be used anywhere just like a `story` tag.

This can be used, for example, to include multiple `html` files as one chapter.

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

Thanks to [btford] and [showdown], chapters can be written in markdown (JOY!) by including the `<md>` tag and requiring the btford markdown module (this is already set up in the examples.)

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
	<choice go-left>Right, definitely right.</choice>
</page>
```

Choices look like buttons. When you click one, it automatically loads the chapter. `go-left` would load the file `story/go-left.html` and so-on. 

Choice tags and other tags have to go outside `<md>` blocks.

### Event

Events allow you to remember something special happening, for use later in your story. They are once again very simple to use.

```html
<p>You find a flashlight.</p>
<event found-flashlight />
```

`event` tags are powerful tools that are automatically remembered for the whole story. They can change what the user sees and what choices they have when used in conjunction with the equally simple `condition` tag.

### Condition

Condition tags will show or hide content conditionally, perfect for use in combination with the `event` tag.

`condition` tags will show or hide the content inside them based on `event` tags that the storygoer has previously encountered in their adventure.

```html
<p>Suddenly, you hear a terrifying noise.</p>
<condition found-flashlight>
	<p>Don't be afraid, for the night is dark and full of terrors.</p>
	<choice use-flashlight>Turn on your flashlight</choice>
</condition>
<choice run-away>Run for it!</choice>
```

In this example, if the storygoer had previously found the flashlight, they would see another paragraph and have the option to use their flashlight, going to the `story/use-flashlight.html` file.

You can reverse a condition to its negative by adding the word `not`

```html
<p>
	The tall gate is locked and made of heavy iron bars.
</p>
<choice go-home>These guys are closed.</choice>
<condition not pocket-knife-broke>
	<md>
		"Don't worry... we can use my trusty pocket knife!"

		"Don't you mean your *rusty* pocket knife?"
	</md>
	<choice break-lock>Looks like they're not closed after all.</choice>
</condition>
```

Often you will want to nest just a single `<choice>` tag in a `condition`. For that, you can use the following shortcut:

```html
<choice use-the-wand condition="found-wand">Abra-cadaver!</choice>
```

In the above example, the storygoer would only see that button if the `found-wand` condition is true.

The condition shortcut can also be turned into its negative with `unless`:

```html
<choice use-the-wand unless condition="lost-wand">Alakablam!</choice>
```

### Crossroad

If you have a particular set of choices you are writing again, and again, you can put them in a single outside file and call it with the `crossroads` tag.

```html
<crossroads the-eight-sided-room />
```

And, inside `story/the-eight-sided-room.html`

```html
<page>
	<condition not tried-escape>
		<choice escape-mansion>Hmm... that looks like the exit.</choice>
	</condition>
	<condition not explored-library>
		<choice explore-library>Explore the library</choice>
	</condition>
	<choice go-upstairs>Go upstairs</choice>
</page>
```

##Pages
*Wherein a long story is broken into manageable pieces and loaded one at a time.*

Your story is broken up into pages which are all represented by individual html files. The structure of your adventure might look like this

```
index.html
story/
  intro.html
  go-to-school.html
  stay-home-today.html
```

The markup of your typical page looks like this.

```html
<page>
<p>
	The floor creaks as you step into the house's massive foyer. Grimy paintings 
	of gaunt and ghastly figures line the walls, and go all the way up to the 
	ceiling. There is table in the middle of the room. 
</p>
<p>
	"Looks like Sal already got this room pretty good," says Brad nervously.
</p>
<p>
	"Looks like it."
</p>
<!-- The following paragraph will only appear if you got the necklace in 
	chapter one -->
<condition get-necklace>
	<p>
		The figures in the wall all seem old and tired. Rarely are they smiling. 
		Many of the men have long mustaches. You notice someone familiar in one of 
		the paintings.
	</p>
	<p>
		<i>That's impossible.</i> Suddenly, you reach for the necklace in your 
		pocket and pop it open. Sure enough. The woman is clearer in the picture. 
		She is has blonde hair and a striking face. She is not smiling in the 
		picture on the wall either. Below the picture you see the words <i>Eliza 
		Bedford.</i>
	</p>
	<!-- Your character learns Eliza's name and this comes in handy later. This 
	event never triggers if the condition it's inside isn't fulfilled. -->
	<event learned-elizas-name></event>
	<p>
		"What are you looking at?" asks Brad.
	</p>
	<p>
		"Nothing."
	</p>
</condition>
<p>
	The room has a dreary air of sadness about it. The wallpaper, purpled with 
	time, peels from the walls. Engraved candlesticks stand guard in neatly 
	ordered rows all around upper wall of the massive room. <i>Those look 
	valuable. A wonder someone hasn't taken them yet.</i>
</p>
<p>
	"Well, boys," says crazy Jake, rubbing his hands together. "Let's not get too 
	comfortable."
</p>
<p>
	"I'm going to look upstairs," says Brad. "Get a handful of jewels and get out 
	of here."
</p>
<p>
	You get a weird feeling in your stomach. You can't figure out what it is.
</p>
<!-- This page ends with two choices thereby allowing the story to go on
 as a new page is loaded. -->
<choice page='"go-with-brad"'>Go with Brad</choice>
<choice page='"go-with-jake"'>Go with Jake</choice>
</page>
```

The whole page needs to be within a `<page>` tag. Other than that, it is just normal HTML and can include pictures, Flash, angular directives and whatever.

All pages are loaded at runtime when the user clicks a choice directive.

Once you click a choice, all the other choices on the page disappear.


Making Your Own
---------------

Please use this tool to make your own adventures and share them with me. If you have any questions, or need a new feature to complete your latest epic, post it up here. Better yet, add the feature yourself and make a pull request. 

### Made a Game with CYO?

I'd be happy to link to it on the project page! Get in touch with me @danielsternband

Happy adventuring!

<a target="_new" href="http://danielstern.github.io/cyo/">Check Out the Project Page for More Examples</a>
-----------

*CYO was created by Daniel Stern*