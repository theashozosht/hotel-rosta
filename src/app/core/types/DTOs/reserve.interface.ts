import { AgencyDataAccess, PassengerDataAccess, RegisterDataAccess} from "@core/types";

export interface ReserveDataAccess {
    reserveCode: number;
    roomNumber: number;
    roomDescription: string;
    hasAlternatePassengers: boolean;
    startDate: Date;
    endDate: Date;
    reservedBy: string;
    receivedBy: string;
    agency: AgencyDataAccess;
    register: RegisterDataAccess;
    passengers: PassengerDataAccess[];
}

export interface ReserveDataAccessDTO {
    reserveCode: number;
    roomNumber: number;
    roomDescription: string;
    hasAlternatePassengers: boolean;
    startDate: Date;
    endDate: Date;
    reservedBy: string;
    receivedBy: string;
    passengers: PassengerDataAccess;
}