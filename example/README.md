# Choose Your Own Adventure Example Project

## Running the Project

### 1 - Clone the GitHub Repository

Open a terminal in the folder you want to put your story in.

Run the following code, which will clone the GitHub repository:

```git clone git@github.com:danielstern/cyo.git```

### 2 - Navigate to the `example` directory.

Go to the example directory with the following command:

```cd example```

### 3 - Install NPM dependencies

CYO has no dependencies, but the example requires `express` to run. Install NPM dependencies with the following command:

```npm install```

[If you don't have Node.js, download it here.](https://nodejs.org/en/) You need it to run the example, but not necessarily to use CYO.

### 4 - Run the example

Now, start the server with

```npm start```

OR

```node server```

### 5 - Open the example in your browser.

The story is now visible at the following URL:

[http://localhost:1337/](http://localhost:1337)


## Step by Step Tutorial
Prefer to get started entirely from scratch?

### 1 - Make a new, empty directory

Your project will go in this directory.

### 2 - Create index.html

Create a file called `index.html` with the following contents (more or less)

```html
<body>
    <h1>
        A Great Adventure
    </h1>
</body>
```

### 3 - Serve your directory

You need some way to create a server in order to view your story in a web browser.

There are countless options, so pick the one you're most familiar with:

1. Run a public directory with [Apache](https://httpd.apache.org/download.cgi) or [Maven](https://maven.apache.org/)
2. Use [Node.js](https://nodejs.org/en/) with Express or HTTP Server (like in the example)
3. Upload the files to a remote web server (like your personal domain)

If you don't know what to do, just use the copy the Node.js configuration used in the example.

### 4 - Load CYO

The CYO script needs to be loaded on to your page for it work.

Copy this tag into your HTML page,

```html
<script src="https://danielstern.github.io/cyo/cyo.js"></script>
```

Now, if you open your developer tools with `F12`, you should see a message saying that your page doesn't contain any story tags.

### 5 - Add a Story and a Few Pages

Let's create our first story!

Create a story tag like so.

```html
<story a-great-adventure>

</story>
```

Now, inside, let's create a couple of pages.

The first page will be our introductory page. The first page of a CYO story is always shown first. The others will be hidden.

We'll also add a second page, and a choice on the first page that leads us to the second. Your HTML file should now look like this:


```html
<body>
    <h1>
        A Great Adventure
    </h1>        
    <story a-great-adventure>
        <page intro>
            <p>You roll out of bed one day feeling great! You can tell it will be a great adventure!</p>
            <choice go-to-park>Stroll to the park!</choice>
        </page>
        <page go-to-park>
            <p>You stroll to the park. What a lovely day, you think! You feel terrific.</p>
        </page>
    </story>
</body>
```

Now we have a simple story, but it's not very interactive. Let's add a second choice on the first page which takes our protagonist on a completely different course, and add the corresponding page.

```html
<story a-great-adventure>
    <page intro>
        <p>You roll out of bed one day feeling great! You can tell it will be a great adventure!</p>
        <choice go-to-park>Stroll to the park!</choice>
        <choice stay-inside>Stay inside</choice>
    </page>
    <page go-to-park>
        <p>You stroll to the park. What a lovely day, you think! You feel terrific.</p>
    </page>
     <page stay-inside>
        <p>You decide to stay inside today and watch TV. After six hours of ramen noodles and daytime talk shows, you are in a state of bliss.</p>
    </page>
</story>
```

We now have the start of an interactive story. Try adding some more pages. Maybe the trip to the park takes an interesting turn when it starts to pour rain?

### 6 - Add a Page in Another File

HTML is great, but it's meant for holding markup, not prose! It's easy to lose the flow of your story when you're working inside an HTML file.

From now on, let's create new pages in their own `.txt` files. This will let us use a normal text editor like Word to write our story, if we prefer.

Create a new file in your directory called `get-pizza.txt`.

Put some text in it:

```
Actually, you realize you're very hungry! You race off to the local pizza store and consume their whole supply.
```

Now, let's update our story to include our new page. Your final `index.html` page should look like this.

```html
<body>
    <h1>
        A Great Adventure
    </h1>   
    <story a-great-adventure>
        <page intro>
            <p>You roll out of bed one day feeling great! You can tell it will be a great adventure!</p>
            <choice go-to-park>Stroll to the park!</choice>
            <choice stay-inside>Stay inside</choice>
            <choice get-pizza>Get Pizza</choice>
        </page>
        <page go-to-park>
            <p>You stroll to the park. What a lovely day, you think! You feel terrific.</p>
            <choice get-pizza>Get Pizza</choice>
        </page>
        <page stay-inside>
            <p>You decide to stay inside today and watch TV. After six hours of ramen noodles and daytime talk shows, you are in a state of bliss.</p>
        </page>
        <page get-pizza.txt></page>
    </story>
    <script src="https://danielstern.github.io/cyo/cyo.js"></script>
</body>
```

Note how we need to add any pages we want to load externally to our HTML page, but they don't need to have anything inside. Also note how we created two different ways to get to our new pizza chapter (on the page `intro` and on the page `go to park`). Use this technique to create stories that branch and loop instead of proceeding linearly.

### 7 - Write a Story!

With all this taken care of, you have everything you need to get started.

Have fun and write a spellbinding tale! [Check out the main documentation for some other features like conditions and events](https://github.com/danielstern/cyo)

Good luck!