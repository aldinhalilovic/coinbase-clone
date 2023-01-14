export default class Coin {
  id: number;
  name: string;
  symbol: string;
  price: number;
  precentChange: number;

  constructor(
    id: number,
    name: string,
    symbol: string,
    price: number,
    precentChange: number
  ) {
    this.id = id;
    this.name = name;
    this.symbol = symbol;
    this.price = price;
    this.precentChange = precentChange;
  }
}
