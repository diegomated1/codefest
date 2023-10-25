export const query_GetMessages = `
SELECT * 
FROM message_users 
WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1)
ORDER BY created_date
`;