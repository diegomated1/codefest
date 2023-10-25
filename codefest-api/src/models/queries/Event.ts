export const QUERY_setEvent = `
INSERT INTO event (description, location, creator_id, created_date, start_date, end_date)
VALUES ($1, $2, $3, $4, $5, $6);
`