Change directory to `/usr/vcs/docker/migration-scripts`
```
cd /usr/vcs/docker/migration-scripts
```
This directory contains scripts for migrating an SQLite database to a Postgres database as well as setting up a new database with the server ID.

## Prerequisites

- Postgres installed and running [[Postgres + docker compose setup]]
- Liquibase installed (Automated with [[Postgres + docker compose setup]])
- Execution of Liquibase scripts (Automated with [[Postgres + docker compose setup]])
- SQLite database file(s) to be migrated(for existing server upgrades only)
- sqlite3 installed (for existing server upgrades only)
```
sudo zypper refresh
```
```
sudo zypper install sqlite3
```

## Setup

Make the scripts are executable, if not:
```
chmod +x database_migration.sh
chmod +x disable_constraints.sh
chmod +x create_db_dump.sh
chmod +x transform_db_dump.sh
chmod +x consolidate.sh
chmod +x update_server_id.sh
chmod +x cleanup_failed_database_migration.sh
```

#### Existing Server Upgrade Only
For single server grab the `vcs.db` file, and rename it `serverID.db`(use the actual server id of the server, in case of `vcs.db-wal` and `vcs.db-shm` rename those with the server id as well).
Example:
```
cp /usr/vcs/database/vcs.db './Test VM.db'
```
```
cp /usr/vcs/database/vcs.db-shm './Test VM.db-shm'
```
```
cp /usr/vcs/database/vcs.db-wal './Test VM.db-wal'                     
```

For multi server do the same with their own server id.
Move the database file(s) to the scripts directory(`/usr/vcs/docker/migration-scripts`)

## Running the Migration

**Required info:**
- server_id - server id for the server
- psql_path - path to Postgres psql 
>Example: `docker exec -i docker-postgres-1 psql`
>`docker-postgres-1` - name of the Docker container which can be found by
>running `docker ps` ([[running services.png]])
- postgres_user
>APP_USER="vcs" from docker compose environment(.env) of [[Postgres + docker compose setup]]
- database_name
>DB_NAME="postgres" from docker compose environment(.env) of [[Postgres + docker compose setup]]
- docker_command - psql_path -U postgres_user -d database_name
Example: `docker exec -i docker-postgres-1 psql -U vcs -d postgres

#### New Server Install

Run the `update_server_id.sh` script with the `server_id` and the `docker_command` parameter:

Example of running the script with Docker instance of Postgres(replace server_id, name of docker container, user, and database with the correct information):

```
./update_server_id.sh 'server_id' docker exec -i docker-postgres-1 psql -U vcs -d postgres > migration.log
```
#### Existing Server Upgrade

To run the migration process, execute the `database_migration.sh` script with `docker_command` parameter:

Example of running the script with Docker instance of Postgres(replace name of docker container, user, and database with the correct information):

```
./database_migration.sh docker exec -i docker-postgres-1 psql -U vcs -d postgres > migration.log
```
>This step takes some time to finish. If anything fails, failure will be shown in the console, otherwise messages are piped into migration.log

##### In case of database migration failure

If the migration process fails for any reason, execute `cleanup_failed_database_migration.sh` script with `docker_command` parameter:

Example of running the script with Docker instance of Postgres(replace name of docker container, user, and database with the correct information):

```
./cleanup_failed_database_migration.sh docker exec -i docker-postgres-1 psql -U vcs -d postgres
```

Revert the database in `/usr/vcs/env.sh` to SQLite `OTHER_JVM_OPTS="-Ddatabase.type=postgres <other-vm-args>`

#### Start VCS Server 
After completing the required steps in [[Postgres + docker compose setup]] and executing the script(s) above, start the VCS Server

```bash
systemctl start vcs
```


## Scripts Description(FYI)

- **database_migration.sh**: Main script that orchestrates the migration process
- **disable_constraints.sh**: Disables constraints in the PostgreSQL database to prevent conflicts during data import
- **create_db_dump.sh**: Creates a dump of the SQLite database that can be imported into the PostgreSQL database
- **transform_db_dump.sh**: Transforms the SQLite dump to be compatible with Postgres
- **consolidate.sh**: Consolidates the transformed dump into the PostgreSQL database
- **update_server_id.sh**: Updates the server ID in the Postgres database after the migration or at new setup
- **cleanup_failed_database_migration.sh**: Resets Postgres schema and tables to initial state and deletes files that were created during migration process
