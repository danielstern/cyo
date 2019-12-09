const utility = {

    getMarker (element) { return utility.isNegated(element) ? element.attributes[1].nodeName : element.attributes[0].nodeName },
    isNegated (element) { return element.attributes[0].nodeName === "not"},
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
    async loadPage(url) {

        // console.info("Loading page file", url);

        const pageData = {};

        const req = await fetch(url);

        if (req.status === 200) {

            const text = await req.text();
            console.info(`Successfully loaded data from url ${url}`)
            // pageData.contents = text;
            const element = document.createElement("page");
            element.innerHTML = text;
            pageData.element = element;

        } else {

            console.warn(`Could not load page from url "${url}". Story may not work correctly.`)
            // pageData.contents = null;
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
    
                    } else {
    
                        console.warn(`A choice "${choice.target}" on page ${page.name} points to a target that does not exist. Please check to see that the name on your choice and target page match.`)
    
                    }
    
    
                }
    
            }
        }

    }

}

const feedback = {
    
    verifyPage(pageData){

        const choiceElements = pageData.element.getElementsByTagName("choice");

        if (choiceElements.length === 0) {

            console.warn(`Page ${pageData.name} contains no choices. The story will end here.`)

        }
    },

    verifyStory(storyData){

        if (storyData.pages.length === 0) {

            console.warn(`Story named ${storyData.name} has no pages.`);

        }

    }
}

let uid = 0;
/*

  _____                         
 |  __ \                        
 | |__) |_ _ _ __ ___  ___ _ __ 
 |  ___/ _` | '__/ __|/ _ \ '__|
 | |  | (_| | |  \__ \  __/ |   
 |_|   \__,_|_|  |___/\___|_|   
                                
                                
*/
async function parseStory(storyElement) {

    async function parsePage(pageElement) {       

        let pageData = {

            name: utility.getMarker(pageElement),
            choices: [],
            events: [],
            conditions:[]

        }

        if (pageData.name.includes('.')) {

            pageData = {...pageData, ... await utility.loadPage(pageData.name)};

        } else {

            // pageData.contents = pageElement.innerHTML;
            pageData.element = pageElement;            
            
        }

        feedback.verifyPage(pageData);

        const choiceElements = pageData.element.getElementsByTagName("choice");

        for (let choiceElement of choiceElements) {

            const id = uid++;
            choiceElement.setAttribute("id", id);

            pageData.choices = [...pageData.choices, {

                target: utility.getMarker(choiceElement),
                element: choiceElement,
                conditions: utility.getConditions(choiceElement)

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
        flags: []
        
    };

    

    for (let pageElement of storyElement.getElementsByTagName("page")) {

        storyData.pages = [...storyData.pages, await parsePage(pageElement)];

    }

    feedback.verifyStory(storyData);
    tools.repairChoices(storyData);

    // console.log("Parsed story", storyData);

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

async function drawPage(page, container, choiceHandler, flags){

    container.innerHTML += page.element.innerHTML;

    for (let choiceElement of container.getElementsByTagName("choice")) {

        choiceElement.style.display = "none";
        
    }

    for (let conditionElement of container.getElementsByTagName("condition")) {

        conditionElement.style.display = "none";
        
    }

    for (let condition of page.conditions) {

        if (utility.conditionsFulfilled(condition.conditions, flags)) {

            const conditionElement = document.createElement("article");
            conditionElement.innerHTML = condition.element.innerHTML;

            //todo... change to append after or this will just randomly sow up  
            
            const node = container.querySelector(`condition[id='${condition.id}']`);
            // debugger;
            // console.log("Finding node", node);
            // container.append(node);
            node.parentNode.insertBefore(conditionElement, node);

        }

    }


    for (let choice of page.choices) {

        if (utility.conditionsFulfilled(choice.conditions, flags)) {

            const choiceElement = document.createElement("button");
            choiceElement.innerHTML = choice.element.innerHTML;
            choiceElement.addEventListener("click", async ()=>{

                await choiceHandler(choice);

            });
        
           container.append(choiceElement);

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

    const story = data.stories[0]; 
    
    story.container = document.createElement("section");
    story.element.parentNode.append(story.container);
    story.element.parentNode.insertBefore(story.element, story.container);

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
        await drawPage(targetPage, story.container, choiceHandler, story.flags);

    };

    const page = story.pages[0];
    await drawPage(page, story.container, choiceHandler, story.flags);

})();