/**
 * ACTION TYPES
 */
const SET_VIEW = 'SET_VIEW';

/**
 * INITIAL STATE
 */

const defaultView = 'transactions';

/**
 * ACTION CREATORS
 */
const setView = view => ({ type: SET_VIEW, view });

/**
 * THUNK CREATORS
 */
export const updateHomePage = view => dispatch => dispatch(setView(view));

/**
 * REDUCER
 */
export default function(state = defaultView, action) {
	switch (action.type) {
		case SET_VIEW:
			return action.view;
		default:
			return state;
	}
}
