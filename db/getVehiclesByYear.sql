select vehicles.year, users.name from vehicles
join users on vehicles.owner_id = users.id
where vehicles.year > 2000 order by vehicles.year desc;
