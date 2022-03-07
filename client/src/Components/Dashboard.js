import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


export function Dashboard(props) {
  return (
    <div className="container">
      <div className="background-format">
        <QuizResults />
        <Recommendations product_data={props.product_data} responsive={props.responsive}/>
        <Regulations />
      </div>
    </div>
  )

}


function QuizResults(props) {
  return (
    <div className="dashboard-section">
      <div className="section-heading-container">
        <h2>You indicated that you are looking for the following things</h2>
      </div>
      <div className="section-body-container">
        <p>Biodegradable, Compostable, double wall cup, single wall cup, with a focus on <strong>Cost Efficiency</strong> and <strong>Aesthetic</strong></p>
      </div>
    </div>
  )

}


function Recommendations(props) {
  // hardcoding these cause we don't have a backend/db yet
  let products_wanted = {
    "8-10 oz Cups": [
      ["Double wall cups", "8oz double wall cup, 79-Series"], 
      ["Double wall cups", "8oz white embossed hot cup, 79-Series"], 
      ["Single wall hot cups", "8oz white hot cup, 79-Series"],
      ["Single wall hot cups", "8oz brown kraft hot cup, 79-Series"],
      ["Single wall hot cups", "10oz brown kraft hot cup, 89-Series"],
      ["Single wall hot cups", "10oz white hot cup, 89-Series"]
    ],
    "Bagasse Takeout Boxes": [
      ["Bagasse takeout boxes", "9 x 6in large bagasse clamshell"],
      ["Bagasse takeout boxes", "9 x 8in bagasse lunch box"],
      ["Bagasse takeout boxes", "8in square bagasse lunch box"],
      ["Bagasse takeout boxes", "9in three compartment bagasse lunch box"],
      ["Bagasse takeout boxes", "10in bagasse clamshell"]
    ],
    "Biodegrdable Straws": [
      ["Straws", "Standard green stripe 5mm ecovio straw, 8.25in"],
      ["Straws", "Standard green stripe 6mm paper straw, 7.8in"],
      ["Straws", "Highball black 6mm paper straw, 7.8in"],
      ["Straws", "Standard white 6mm paper straw, wrapped, 7.8in"],
      ["Straws", "Cocktail black 6mm paper straw, 5.75in"]
    ]
  }

  // ^ need to figure out how to handle long prod names & box sizing

  let product_carousel = Object.keys(products_wanted).map((section_name) => {
    // going through each tuple in each section and creating the carousel items
    let carousel_items = products_wanted[section_name].map((prod_tuple) => {
      // Double wall cups, Single wall hot cups, Bagasee takeout boxes, Straws
      let vegware_section_data = props.product_data[prod_tuple[0]];
      let vegware_section_keys = Object.keys(vegware_section_data);
      let final_element = null;

      // using for loop instead of forEach to break early if we find the prod we're looking for
      // ex for Bagasse takeout boxes -> Hinged boxes
      for (let i = 0; i < vegware_section_keys.length; i++) {
        let curr_section_data = vegware_section_data[vegware_section_keys[i]];
        let prods = Object.keys(curr_section_data);

        for (let j = 0; j < prods.length; j++) {
          if (prods[j] === prod_tuple[1]) { // we found the prod we're looking for
            let curr_prod_name = prods[j];
            let curr_prod_info = curr_section_data[curr_prod_name];

            let price_breakdown_elements = curr_prod_info["price_breakdowns"].map((bd) => {
              return (
                <p className="price-formatting">{bd}</p>
              )
            });

            let format_tag;
            // maybe find a way to dynamically add to the class list
            if (curr_prod_info["price_breakdowns"].length <= 1) { // checking how many price breakdowns we have and formatting the tag accordingly
              format_tag = (<p className="one-breakdown"><i>Recyclable, Biodegradable</i></p>)

            } else {
              format_tag = (<p><i>Recyclable, Biodegradable</i></p>)

            }

            final_element = (
              <div className="product-container" key={curr_prod_name}>
                <a href={curr_prod_info["url"]} target="_blank" rel="noreferrer">
                  <img className="image-formatting" alt={curr_prod_name} src={curr_prod_info["image_url"]} draggable={false}/>
                </a>
                <div className="product-descr">
                  <p><strong>{curr_prod_name}</strong></p>
                  {price_breakdown_elements}
                  {format_tag}
                </div>
              </div>
            )

            break;

          }
        }

        if (final_element) {
          break;
        }

      }
      
      return final_element;

    })

    return (
      <div className="section-body-container" draggable={false} style={{ width: "100%", cursor: "pointer" }}>
        <div className="recommended-cat-heading">
          <p className="cat-heading-formatting">{section_name}</p>
        </div>
        <div className="recommended-cat-heading-border"></div>
        <Carousel className="carousel-container" partialVisible={true} responsive={props.responsive} itemClass="prod-class" autoPlay={false} swipeable={true}>
          {carousel_items}
        </Carousel>
      </div>
    )

  })

  return (
    <div className="dashboard-section">
      <div className="section-heading-container">
        <h2>Based on your responses here are some things we think you will like</h2>
      </div>
      {product_carousel}
    </div>
  )

}


function Regulations(props) {
  return (
    <div className="dashboard-section">
      <div className="section-heading-container">
        <h2>Regulations in your area</h2>
      </div>
      <div className="regulations-container">
        <p>The City of <strong>Seattle</strong> requires all food service businesses to find recyclable or compostable 
          packaging and serviceware alternatives to all disposable food service items such as containers, cups, straws, 
          utensils, and other products. This applies to all food service businesses, including restaurants, 
          grocery stores, delis, coffee shops, food trucks, and institutional cafeterias.</p>
        <p>In addition, businesses with customer disposal stations where customers discard single-use packaging must 
          provide options to collect recyclable and compostable packaging in clearly labeled bins and these businesses 
          must sign up for composting and recycling service offered by a collection service provider.</p>
        <h3 className="regulations-subheading-formatting">Banned Items</h3>
        <p>The foam ban, which bans expanded polystyrene (EPS, sometimes called "Styrofoam"), took effect January 1, 
          2009. The ban on non-recyclable and/or non-compostable disposable food packaging and service ware took effect 
          July 1, 2010.</p>
        <p>The straws & utensils ban, which bans plastic straws, spoons, forks, and knives was effective July 1, 2018. 
          Food service businesses must use compostable straws and compostable utensils</p>
        <a href="https://www.seattle.gov/utilities/your-services/collection-and-disposal/food-and-yard/business-and-commercial-compostables/food-packaging-requirements" target="_blank" rel="noreferrer">
          {"Read more here >"}
        </a>
      </div>
    </div>
  )

}