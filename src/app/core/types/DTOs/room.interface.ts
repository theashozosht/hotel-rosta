import { PassengerDataAccess } from "@core/types";

export interface RoomDataAccess {
    roomNumber: number;
    isRoomFull: boolean;
    passengers: PassengerDataAccess;
    agencyName: string;
    reservedFrom: Date;
    reservedUntil: Date;
}