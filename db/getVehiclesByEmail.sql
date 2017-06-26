select from vehicles
join users on vehicles.owner_id = users.id
where users.email = $1;
