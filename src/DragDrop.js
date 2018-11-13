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
		e.dataTransfer.setData('name', name);
	}

	onDragOver(e) {
		e.preventDefault();
	}

	onDrop(e, number) {
		let name = e.dataTransfer.getData('name');

		let newTypes = this.state.types.map((type) => {
			if (type.name === name) {
				return Object.assign({}, { name: type.name, order: number });
			} else if (type.order === number) {
				return Object.assign({}, { name: type.name, order: 'initial' });
			} else {
				return type;
			}
		});

		this.setState({ types: newTypes });
	}

	makeProfile() {
		let profile = [];
		for (let i = 1; i < 9; i++) {
			profile.push(
				this.state.types
					.filter((elem) => elem.order.includes(i))
					.map((item) => item.name)[0]
			);
		}

		if (profile.length === 8) {
			this.setState({ profile: profile });
		}
	}

	render() {
		var orders = {
			initial: [],
			one1: [],
			two2: [],
			three3: [],
			four4: [],
			five5: [],
			six6: [],
			seven7: [],
			eight8: []
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
		// let wrappers = [];
		// for (var x in orders) {
		// 	if (x !== 'initial') {
		// 		wrappers.push(
		// 			<div
		// 				className="droppable"
		// 				onDrop={(e) => this.onDrop(e, x)}
		// 				onDragOver={(e) => this.onDragOver(e)}
		// 			>
		// 				<span className="type-header">{x.substr(-1)}</span>
		// 				{orders[x]}
		// 			</div>
		// 		);
		// 	}
		// }
		return (
			<div className="container-drag">
				<h2 className="header">Drag & Drop</h2>
				<div
					className="order"
					onDrop={(e) => this.onDrop(e, 'initial')}
					onDragOver={(e) => this.onDragOver(e)}
				>
					<span className="type-header">INITIAL</span>
					{orders.initial}
				</div>
				{/* {wrappers} */}
				<div
					className="droppable"
					onDrop={(e) => this.onDrop(e, 'one1')}
					onDragOver={(e) => this.onDragOver(e)}
				>
					<span className="type-header">1</span>
					{orders.one1}
				</div>
				<div
					className="droppable"
					onDrop={(e) => this.onDrop(e, 'two2')}
					onDragOver={(e) => this.onDragOver(e)}
				>
					<span className="type-header">2</span>
					{orders.two2}
				</div>
				<div
					className="droppable"
					onDrop={(e) => this.onDrop(e, 'three3')}
					onDragOver={(e) => this.onDragOver(e)}
				>
					<span className="type-header">3</span>
					{orders.three3}
				</div>
				<div
					className="droppable"
					onDrop={(e) => this.onDrop(e, 'four4')}
					onDragOver={(e) => this.onDragOver(e)}
				>
					<span className="type-header">4</span>
					{orders.four4}
				</div>
				<div
					className="droppable"
					onDrop={(e) => this.onDrop(e, 'five5')}
					onDragOver={(e) => this.onDragOver(e)}
				>
					<span className="type-header">5</span>
					{orders.five5}
				</div>
				<div
					className="droppable"
					onDrop={(e) => this.onDrop(e, 'six6')}
					onDragOver={(e) => this.onDragOver(e)}
				>
					<span className="type-header">6</span>
					{orders.six6}
				</div>
				<div
					className="droppable"
					onDrop={(e) => this.onDrop(e, 'seven7')}
					onDragOver={(e) => this.onDragOver(e)}
				>
					<span className="type-header">7</span>
					{orders.seven7}
				</div>
				<div
					className="droppable"
					onDrop={(e) => this.onDrop(e, 'eight8')}
					onDragOver={(e) => this.onDragOver(e)}
				>
					<span className="type-header">8</span>
					{orders.eight8}
				</div>

				<button onClick={() => this.makeProfile()}>Make Profile</button>
			</div>
		);
	}
}

export default DragDrop;
