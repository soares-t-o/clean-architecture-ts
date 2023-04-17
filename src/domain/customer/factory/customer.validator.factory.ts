import ValidatorInterface from "../../@shared/validator/validator.interface";
import Customer from "../entity/customer";
import CustormerYupValidator from "../validator/customer.yup.validator";

export default class CustomerValidatorFactory {
    static create(): ValidatorInterface<Customer> {
        return new CustormerYupValidator();
    }
}