export class Product{
	
	public item_id:string;
	public name:string;
	public first_bid:string;
	public currently:string;
	public location:string;
	public country:string;
	public started:string;
	public ends:string;
	public description:string;
	public number_of_bids:string;
	public buy_price:string;
	public user_id:string;

	constructor(item_id:string,
	 name:string,
	first_bid:string,
    currently:string,
	location:string,
	country:string,
	started:string,
	ends:string,
	description:string,
	number_of_bids:string,
	buy_price:string,
	user_id:string)
	{
	this.item_id=item_id;
	this.name=name;
	this.first_bid=first_bid;
	this.location=location
	this.currently=currently;
	this.country=country;
	this.started=started;
	this.ends=ends;
	this.description=description;
	this.number_of_bids=number_of_bids;
	this.buy_price=buy_price;
	this.user_id=user_id;

	}
}