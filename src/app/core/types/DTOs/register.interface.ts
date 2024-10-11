import { ContractTypes, PaymentMethods,  PassengerDataAccessDTO } from "@core/types";

export interface RegisterDataAccess {
    registerId: number;
    startDate: string;
    endDate: string;
    paymentMethod: PaymentMethods
    contractType: ContractTypes
    price: number;
    paidPrice: number;
    phoneNumber?: number;
    telephoneNumber?: number;
    reservedBy: string;
    passenger?: PassengerDataAccessDTO; // Single passenger object
}