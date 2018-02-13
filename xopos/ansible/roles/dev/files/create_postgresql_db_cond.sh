#!/usr/bin/env bash
#
# Create PostgreSQL DB if not exists
# NOTE: na kolenke edition (beware)

readonly DB_NAME=server_primary
readonly DB_EXISTENCE_CHECK_CMD="$(cat <<EOF
psql -tc "SELECT 1 FROM pg_database WHERE datname='${DB_NAME}';" | grep -q 1
EOF
)"
readonly DB_CREATION_CMD="$(cat <<EOF
psql -c "CREATE DATABASE ${DB_NAME}"
EOF
)"
# readonly DB_USER_PASSWORD_SET_CMD="$(cat <<EOF
# psql -c "ALTER USER postgres WITH PASSWORD 'postgres';
# EOF
# )"



if ! sudo -u postgres bash -c "${DB_EXISTENCE_CHECK_CMD}"; then
    sudo -u postgres bash -c "${DB_CREATION_CMD}"
    #NOTE: Neketek added this na kolenke solution for default password
    #NOTE: I checked the query it's working
    #NOTE: but it does not set the password for postgres user
    # sudo -u postgres bash -c "${DB_USER_PASSWORD_SET_CMD}"
    exit 100
else
    exit 200
fi
