import './App.css';
import { Dashboard } from './Components/Dashboard';
import product_data from './data/vegware.json';

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

function App() {
  return (
    <Dashboard product_data={product_data} responsive={responsive}/>
  )
}

export default App;
