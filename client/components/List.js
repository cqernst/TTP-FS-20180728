import React from 'react';

/* Worth noting -- this is inefficient bc if we are dynamically updating prices,
we might not want to re-render the whole list component just because one price updates. 
Right now it isn't a huge deal but maybe in the future it would be?
*/

export const List = props => {
	return (
		<div className="list">
			<h4 className="list-header">{props.type}</h4>
			{props.listItems.map(item => {
				let status;
				if (item.currentPrice > item.openPrice) {
					status = 'up';
				} else if (item.currentPrice < item.openPrice) {
					status = 'down';
				} else {
					status = 'no-change';
				}
				return (
					<div className="list-item">
						{props.type === 'transactions' ? (
							<span className="item-transaction">buy</span>
						) : null}
						<span className="item-symbol">
							({item.stock_symbol}) -{' '}
						</span>
						<span className="item-count">
							{props.type === 'portfolio'
								? item.total
								: item.quantity}
						</span>
						{props.type === 'transactions' ? (
							<span className="item-price">${item.price}</span>
						) : (
							<span className={`${status} item-price`}>
								${item.currentPrice}
							</span>
						)}
					</div>
				);
			})}
		</div>
	);
};
