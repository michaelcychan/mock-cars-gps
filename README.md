# mock-cars-gps

A study exercise exploring PostGIS capabilities with PostgreSQL for GPS car tracking simulation.

## About

This project demonstrates the use of PostGIS, a spatial database extension for PostgreSQL, to handle geographic data and spatial queries for simulated car GPS tracking. It serves as a learning exercise to explore:

- Spatial data types and operations
- Geographic queries with PostGIS
- Real-world application of spatial databases
- Integration of spatial databases with Bun/TypeScript

## Setup

### Install local postgresql and postgis

As a personal exercise, this part only contains instruction to install PostgreSQL and PostGIS on Ubuntu 24.

#### 1. Update package list and install PostgreSQL

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

#### 2. Install PostGIS extension

```bash
sudo apt install postgis postgresql-16-postgis-3
```

#### 3. Start and enable PostgreSQL service

```bash
sudo service postgresql start
sudo service postgresql status
```

#### 4. Set up PostgreSQL user and database

```bash
# Switch to postgres user
sudo -u postgres psql

# Inside PostgreSQL prompt:
CREATE DATABASE gps_db;

CREATE USER gps_user WITH PASSWORD 'password'; # Change to your own password

ALTER ROLE gps_user SET client_encoding TO 'utf8';
ALTER ROLE gps_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE gps_user SET timezone TO 'UTC';

GRANT ALL PRIVILEGES ON DATABASE gps_db TO gps_user;
\q
```

Connect over TCP instead of local socket because shell user is not gps_user
```bash
psql -h localhost -U gps_user -d gps_db
```

#### 5. Enable PostGIS extension in your database

```bash
# Connect to your database
sudo -u postgres psql -d gps_db
```

#### Enable PostGIS extension
```sql
CREATE EXTENSION postgis;
CREATE EXTENSION postgis_topology; # Optional

# Verify installation
SELECT PostGIS_version();
\q
```

#### 6. Configure connection (optional)

Create a `.env` file in the project root:

```env
DATABASE_URL=postgresql://your_username:your_password@localhost:5432/mock_cars_gps
```


### Installing and running application 

To install dependencies:

```bash
bun install
```

To run:

```bash
bun --hot run server.ts
```

This project was created using `bun init` in bun v1.3.10. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
