import studio from "@theatre/studio";
import {getProject, types} from "@theatre/core";
import projectState from "./state.json";
import './style.css';

if(import.meta.env.DEV) {
    studio.initialize()
}
console.log(projectState);
const project = getProject('Bientôt chez nous', {state: projectState})
const sheet = project.sheet('BD')
const obj = sheet.object('Planche', {
    position: {
        x: 0,
        y: 0,
        z: 1,
    },
    opacity: types.number(1, { range: [0, 1] }), // or use a type constructor to customize
})

const articleHeadingElement = document.getElementById('planche')

obj.onValuesChange((obj) => {
    articleHeadingElement!.style.transform = `scale(${obj.position.z}) translateY(${obj.position.y}px) translateX(${obj.position.x}px)`
    articleHeadingElement!.style.opacity = String(obj.opacity)
})

project.ready.then(() => {


    // sheet.sequence.attachAudio({ source: '/musique.mp3' }).then(() => {
    //     console.log('Audio loaded!')
    //     return sheet.sequence.play({ iterationCount: Infinity })
    // })
    return sheet.sequence.play({ iterationCount: Infinity })

})