![cyo](https://raw.githubusercontent.com/danielstern/cyo/master/cyo-logo.png)

# CYO (Choose Your Own) is an extremely simple, but powerful, storytelling engine built JavaScript.

<a target="_new" href="http://danielstern.github.io/cyo/">Check Out the Project Page</a>


## Introduction

CYO lets you create exciting adventures using nothing but HTML code!

<a target="_new" href="http://danielstern.github.io/cyo/">Full getting started details are available at the project page.</a>

## Patch Notes v3.1

- Version 3.1 is a huge update that completely revises CYO - now way easier and simpler to use!
- CYO 3.1 is no longer dependent on angular.js - just copy the script tag (see Getting Started (ADD LINK?) and you're good to go
- Improved performance all around 

## Getting Started

### Setting Up a Project

Getting started couldn't be easier! Just copy this script tag onto your document.

!!!INSERT-TAG-HERE!!!

Now you're ready to add `<story>`, `<page>` and `<choice>` tags to your web page!

<a target="_new" href="http://danielstern.github.io/cyo/tutorial">Follow the tutorial to get started with your project.</a>


## The Characters

*Also known as "The Directives", wherein an interactive adventure is created, and Javascript (and Angular) fume about not being needed.*

You can use these tools freely in your project to create your own interactive story adventure.

### Story
The story tag initializes your story by pointing to your first chapter.

You initialize your CYO with a simple `story` tag.

```html
<story>
And a splendid story it will be.
</story>
```

This element has to contain all the other elements. You can have multiple stories on a single page.

### Page
Pages are hidden automatically and appear when choices are pressed.

```html
<page>
	<p>
		You see a grizzled old man tending a hearth.
		<i>Something doesn't feel right here.</i>
	</p>
</page>
```

### Choice

Choices are what make the storytelling process interactive. Clicking a choice will reveal the corresponding page.

```html
<page>
    <p>You see a fork in the path. </p>
    <p>*Hmm... should I go left or right?*</p>
	<choice go-left>Guess I'll go left.</choice>
	<choice go-right>Right, definitely right.</choice>
</page>
```

### Event

Events allow you to remember something special happening, for use later in your story.

```html
<p>You find a flashlight.</p>
<event found-flashlight></event>
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

In this example, if the storygoer had previously found the flashlight, they would see another paragraph and have the option to use their flashlight, going to the `use-flashlight` page.

You can reverse a condition to its negative by adding the word `not`

```html
<p>
	The tall gate is locked and made of heavy iron bars.
</p>
<choice go-home>These guys are closed.</choice>
<condition not pocket-knife-broke>
         <p>
		"Don't worry... we can use my trusty pocket knife!"
         <p></p>
		"Don't you mean your *rusty* pocket knife?"
         </p>
	<choice break-lock>Looks like they're not closed after all.</choice>
</condition>
```

## Example

The markup of your typical page looks like this.

```html
<page exploring-the-house>
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
<choice go-with-brad>Go with Brad</choice>
<choice go-with-jake>Go with Jake</choice>
</page>
```

Once you click a choice, all the other choices on the page disappear.


## Making Your Own

Please use this tool to make your own adventures and share them. If you have any questions, or need a new feature to complete your latest epic, post it up here. Better yet, add the feature yourself and make a pull request. 

### Made a Game with CYO?

I'd be happy to link to it on the project page! Get in touch with me @danieljackstern or daniel@danielstern.ca

Happy adventuring!

<a target="_new" href="http://danielstern.github.io/cyo/">Check Out the Project Page for More Examples</a>
-----------

*CYO was created by Daniel Stern*

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

| Name | Effect | Default | Example |
| -------------      | --------------- | ----- |
| `pageDirectory`    | Specifies where to look for external pages | `""`      | 


## Troubleshooting
No one gets it perfect the first time!

### Help! My story just won't work!
Follow the Creating a Story Tutorial (click here).

### Some page I made isn't appearing or isn't loading correctly
Open the Developer Console in Chrome by pressing F12. Helpful messages will appear in yellow indicating common mistakes like mismatched file names.