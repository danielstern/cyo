CYO
===

The 100% HTML Game Templating Engine

Introduction
------------
CYO (Choose-Yer-Own) uses Angular.js directives to create a choose your own adventure game making engine that, wait for it, you make *100% with HTML markup*. You do not write any jQuery, JavaScript, anything! (Perfect if you have no idea what these things are.)

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

		<div>
			<p>"Don't worry," says crazy Jake. "It's not so scary as all of that."</p>
			<p>"Like bones it isn't," says Bradley, straightening his glasses. "I don't like that house."</p>
			<choice page="'jake-talks'">Hear Jake out</choice>
			<choice page="'brad-talks'">Hear Bradley out</choice>
		</div>


		<choice page="'brad-talks'">Hear Bradley out</choice>

Using a `choice` tag creates a button that lets the reader choose the next part of the adventure. The page points to URL in the stories folder. This allows you to write an endless series of stories while only coding HTML. *todo: add support for alternative templating engines in templates*


### Events
In `story/bust-the-gate.html`

		<p>With a *crack*, the gate creaks open, and your knife breaks to pieces in your hand. <i>Hmm... better a cofferful of gold and diamonds than that old knife.</p></i>
		<event broke-knife></event>

The `event` tag lets you remember something for later using the `if` tag *(todo)*.