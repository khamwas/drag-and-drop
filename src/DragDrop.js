import React, { Component } from 'react';
import './DragDrop.css';

class DragDrop extends Component {
	constructor() {
		super();
		this.state = {
			types: [
				{ name: 'sensory', order: 'initial' },
				{ name: 'fantasy', order: 'initial' },
				{ name: 'fellowship', order: 'initial' },
				{ name: 'narrative', order: 'initial' },
				{ name: 'challenge', order: 'initial' },
				{ name: 'discovery', order: 'initial' },
				{ name: 'expression', order: 'initial' },
				{ name: 'abnegation', order: 'initial' }
			]
		};
		this.onDrop = this.onDrop.bind(this);
	}

	onDragStart(e, name) {
		e.dataTransfer.setData('name', name); //we are setting the value of name on the event here so we can know what is being dropped when we drop this div into its target container
	}

	onDragOver(e) {
		e.preventDefault(); //this is preventing the default for the event so that we can use the values we assigned on dragStart when we drop it.
	}

	onDrop(e, number) {   //I only wanted one container to have one content.  
		let name = e.dataTransfer.getData('name'); 

		let newTypes = this.state.types.map((type) => {  //So I am first copying this.state.types,
			if (type.name === name) {
				return Object.assign({}, { name: type.name, order: number }); //finding the object with the name of what I am dropping and changing its order value to the target container value
			} else if (type.order === number) {
				return Object.assign({}, { name: type.name, order: 'initial' }); //if there is already a content in the container I am kicking it back to the 'initial' container
			} else {
				return type; //if it is unchanged then we want it to stay the same
			}
		});

		this.setState({ types: newTypes }); //we are setting the state to our new order and the DOM will rerender any changes
	}

	render() {
		var orders = {  //I am new, but I would assume it is not best practices to name keys as numberstrings. But I created this for a project that this was the best way for me to do it. I would suggest if implementing this in your own project to use actual strings for names
			initial: [],
			'1': [],
			'2': [],
			'3': [],
			'4': [],
			'5': [],
			'6': [],
			'7': [],
			'8': []
		};
		this.state.types.forEach((elem) => {
			orders[elem.order].push(
				<div
					key={elem.name}
					draggable
					onDragStart={(e) => this.onDragStart(e, elem.name)}
					className="draggable"
				>
					{elem.name}
				</div>
			);
		});
		let wrappers = []; //if you push jsx into an array and render the array, it will only show the jsx. This is the for in loop equivalent of .map to make cards from objects in react.
		for (let x in orders) {
			//you must use let here instead of var. due to scoping and closure or something, this will only drop into the last box if you don't use let. see article
			if (x !== 'initial') { //my initial has different styling, so i left it out of my loop
				//http://www.albertgao.xyz/2016/08/25/why-not-making-functions-within-a-loop-in-javascript/
				wrappers.push(
					<div
						className="droppable"
						onDrop={(e) => this.onDrop(e, x)}
						onDragOver={(e) => this.onDragOver(e)}
					>
						<span className="type-header">{x}</span>
						{orders[x]}
					</div>
				);
			}
		}
		return (
			<div className="resultOuter">
				<h2 className="header">Drag & Drop</h2>
				<div className="container-drag">
					<div //I manually placed initial as it has a different classname, it could also be created in the for in loop if you wanted to share a classname with your other 
						className="order"
						onDrop={(e) => this.onDrop(e, 'initial')}
						onDragOver={(e) => this.onDragOver(e)}
					>
						{orders.initial}
					</div>
					<div>{wrappers}</div>
					{/* <div> //you can use the below code instead of rendering wrappers. wrappers makes all of these with a function so it is more dry.
						<div
							className="droppable"
							onDrop={(e) => this.onDrop(e, '1')}
							onDragOver={(e) => this.onDragOver(e)}
						>
							<span className="type-header">1</span>
							{orders['1']}
						</div>
						<div
							className="droppable"
							onDrop={(e) => this.onDrop(e, '2')}
							onDragOver={(e) => this.onDragOver(e)}
						>
							<span className="type-header">2</span>
							{orders['2']}
						</div>
						<div
							className="droppable"
							onDrop={(e) => this.onDrop(e, '3')}
							onDragOver={(e) => this.onDragOver(e)}
						>
							<span className="type-header">3</span>
							{orders['3']}
						</div>
						<div
							className="droppable"
							onDrop={(e) => this.onDrop(e, '4')}
							onDragOver={(e) => this.onDragOver(e)}
						>
							<span className="type-header">4</span>
							{orders['4']}
						</div>
						<div
							className="droppable"
							onDrop={(e) => this.onDrop(e, '5')}
							onDragOver={(e) => this.onDragOver(e)}
						>
							<span className="type-header">5</span>
							{orders['5']}
						</div>
						<div
							className="droppable"
							onDrop={(e) => this.onDrop(e, '6')}
							onDragOver={(e) => this.onDragOver(e)}
						>
							<span className="type-header">6</span>
							{orders['6']}
						</div>
						<div
							className="droppable"
							onDrop={(e) => this.onDrop(e, '7')}
							onDragOver={(e) => this.onDragOver(e)}
						>
							<span className="type-header">7</span>
							{orders['7']}
						</div>
						<div
							className="droppable"
							onDrop={(e) => this.onDrop(e, '8')}
							onDragOver={(e) => this.onDragOver(e)}
						>
							<span className="type-header">8</span>
							{orders['8']}
						</div>
					</div> */}
				</div>
			</div>
		);
	}
}

export default DragDrop;
