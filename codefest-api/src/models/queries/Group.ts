export const QUERY_groupById = `
SELECT
    g.id, g.name, g.description, g.rate, g.created_date,
    (
        SELECT jsonb_agg(
            JSON_BUILD_OBJECT(
                'id', u.id,
                'name', u.name,
                'email', u.email,
                'cel', u.cel,
                'role', u.role
            )
        )
        FROM users u
        WHERE ug.user_id = u.id
    ) as participants
FROM groups g
INNER JOIN user_groups ug ON ug.groups_id = g.id
WHERE g.id = $1
`;

export const QUERY_groupByU3serId = `
SELECT
    g.id, g.name, g.description, g.rate, g.created_date,
    (
        SELECT jsonb_agg(
            JSON_BUILD_OBJECT(
                'id', u.id,
                'name', u.name,
                'email', u.email,
                'cel', u.cel,
                'role', u.role
            )
        )
        FROM users u
        WHERE ug_p.user_id = u.id
    ) as participants
FROM groups g
INNER JOIN user_groups ug ON ug.groups_id = g.id
INNER JOIN user_groups ug_p ON ug_p.groups_id = g.id
WHERE ug.user_id = $1
`;

export const QUERY_groupByUserId = `
SELECT
    g.id, g.name, g.description, g.rate, g.created_date,
    (
        SELECT jsonb_agg(
            JSON_BUILD_OBJECT(
                'id', u.id,
                'name', u.name,
                'email', u.email,
                'cel', u.cel,
                'role', u.role
            )
        )
        FROM user_groups ugp
        INNER JOIN users u ON u.id = ugp.user_id
        WHERE ugp.groups_id = g.id
    ) as participants
FROM groups g
INNER JOIN user_groups ug ON ug.groups_id = g.id
WHERE ug.user_id = $1
`;