CYO
===

The 100% HTML Game Templating Engine

Introduction
------------
CYO lets someone with no JavaScript knowledge whatsoever write their own 21st century choose your own adventure story!

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
<chap> // story must be contained in  single tag.
	<p>"Don't worry," says crazy Jake. "It's not so scary as all of that."</p>
	<p>"Like bones it isn't," says Bradley, straightening his glasses. "I don't like that house."</p>
	<choice page="'jake-talks'">Hear Jake out</choice>
	<choice page="'brad-talks'">Hear Bradley out</choice>
</chap>
```

Using a `choice` tag creates a button that lets the reader choose the next part of the adventure. The page points to URL in the stories folder. This allows you to write an endless series of stories while only coding HTML. *todo: add support for alternative templating engines in templates*

### Events
In `story/bust-the-gate.html`

```
<p>You pick up a shiny locket.</p>
<event found-shiny-locket></event>
```

The `event` tag lets you remember something for later using the `condition` tag.

```
<condition found-shiny-locket>
	<p>As you walk through the room, the locket begins to glow. Suddenly, a new doorway appears in the wall.</p>
	<choice page="'go-through-hidden-doorway'">Go through the doorway.</choice>
</condition>