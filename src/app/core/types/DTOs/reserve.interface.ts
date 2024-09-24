import { AgencyDataAccess, PassengerDataAccess, RegisterDataAccess} from "@core/types";

export interface ReserveDataAccess {
    reserveCode: number;
    roomNumber: number;
    roomDescription: string;
    roomPrice: string;
    hasAlternatePassengers: boolean;
    startDate: Date;
    endDate: Date;
    reservedBy: string;
    receivedBy: string;
    agency: AgencyDataAccess;
    register: RegisterDataAccess;
    passenger: PassengerDataAccess;
}

export interface ReserveDataAccessDTO {
    roomNumber: number;
    roomDescription: string;
    roomPrice: string;
    hasAlternatePassengers: boolean;
    startDate: Date;
    endDate: Date;
    reservedBy: string;
    receivedBy: string;
    registerId: number | string;
    agencyCode: number;
    passenger: PassengerDataAccess;
}