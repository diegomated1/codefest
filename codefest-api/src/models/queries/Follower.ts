export const QUERY_getMyFollowers = `
SELECT u.id, u.name, u.email, u.cel, u.role
FROM follower f
INNER JOIN users u ON u.id = f.follower_id
WHERE f.user_id = $1
`