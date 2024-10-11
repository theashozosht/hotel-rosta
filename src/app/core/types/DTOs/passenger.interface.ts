import { PaymentStatus, RegisterDataAccess} from "@core/types";

export interface PassengerDataAccess {
    firstName: string;
    lastName: string;
    nationalID: string;
    nationalityType: string;
    phoneNumber: string;
    lastEndDate?: Date
    lastRegisterNumber?: number;
    registerObj?: RegisterDataAccess;
    birthDate: Date;
    paymentStatus?: PaymentStatus
}

export interface PassengerDataAccessDTO {
    firstName: string;
    lastName: string;
    nationalID: string;
    nationalityType: string;
    phoneNumber: string;
    lastEndDate?: Date
    lastRegisterNumber?: number;
    registerObj?: RegisterDataAccess;
    birthDate: Date;
    paymentStatus?: PaymentStatus
}