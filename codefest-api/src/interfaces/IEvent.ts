export interface IEvent {
  description: string;
  location: string;
  creator_id: string;
  created_date: Date;
  start_date: Date;
  end_date: Date;
  groups_id: string[];
  urlEvent: string
}