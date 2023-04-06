
import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import { CustomerUpdatedEvent } from "../customer-updated.events";


export default class SendConsoleLogHandler implements EventHandlerInterface<CustomerUpdatedEvent>{

    handle(event: CustomerUpdatedEvent): void {
        console.log(`Endereço do cliente: 
            ${event.eventData.id}, ${event.eventData.nome} alterado para: ${event.eventData.endereco}`
        );
    }

}