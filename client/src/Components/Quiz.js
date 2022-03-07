import React, {useState} from 'react';
let CONTAINER_LIST = ["neveer", "gonna", "let", "yyou", "down", "neverr", "going to", "give", "yoou", "up", "neever-", "gonnna", "mess", "around", "and", "dessert", "youu"];

// data obj [{question: "text", type"mChoice", answers: [x, y, y]}]
// or in the case of the multi {question: "text", type:"multi", answers:{selector1:[], selector2[]}}

function onSubmit(e, data, pageCount, updatePageCount, done) {
    e.preventDefault();
    if(!done) {
        let newCount = pageCount + 1;
        console.log("next " + data + " " + newCount);
        updatePageCount(newCount);
    }else {
        console.log(data);
    }
}

export default function Quiz({dataList, headerMessage}) {
    let [collectedData, updateData] = useState({multi:[]});
    let [pageCount, updatePageCount] = useState(0);
    let last = false
    console.log(dataList.length);
    let header = headerMessage[0]
    let data = dataList[0];
    if(pageCount <= dataList.length - 1) {
        console.log("hello")
        data = dataList[pageCount];
        header = headerMessage[pageCount];
        if (pageCount == dataList.length - 1) {
            console.log("hi");
            last = true;
        }
    }
    console.log(last);
    let questions = data.map((question) => {
        return (<QuizQuestion questionData={question} data={collectedData} updateData={updateData} key={question.question}/>);
    })
    return (
        <div className='quizPage'>
            <div className='HeaderMessage'>
                <p>
                    {header}
                </p>
            </div>
            <div className='quiz'>
                <form onSubmit={(event) => onSubmit(event, collectedData, pageCount, updatePageCount, last)}>
                    {questions}
                    <button className='submit'>{last ? "Submit" : "Next"}</button>
                </form>
            </div>
        </div>    
    )
}

function QuizQuestion({questionData, data, updateData}) {
    let text = questionData.question;
    let type = questionData.type;
    let answers = questionData.answers;
    let ansObj;
    if(type != "multi" && type != "text") {
        ansObj = answers.map((answer) => {
            return (<div key={answer + "id"}>
                        <input type={type} onChange={(event) => {
                            //May have to feed all of these through the list thing
                            let newData = data;
                            if(!newData[text] && type != "text") {
                                newData[text] = [answer];
                                console.log(newData);
                                updateData(newData);
                            }else {
                                addItem(answer, data, updateData, text)
                            }
                        }} id={answer}/>
                        <label htmlFor={answer}>{answer}</label>
                    </div>)
        });
    }else if (type == "text"){
            ansObj = (<div key={text + "id"}>
            <input type={type} onChange={(event) => {
                let newData = data;
                newData[text] = event.target.value;
                updateData(newData);
            }}/>
            </div>)
    }else {
        return (<MultiSelector itemList={answers.selector} data={data} updateData={updateData}/>)
    }
    return (
        <div>
            <p>{text}</p>
            {ansObj}
        </div>    
    )
}

function addItem(item, data, updateData, id) {
    let newList = [];
    let hasItem = false;
    let selected = data[id];
    //Put list inside of data and just update it like that
    for(let i of selected) {
        if(i != item) {
            newList[newList.length] = i;
        }else {
            hasItem = true;
        }
    }
    if(!hasItem) {
        newList[newList.length] = item;
    }
    let newData = data;
    newData[id] = newList;
    console.log(newData);
    updateData(newData); 
}

function filterList(event, containers, changeContainers) {
    //Basically check the referrer if it's catagory 
    let filter = event.target.value;
    //preload these in the future because this will be like pretty slow if the list is large, or maybe switch this to serverside
    let filteredList = [];
    for(let i of CONTAINER_LIST) {
        if(i.includes(filter)) {
            filteredList[filteredList.length] = i;
        }
    }
    changeContainers(filteredList);
    //add case for clearing filter
}

function MultiSelector({itemList, data, updateData}) {
    let [containers, changeContainers] = useState(CONTAINER_LIST);
    let itemListSelector = itemList.map((lItem => {
        return (<option value={lItem} key={lItem}>{lItem}</option>)
    }))
    let containerList = containers.map(item => {
        return (
            <div key={item + "id"}>
                <input type="checkbox" id={item} onClick={() => addItem(item, data, updateData, "multi")}/>
                <label htmlFor={item}>{item}</label>
            </div>
        )
    })
    return (
        <div className='multi-selector'>
            <div className='selectors'>
                <select name="Select Package Type" onChange={(event) => filterList(event, containers, changeContainers)}>
                    {itemListSelector}
                </select>
            </div>
            <div className='item-list'>
                {containerList}
            </div>
        </div>
    )
}