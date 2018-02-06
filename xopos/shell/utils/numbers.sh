#!/usr/bin/env bash
#
# Title:       numbers.sh
# Description: Util module that exposes some numbers related functions
# Developer:   ddnomad
# Version:     0.0.1
set -eu -o pipefail

# Gather information about this module
readonly NUMBERS_INFO_NAME="$(basename "${BASH_SOURCE[0]}")"
readonly NUMBERS_INFO_PDIR="$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")"
readonly NUMBERS_INFO_PWD="$(pwd)"

# Internal message templates
readonly NUMBERS_OUTPUT_MSG_ERR_PREF_INT='[-] Internal error: '
readonly NUMBERS_OUTPUT_MSG_ERR_SUFF_TFA='too few arguments: '


###########################################
# Check whether input is a natural number
#
# Arguments:
#   $1 - string to check
#
# Return:
#   0 - is a natural number
#   1 - otherwise
#
# Terminates:
#   No
###########################################
function is_natural_number {
    if [[ "$#" -ne 1 ]]; then
        local msg
        msg="${NUMBERS_OUTPUT_MSG_ERR_PREF_INT}"
        msg="${msg}${NUMBERS_OUTPUT_MSG_ERR_SUFF_TFA}0"
        print_error_and_exit "${msg}" 1
    fi
    if [[ "$1" =~ ^[0-9]+$ ]]; then return 0; else return 1; fi
}
