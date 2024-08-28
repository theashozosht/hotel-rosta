export interface ReserveList {
    reserveCode: number
    roomNumber: number
    roomDescription: string
    hasAlternatePassengers: boolean
    passengers: any;
    startDate: Date
    endDate: Date
    reservedBy: string
    receivedBy: string
}

