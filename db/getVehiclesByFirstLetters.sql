select vehicles.id, vehicles.make, vehicles.model, vehicles.year, vehicles.owner_id from vehicles
join users on vehicles.owner_id = users.id
where users.name like $1
