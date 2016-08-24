import Immutable from 'immutable';
import expect from "expect";
import { createStore } from "redux"
import React from 'react';
import ReactDOM from 'react-dom';
import '../sass/styles.scss';

/**
 * State:
 *   0 => Red,
 *   1 => Yellow,
 *   2 => Green
 *
 * Transition:
 *   0 => 2, Red => Green
 *   1 => 0, Yellow => Red
 *   2 => 1, Green => Yellow
 *
 * TrafficLight
 *   Param: (State)
 *   Structure:
 *     <div>
 *       <div class="state of Green"></div>
 *       <div class="state of Yellow"></div>
 *       <div class="state of Red"></div>
 *     </div>
 *     <button>action to change state</button>
 *
 *  Reductor: ChangeTrafficLight
 *  Param (State, action)
 *  Default State: 0 (Red)
 *  Action Default: CHANGE_TRAFFIC_LIGHT
 *
 *  Render:
 *  Structure:
 *    <TrafficLight actual_state/>
 *
 */

const TrafficLight = ({state}) =>(
	<div>
		<div class="traffic-light">
			<div class={check_state(state, "green")}></div>
			<div class={check_state(state, "yellow")}></div>
			<div class={check_state(state, "red")}></div>
		</div>
		<button onClick={ () => store.dispatch({ type:'CHANGE_TRAFFIC_LIGHT'})}>Move On</button>
	</div>
);

// Check the actual state
const check_state = (state = 0, color) => {
	if (color === "red") {
		if (state !== 0) {
			return "light red off";
		}
		return "light red";
	}

	if (color === "yellow") {
		if (state !== 1) {
			return "light yellow off";
		}
		return "light yellow";
	}

	if (color === "green") {
		if (state !== 2) {
			return "light green off";
		}
		return "light green";
	}
}

// Reducer
const ChangeTrafficLight = (state = 0,action) => {
 /*
 * Transition:
 *   0 => 2, Red => Green
 *   1 => 0, Yellow => Red
 *   2 => 1, Green => Yellow
 */
	if(action.type === 'CHANGE_TRAFFIC_LIGHT') {
		switch (state) {
			case 0:
				return 2;
			case 1:
				return 0;
			case 2:
				return 1;
			default:
				return state;
		}
	}
	return state;
}

const store = createStore(ChangeTrafficLight);

const render = () => {
	ReactDOM.render(
		<TrafficLight state={ store.getState() }/>,
		document.getElementById("root")
	);
}

store.subscribe(render);
render();
