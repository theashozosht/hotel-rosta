import { PassengerPaymentStatus } from "../enums";

export interface PassengerListResponse {
        passengerName: string,
        passengerID: string | number,
        birthDate: string | Date,
        phoneNumber: string | number,
        fromDate: string | Date,
        toDate: string | Date,
        lastRegisterId: string | number,
        status:  PassengerPaymentStatus,
}