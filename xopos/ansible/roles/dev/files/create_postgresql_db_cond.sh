#!/usr/bin/env bash
#
# Create PostgreSQL DB if not exists
# NOTE: na kolenke edition (beware)

readonly DB_NAME=server_primary
readonly BLOODY_CMD="$(cat <<EOF
psql -tc "SELECT 1 FROM pg_database WHERE datname='${DB_NAME}';" \
    | grep -q 1 \
    || psql -c "CREATE DATABASE ${DB_NAME}"
EOF
)"

sudo -u postgres bash -c "${BLOODY_CMD}"
