(()=>{

    let uid = 0;

    const utility = {

        getMarker (element) { if (element.attributes.length === 0) return null; return utility.isNegated(element) ? element.attributes[1].nodeName : element.attributes[0].nodeName },
        isNegated (element) {  if (element.attributes.length === 0) return false; return element.attributes[0].nodeName === "not"},
        filterAncestors (node, selector) { 
            let ancestors = [];
            let parent = node.parentNode;
            while (parent) {

                if (selector(parent)) {

                    ancestors = [...ancestors, parent];

                }

                parent = parent.parentNode;

            }

            return ancestors;
        },
        getConditions (element) {

            return utility.filterAncestors(element, ancestor => {

                return ancestor.tagName === "CONDITION"

            })
            .map(conditionElement => ({

                name: utility.getMarker(conditionElement),
                negated: utility.isNegated(conditionElement)
                
            }));

        },
        conditionFulfilled (condition, flags) {

            let triggered = flags.includes(condition.name);
            let parsed = (condition.negated) ? !triggered : triggered;
            return parsed;

        },
        conditionsFulfilled (conditions, flags) {

            return (conditions.every(condition=>utility.conditionFulfilled(condition, flags)))

        },
        async loadPage(url, pageDirectory = "") {

            const pageData = {};

            const req = await fetch(pageDirectory + (pageDirectory ? "/" : "") + url);

            if (req.status === 200) {

                let text = await req.text();
                console.info(`Page loaded successfully: ${url}.`)
                if (url.split('.')[1] === "txt") {

                    // text = text.replace(/\n\s*\n/g, '\n');
                    text = text.split("\n").join("<br>");
                    text += "<br>";

                }

                const element = document.createElement("page");
                element.innerHTML = text;
                pageData.element = element;

            } else {

                console.warn(`Could not load page from url "${url}". Story may not work correctly.`)

                pageData.element = document.createElement("section");
                pageData.element.innerHTML = "((MISSING PAGE))"
                return pageData;

            }           

            return pageData;

        }
    
    }

    const tools = {

        repairChoices(storyData) {

            for (let page of storyData.pages) {

                for (let choice of page.choices) {
        
                    if (!storyData.pages.find(page => page.name === choice.target)) {
        
                        if (storyData.pages.find(page => page.name === choice.target  + ".html")) {
        
                            choice.target = choice.target + ".html";
        
                        } else if (storyData.pages.find(page => page.name === choice.target  + ".txt")) {
        
                            choice.target = choice.target + ".txt";
        
                        } else {
        
                            console.warn(`A choice "${choice.target}" on page ${page.name} points to a target that does not exist. Please check to see that the name on your choice and target page match. Please make sure any pages you want to load are included in your index.html file, as well.`)
                            choice.disabled = true;
        
                        }
        
        
                    }
        
                }
            }

        }

    }

    const feedback = {
        
        verifyPage(pageData){

            if (!pageData.element) {

                console.warn(`A page could not be loaded: "${pageData.name}".`);
                return;

            }

            const choiceElements = pageData.element.getElementsByTagName("choice");

            if (choiceElements.length === 0) {

                console.warn(`Page ${pageData.name} contains no choices. The story will end here.`)

            }

            for (let element of choiceElements) {

                if (element.attributes.length === 0) {

                    console.warn(`Page ${pageData.name} contains a choice with no target. Try something like this: <choice buy-milk>Buy milk.</choice>.`)                

                }

            }
        },

        verifyStory(storyData){

            if (storyData.pages.length === 0) {

                console.warn(`Story named ${storyData.name} has no pages.`);

            }

        },

    }

    /*

    _____                         
    |  __ \                        
    | |__) |_ _ _ __ ___  ___ _ __ 
    |  ___/ _` | '__/ __|/ _ \ '__|
    | |  | (_| | |  \__ \  __/ |   
    |_|   \__,_|_|  |___/\___|_|   
                                    
                                    
    */
    async function parseStory(storyElement) {

        async function parsePage(pageElement, pageDirectory = "") {       

            let pageData = {

                id: uid++,
                name: utility.getMarker(pageElement),
                choices: [],
                events: [],
                conditions:[],
                restarts:[]

            }

            if (pageData.name && pageData.name.includes('.')) {

                pageData = {...pageData, ... await utility.loadPage(pageData.name, pageDirectory)};

            } else {

                pageData.element = pageElement;            
                
            }

            feedback.verifyPage(pageData);

            for (let choiceElement of pageData.element.getElementsByTagName("choice")) {

                const id = uid++;
                choiceElement.setAttribute("id", id);

                pageData.choices = [...pageData.choices, {

                    target: utility.getMarker(choiceElement),
                    element: choiceElement,
                    conditions: utility.getConditions(choiceElement)

                }];

            }

            for (let restartElement of pageData.element.getElementsByTagName("restart")) {

                const id = uid++;
                restartElement.setAttribute("id", id);

                pageData.restarts = [...pageData.choices, {

                    element: restartElement,
                    conditions: utility.getConditions(restartElement)

                }];

            }

            for (let eventElement of pageData.element.getElementsByTagName("event")) {

                pageData.events = [...pageData.events, {

                    name: utility.getMarker(eventElement),
                    conditions: utility.getConditions(eventElement)
                    
                }]

            }

            for (let conditionElement of pageData.element.getElementsByTagName("condition")) {

                const id = uid++;
                conditionElement.setAttribute("id", id);

                const name = utility.getMarker(conditionElement);
                const negated = utility.isNegated(conditionElement)
                pageData.conditions = [...pageData.conditions, {

                    id,
                    name,
                    negated,
                    element: conditionElement,
                    conditions: [{name, negated}, ... utility.getConditions(conditionElement)]
                    
                }]

            }


            return pageData;

        }

        const storyData = {

            name: utility.getMarker(storyElement),
            element: storyElement,
            pages: [],
            flags: [],
            config: {
                pageDirectory: ""
            }
            
        };

        const settings = ["pageDirectory"];

        for (setting of settings) {

            const config = storyElement.getElementsByTagName(setting)[0];
            if (config) {

                storyData.config[settings] = utility.getMarker(config);

            }

        }

        for (let pageElement of storyElement.getElementsByTagName("page")) {

            storyData.pages = [...storyData.pages, await parsePage(pageElement, storyData.config.pageDirectory)];

        }

        feedback.verifyStory(storyData);
        tools.repairChoices(storyData);

        console.log(storyData);

        return storyData;

    };

    /*

    _____                _           _             
    |  __ \              | |         (_)            
    | |__) |___ _ __   __| | ___ _ __ _ _ __   __ _ 
    |  _  // _ \ '_ \ / _` |/ _ \ '__| | '_ \ / _` |
    | | \ \  __/ | | | (_| |  __/ |  | | | | | (_| |
    |_|  \_\___|_| |_|\__,_|\___|_|  |_|_| |_|\__, |
                                                __/ |
                                            |___/ 
    */

    async function drawPage(pageData, container, choiceHandler, flags, restartHandler){

        container.innerHTML += pageData.element.innerHTML;

        for (let element of [

            ...container.getElementsByTagName("choice"), 
            ...container.getElementsByTagName("restart"), 
            ...container.getElementsByTagName("condition")

        ]) {

            element.style.display = "none";
            if (element.previousSibling.tagName == "BR") {

                element.previousSibling.style.display = "none";

            }
            
        }

        for (let condition of pageData.conditions) {

            if (utility.conditionsFulfilled(condition.conditions, flags)) {

                const conditionElement = document.createElement("article");
                conditionElement.innerHTML = condition.element.innerHTML;
                
                const node = container.querySelector(`condition[id='${condition.id}']`);
                node.parentNode.insertBefore(conditionElement, node);

            }

        }

        for (let choice of pageData.choices) {

            if (utility.conditionsFulfilled(choice.conditions, flags)) {

                const choiceElement = document.createElement("button");
                choiceElement.innerHTML = choice.element.innerHTML;
                choiceElement.disabled = choice.disabled;
                choiceElement.addEventListener("click", async ()=>{

                    await choiceHandler(choice);

                });
            
            container.append(choiceElement);

            }

        }

        
        for (let restart of pageData.restarts) {

            if (utility.conditionsFulfilled(restart.conditions, flags)) {

                const restartElement = document.createElement("button");
                restartElement.innerHTML = restart.element.innerHTML;
                restartElement.addEventListener("click", async ()=>{

                    await restartHandler();

                });
            
            container.append(restartElement);

            }

        }

    }

    /**
     * 
     _____       _ _   
    |_   _|     (_) |  
    | |  _ __  _| |_ 
    | | | '_ \| | __|
    _| |_| | | | | |_ 
    |_____|_| |_|_|\__|
                        
                        
    */

    (async function init(){

        const data = {
            stories: []
        };

        

            
        let storyElements = document.getElementsByTagName("story");
        

        if (storyElements.length === 0) {

            console.warn("You are seeing this message because cyo.js is loaded but your document does not contain any <story/> tags. Please put any CYO adventures you make in a <story/> tag.")

        }


        for (let storyElement of storyElements) {

            storyElement.style.display = "none";
        
        }

        for (let storyElement of storyElements) {

            const storyData = await parseStory(storyElement);
            data.stories = [...data.stories, storyData];
        
        }

        for (let story of data.stories) {
            
            story.container = document.createElement("section");
            story.element.parentNode.append(story.container);
            story.element.parentNode.insertBefore(story.element, story.container);

            const restartHandler = async () => {

                console.log("RESTARTING THIS PUPPER");
                story.flags = [];
                story.container.innerHTML = "";
                const targetPage = story.pages[0];
                await drawPage(targetPage, story.container, choiceHandler, story.flags, restartHandler);

            }

            const choiceHandler = async (choice) => {

                for (let button of story.container.getElementsByTagName("button")) {

                    button.style.display = "none";

                }

                const targetPage = story.pages.find(page => page.name === choice.target);

                for (let event of targetPage.events) {

                    if (utility.conditionsFulfilled(event.conditions, story.flags)) {

                        story.flags = [event.name, ... story.flags]

                    }            

                }
                await drawPage(targetPage, story.container, choiceHandler, story.flags, restartHandler);

            };

            const page = story.pages[0];
            await drawPage(page, story.container, choiceHandler, story.flags, restartHandler);


        }

    })();

})();