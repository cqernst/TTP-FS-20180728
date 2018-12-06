import React from 'react';

/*
expect props to have: a list type
and a list of listitems
each list item has:
 - transaction type (optional, only for list type of "transactions") 
 - symbol (required)
 - price (required)
 - count (required)
*/

/* Worth noting -- this is inefficient bc if we are dynamically updating prices,
we might not want to re-render the whole list component just because one price updates. 
Right now it isn't a huge deal but maybe in the future it would be?
*/

export const List = props => {
	return (
		<div className="list">
			<h4 className="list-header">{props.type}</h4>
			{props.listitems.map(item => {
				return (
					<div className="list-item">
						{item.transaction ? (
							<span className="item-transaction">
								{item.transaction}
							</span>
						) : null}
						<span className="item-symbol">({item.symbol}) - </span>
						<span className="item-count">{item.count}</span>
						<span className="item-price">{item.price}</span>
					</div>
				);
			})}
		</div>
	);
};