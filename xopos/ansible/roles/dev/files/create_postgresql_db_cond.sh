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

if ! sudo -u postgres bash -c "${DB_EXISTENCE_CHECK_CMD}"; then
    sudo -u postgres bash -c "${DB_CREATION_CMD}"
    exit 100
else
    exit 200
fi
