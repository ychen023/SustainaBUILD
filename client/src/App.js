import './App.css';
import Quiz from './Components/Quiz.js'


let testData = [[{question: "Business Name", type:"text", answers: []}, {question: "Street line 1", type:"text", answers: []}, {question: "Stree line 2", type:"text", answers: []}, {question: "City", type:"text", answers: []}, {question: "State", type:"text", answers: []}, {question: "Postal Code", type:"text", answers: []}], 
[{question: "What sustainable qualities are you looking for? ", type:"checkbox", answers: ["Biodegradable", "Recyclable", "Reusable", "Compostable", "Corrugated (wood pulp)", "Cellulose"]}, {question: "What goals do you have?", type:"checkbox", answers: ["Cost efficiency", "Aesthetic", "Brandable", "Ability to build a partnership", "Locally sourced", "Not sure"]}], 
[{question: "multi", type:"multi", answers:{selector:["Cup", "Straw", "Plate"]}}]]

let headerMessage = ["We want to get to know your business", "Great! Just dive a little deeper ...", "Almost there! Last question What type of package do you need?"];

function App() {
    return (<Quiz dataList={testData} headerMessage={headerMessage} />)
}

export default App;
