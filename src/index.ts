// import { StoryData } from './cyo';
import { getName } from './utility';

const data = {
    stories:{}
};

async function parseStory(storyElement : HTMLElement) {

    const storyData : StoryData = {
        name: getName(storyElement),
        pages: [],
        //events:[]
    }

    if (storyData.pages.length === 0) {

        console.warn(`Story named ${storyData.name} has no pages.`);

    }

    data.stories[storyData.name] = storyData;

 

    // for (let page of storyData.pages) {

    //     const pageData = {
    //         name: utility.getName(page)
    //     }

    //     if (!pageData.name.includes('.')) {
    //         pageData.contents = page.innerHTML;
    //     } else {

    //         console.info("Loading page file", pageData.name);

    //         const req = await fetch(pageData.name);
    //         console.log(req.status);

    //         if (req.status === 200) {
    //             const text = await req.text();
    //             console.log(text);
    //             pageData.contents = text;
    //         } else {
    //             console.warn(`Could not load page from url "${pageData.name}". Story may not work correctly.`)
    //             pageData.contents = null;
    //         }            
            
    //     }

    //     storyData.pages[pageData.name] = pageData;

    //     console.log(data);



    // }

};

//const utility = {

  //  getName (element : HTMLElement) : string { return element.attributes[0].nodeName }

//}

const config = {
    pageDirectory : ""
}

(async function init(){

        
    let storyElements = document.getElementsByTagName("story");
    

    if (storyElements.length === 0) {

        console.warn("You are seeing this message because cyo.js is loaded but your document does not contain any <story/> tags. Please put any CYO adventures you make in a <story/> tag.")

    }


    for (let storyElement of storyElements as any) {

        storyElement.setAttribute("hidden", true);        
    
    }

    for (let storyElement of storyElements as any) {

        await parseStory(storyElement);
    
    }

})();
