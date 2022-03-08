import './App.css';
import { Dashboard } from './Components/Dashboard';
import { Footer } from './Components/Footer';
import { NavB } from './Components/NavB';
import Quiz from './Components/Quiz';
import product_data from './data/vegware.json';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// https://bestofreactjs.com/repo/YIZHUANG-react-multi-carousel-react-image-gallery
const responsive = {
  desktop: {
    breakpoint: { max: 5000, min: 1024 },
    items: 4,
    // partialVisibilityGutter: 40 // this is needed to tell the amount of px that should be visible.
  }
  // tablet: {
  //   breakpoint: { max: 1024, min: 464 },
  //   items: 2,
  //   partialVisibilityGutter: 30 // this is needed to tell the amount of px that should be visible.
  // },
  // mobile: {
  //   breakpoint: { max: 464, min: 0 },
  //   items: 1,
  //   partialVisibilityGutter: 30 // this is needed to tell the amount of px that should be visible.
  // }

}
let testData = [[{question: "Business Name", type:"text", answers: []}, {question: "Street line 1", type:"text", answers: []}, {question: "Stree line 2", type:"text", answers: []}, {question: "City", type:"text", answers: []}, {question: "State", type:"text", answers: []}, {question: "Postal Code", type:"text", answers: []}], 
[{question: "What sustainable qualities are you looking for? ", type:"checkbox", answers: ["Biodegradable", "Recyclable", "Reusable", "Compostable", "Corrugated (wood pulp)", "Cellulose"]}, {question: "What goals do you have?", type:"checkbox", answers: ["Cost efficiency", "Aesthetic", "Brandable", "Ability to build a partnership", "Locally sourced", "Not sure"]}], 
[{question: "multi", type:"multi", answers:{selector:["Cup", "Straw", "Plate"]}}]]

let headerMessage = ["We want to get to know your business", "Great! Just dive a little deeper ...", "Almost there! Last question What type of package do you need?"];

function App() {
  return (
    <BrowserRouter>
      <NavB />
      <Routes> 
        <Route exact path = "/" element={<Quiz dataList={testData} headerMessage={headerMessage}/>}></Route>
        <Route path="/dashboard" element={<Dashboard product_data={product_data} responsive={responsive}/>} />

      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App;
