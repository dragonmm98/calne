export interface Event {
    _id: string;
    event_name: string;
    event_status: string;
    event_description: string;
    event_image: string[];
    createdAt: Date;
    updatedAt: Date;
}