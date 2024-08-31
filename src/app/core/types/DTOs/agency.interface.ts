import { AgencyStatus, ContractTypes, RegisterDataAccess } from "@core/types";

export interface AgencyDataAccess {
    agencyName: string;
    agencyCode: number;
    agencyStatus: AgencyStatus;
    contractType: ContractTypes;
    hasCredit: boolean;
    creditLeft: number;
    manager: string;
    coordinator: string;
    address: string;
    phoneNumber: string;
    telephone?: string | null;
    color: string;
    registers: RegisterDataAccess[]
}