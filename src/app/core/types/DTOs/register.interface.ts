import { ContractTypes, PaymentMethods, AgencyDataAccess, PassengerDataAccess } from "@core/types";

export interface RegisterDataAccess {
    registerId: number
    passengerName: string
    startDate: string
    endDate: string
    paymentMethod: PaymentMethods
    contractType: ContractTypes
    price: number
    paidPrice: number
    reservedAt: Date
    reservedBy: string
    passenger: PassengerDataAccess
    agency: AgencyDataAccess
}