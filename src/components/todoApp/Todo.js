import React from 'react'
import './style.css'
import { useState , useEffect} from 'react';

const getLocalData = () =>{
	const lists = localStorage.getItem("mytodolist");	
	if(lists){
		return JSON.parse(lists)
	}
	else {
		return []
	}
}

const Todo = () => {
	const [inputData,setInputData] = useState("");
	const [items,setItems] = useState(getLocalData());
	const [isEditItem,setIsEditItem] = useState("");
	const [toggleButton,setToggleButton] = useState(false);

	const addItem = () => {
		if(!inputData){
			alert("Please Add Item First")
		}
		else if(inputData && toggleButton){
			setItems(
				items.map((currElem)=>{
					if(currElem.id===isEditItem){
						return  {... currElem , name:inputData}
					}
					return currElem
				})
			)
			setIsEditItem(null)
			setInputData("")
			setToggleButton(false)
		}
		else{
			const myNewInputData = {
				id : new Date().getTime().toString(),
				name : inputData
			}
			setItems([ ... items,myNewInputData])
			setInputData("")
		}
	}

	const deleteItem = (id) => {
		const updatedItems = items.filter((currElem) => {
			return currElem.id !== id;
		})

		setItems(updatedItems)
	}

	const editItem = (id) => {
		const selectdItem =  items.find((currElem) =>{
			return currElem.id === id ;
		})
		setIsEditItem(id)
		setInputData(selectdItem.name)
		setToggleButton(true);
	}

	const removeAll = () => {
		setItems([])
	}

	useEffect(() => {
		localStorage.setItem("mytodolist",JSON.stringify(items))
	}, [items])

	return (
	<>
		<div className="main-div">
			<div className="child-div">
				<figure>
					<img src="./images/todo.svg" alt="todologo" />
					<figcaption>Add Your List Here {'\u2728'}</figcaption>
				</figure>
				<div className="addItems">
					<input type="text" placeholder="Add Item" className="form-control"
					value = {inputData}
					onChange = {(event) => setInputData(event.target.value)}
					/>
					{toggleButton ? <i className="fa fa-edit" onClick={addItem}></i> :
					<i className="fa fa-plus" onClick={addItem}></i>}
					
				</div>
				{/* show items here */}
				<div className="showItems">
					{
						items.map((currItem , index) => {
							return (
								<div className="eachItem" key={index}>
								<h3>{currItem.name}</h3>
								<div className="todo-btn">
								<i className="far fa-edit" onClick={() => editItem(currItem.id)}></i>
								<i className="far fa-trash-alt" onClick={() => deleteItem(currItem.id) }></i>
								</div>
					</div>
							)
						})
					}
					
				</div>

				<div className="showItems">
					<button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}>
						<span>Check List</span> 
					</button>
				</div>
			</div>
		</div>
	</>
	)
}

export default Todo
