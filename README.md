This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Making a React Drag and Drop with No Libraries

<div style="width:100%;height:0;padding-bottom:73%;position:relative;"><iframe src="https://giphy.com/embed/7zAyYH06tBurRcjyIf" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>

[Drag-and-drop repo](https://github.com/khamwas/drag-and-drop)

Many people use React-dnd to implement a drag and drop functionality into their React projects. I would recommend looking at their library if you want to use drag and drop in a project you are working on. Especially since there is support for React-dnd to work on touchscreens. (This method does not work on touchscreens out-of-the-box). But if you want to know how to implement it yourself. This is a great place to start.

## Credit Where Credit is Due

I learned this method from the FreeCodeCamp article [Implement Drag and Drop without external libraries](https://medium.freecodecamp.org/reactjs-implement-drag-and-drop-feature-without-using-external-libraries-ad8994429f1a). So if you find anything in my Repo confusing, maybe visiting his post will help clarify things.

## Set up

#### You can either create a new project or add a component to an existing project. All you need is to import React

```js
import React, { Component } from 'react';
```

#### and create a new class

```js
class DragDrop extends Component {
	constructor() {
		super();
		this.state = {};
	}
	render() {
		return <div>DragDrop</div>;
	}
}
export default DragDrop;
```

#### The next step is to initialize the state of the items you are going to be drag and dropping. I have initialized mine with a order of initial, this is the box they begin in and return to if they are placed in the same order container.

```js
	class DragDrop extends Component{
		constructor(){
			super();
			this.state={
			this.state  = {
types: [
{ name:  'sensory', order:  'initial' },
{ name:  'fantasy', order:  'initial' },
{ name:  'fellowship', order:  'initial' },
{ name:  'narrative', order:  'initial' },
{ name:  'challenge', order:  'initial' },
{ name:  'discovery', order:  'initial' },
{ name:  'expression', order:  'initial' },
{ name:  'abnegation', order:  'initial' }
]
};
			}
		}

		render(){
			return<div>DragDrop</div>
		}
	}
```

#### We want to sort these names in our render, so when they are changed they will update to appear in their new spot. So we push each obj in state into the corresponding array in our render method.

```js
	render(){
	var order = {
	intial:[],
	'1':[],
	'2':[],
	'3':[],
	'4':[],
	'5':[],
	'6':[],
	'7':[],
	'8':[]
	}
		this.state.types.forEach((elem) => {
orders[elem.order].push(
<div
key={elem.name}
draggable
onDragStart={(e) =>  this.onDragStart(e, elem.name)}
className="draggable"
>
{elem.name}
</div>
);

});
	return <div>DragDrop</div>
}
```

#### Now that the render method 'orders' obj is filled, we want to map over that using a for in loop so we have something to display.

```js
let wrappers = [];
for (let x in orders) {
	if (x !== 'initial') {
		wrappers.push(
			<div className="container-drag">
				<div
					className="droppable"
					onDrop={(e) => this.onDrop(e, x)}
					onDragOver={(e) => this.onDragOver(e)}
				>
					<span className="type-header">{x}</span>
					{orders[x]}
				</div>
			</div>
		);
	}
}
return <div>{wrappers}</div>;
```

#### Now the wrappers are all displayed. This is essentially each orders obj displayed individually. There is only the initially div left, I left it out since i wanted to use different styling.

```js
return (
<div  className="resultOuter">
	<h2  className="header">Drag & Drop</h2>
		<div  className="container-drag">
			<div
				className="order"
				onDrop={(e) =>  this.onDrop(e, 'initial')}
				onDragOver={(e) =>  this.onDragOver(e)}
			>
			{orders.initial}
			</div>
			<div>{wrappers}</div>
		</div>
	</div>
```

## Drag and Drop Functionality

### Drag Start

```js
onDragStart(e, name) {
e.dataTransfer.setData('name', name);
}
```

Here we are getting the information of what the user is dragging so that we can use it later to set the state of its order property once it is dropped. This should go on each item that we wish to be "draggable". We have accomplished this by giving each item we created with our .forEach in our orders arrays the onDragStart and passed in the event and the name of the element.

```js
<div
	key={elem.name}
	draggable
	onDragStart={(e) =>  this.onDragStart(e, elem.name)}
	className="draggable"
	>
```

### On Drag Over

We want to prevent the default because we do not want the built in dragover defaults to clean the ondragstart information that we have assigned to our drag event. That would prevent us from using it later when we drop the the div into its new location.

```js
onDragOver(e) {
e.preventDefault();
}
```

We assign this to each location that we want to accept a drop (we have added it to most when we mapped over our orders arrays with our for loop).

```js
<div
	className="droppable"
	onDrop={(e) =>  this.onDrop(e, x)}
	onDragOver={(e) =>  this.onDragOver(e)}
	>
```

### On Drop

This is really the most complicated part of the functionality. This is where you will have to change the code to fit your desired functionality.

We renamed the information we have saved with our onDragStart.
We are making a copy of our state with .map and the first case looks for the object that has the name property matching the name we are passing in from our onDragStart function. It finds this and assigns it the order value of the container receiving it.

Our second case checks if there is already a div in the receiving container (I don't want a container to accept two for my purposes). If it finds that there is one, it kicks that div back into the 'initial' box.

Any other items are returned as they are so they remain unchanged.

```js
onDrop(e, number) {
let name =  e.dataTransfer.getData('name');

let newTypes =  this.state.types.map((type) => {
	if (type.name  === name) {
		return  Object.assign({}, { name:  type.name, order: number });
	} else  if (type.order  === number) {
		return  Object.assign({}, { name:  type.name, order:  'initial' });
	} else {
		return type;
}
});
this.setState({ types: newTypes });
}
```

We have assigned each place to accept a drop the onDrop that we have written using the code below.

```js
<div
	className="droppable"
	onDrop={(e) =>  this.onDrop(e, x)}
	onDragOver={(e) =>  this.onDragOver(e)}
	>
```

# Thank you for reading and I hope you found it helpful. I have also commented the document if you would rather take a look at the whole code with the explanations in context.
