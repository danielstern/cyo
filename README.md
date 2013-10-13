CYO
===

The world most simple game engine.

Introduction
------------
CYO lets someone with no code knowledge whatsoever write their own 21st century choose your own adventure story!

CYO (Choose-Yer-Own) uses Angular.js directives to create a choose your own adventure game making engine that, wait for it, you make *100% with HTML markup*.You do not write any jQuery, JavaScript, anything! (Perfect if you have no idea what these things are.)

Implementation
--------------
Clone this repository, as it is set up with the optimal require.js / angular.js architecture for a CYO app.

##Elements
###Chapters

In `index.html`...

```
<chapter url='intro'></chapter>
```

This is unique markup for CYO using the directive `chapter`. The URL attr points to a file in `story/`


###Choices
In `story/intro.html`

```
<page>
	<p>"Don't worry," says crazy Jake. "It's not so scary as all of that."</p>
	<p>"Like bones it isn't," says Bradley, straightening his glasses. "I don't like that house."</p>
	<choice jake-talks>Hear Jake out</choice>
	<choice brad-talks>Hear Bradley out</choice>
</page>
```

In the above example, clicking on the "choice" tag would load the next "page," which would be an HTML file.
Using a `choice` tag creates a button that lets the reader choose the next part of the adventure. The page points to URL in the stories folder. This allows you to write an endless series of stories while only coding HTML. The syntax is extremely easy to remember. It's designed to write on the fly.

### Events

```
<p>You pick up a shiny locket.</p>
<event found-shiny-locket></event>
```

The `event` tag lets you remember something for later using the `condition` tag.

### Conditions

```javascript
<condition found-shiny-locket>
	<p>As you walk through the room, the locket begins to glow. Suddenly, a new doorway appears in the wall.</p>
	<choice go-through-hidden-doorway>Go through the doorway.</choice>
</condition>
```

You can nest events in conditions, and conditions in conditions, to create a unique storytelling experience.

```javascript
<condition not found-shiny-locket>
	<p>You walk into the room. Hmm... it's empty.</p>
	<choice go-back-to-the-hallway>Nothing here.</choice>
</condition>
```

### Shortcuts

You can nest an event within a choice using the following shortform syntax:

```javascript
<choice use-the-wand condition="found-wand" />
```

You can reverse this condition by adding the attribute "unless"

```javascript
<choice use-the-wand unless condition="wand-was-stolen" />
```

If you have a choice that the user has to make again and again, and you can create a shortcut with the `crossroads` directive.

```javascript
<crossroads get-to-the-woods />
// story/get-to-the-woods.html
	<snippet>
	  <choice go-left />
	  <choice go-right />
	  <choice use-flashlight condition="got-flashlight" />
	</snippet>
```