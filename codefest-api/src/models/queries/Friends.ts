export const QUERY_getMyFriends = `
SELECT u.id, u.name, u.email, u.cel, u.role
FROM friend f
INNER JOIN users u ON u.id = f.friend_id
WHERE f.user_id = $1
`