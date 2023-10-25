export interface IEvent {
    id: string;
    user_id: string;
    title: string;
    description: string;
    location: string;
    date: Date;
    availability: number;
    likes: number;
    subscribed: number;
  }