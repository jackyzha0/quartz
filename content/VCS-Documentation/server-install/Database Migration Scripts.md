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

## Setup

Make the scripts are executable, if not:
```
chmod +x database_migration.sh
chmod +x disable_constraints.sh
chmod +x create_db_dump.sh
chmod +x transform_db_dump.sh
chmod +x consolidate.sh
chmod +x update_server_id.sh
```

#### Existing Server Upgrade Only
For single server grab the `vcs.db` file, and rename it `serverID.db`(use the actual server id of the server, in case of `vcs.db-wall` and `vcs.db-shm` rename those with the server id as well).
For multi server gather all the `vcs.db` files and rename as mentioned in the single server step.

Move the database file(s) to the scripts directory(`/usr/vcs/docker/migration-scripts`)

## Running the Migration

**Required info:**
- server_id - server id for the server
- psql_path - path to Postgres psql 
>Example: `docker exec -i artsentry-services-postgres-1 psql`
>`artsentry-services-postgres-1` - name of the Docker container which can be found by
>running `docker ps` ([[running services.png]])
- postgres_user
>APP_USER="vcs" from docker compose environment(.env) of [[Postgres + docker compose setup]]
- database_name
>DB_NAME="postgres" from docker compose environment(.env) of [[Postgres + docker compose setup]]
- docker_command - psql_path -U postgres_user -d database_name
Example: `docker exec -i artsentry-services-postgres-1 psql -U vcs -d postgres

#### New Server Install

Run the `update_server_id.sh` script with the `server_id` and the `docker_command` parameter:

Example of running the script with Docker instance of Postgres:

```bash
./update_server_id.sh 'server_id' 'docker exec -i artsentry-services-postgres-1 psql' > migration.log
```
#### Existing Server Upgrade

To run the migration process, execute the `database_migration.sh` script with `docker_command` parameter:

Example of running the script with Docker instance of Postgre:

```bash
./database_migration.sh 'docker exec -i artsentry-services-postgres-1 psql'
```

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
