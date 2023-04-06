
import Order from './domain/checkout/entity/order';
import OrderItem from './domain/checkout/entity/order_item';
import Customer from './domain/customer/entity/customer';
import Address from './domain/customer/value-object/address';

let customer = new Customer("123", "testando");
const address = new Address("rua", 2, "79400", "cx");

customer.changeAddress(address);
customer.activate();

const item1 = new OrderItem("1", "item 1", 20,"p1",2);
const item2 = new OrderItem("2", "item 1", 10,"p2",3);


const order = new Order("1", "123", [item1, item2]);