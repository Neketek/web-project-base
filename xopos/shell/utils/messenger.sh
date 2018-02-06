#!/usr/bin/env bash
#
# Title:       messenger.sh
# Description: Util module that handles STDOUT/STDERR output
# Developer:   ddnomad
# Version:     0.0.1
set -eu -o pipefail

# Gather information about this module
readonly MESSENGER_INFO_NAME="$(basename "${BASH_SOURCE[0]}")"
readonly MESSENGER_INFO_PDIR="$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")"
readonly MESSENGER_INFO_PWD="$(pwd)"

# Import numbers module
cd "${MESSENGER_INFO_PDIR}" && \
    source ./numbers.sh && \
    cd "${MESSENGER_INFO_PWD}"

# Output style decorators
readonly MESSENGER_OUTPUT_DECOR_PLAIN=''
readonly MESSENGER_OUTPUT_DECOR_INFO='[i] '
readonly MESSENGER_OUTPUT_DECOR_WARN='[!] '
readonly MESSENGER_OUTPUT_DECOR_ERR='[-] '
readonly MESSENGER_OUTPUT_DECOR_OK='[+] '
readonly MESSENGER_OUTPUT_DECOR_INPUT='[>] '

# Output options (can be toggled)
MESSENGER_OUTPUT_COLOR=true
MESSENGER_OUTPUT_NOSTDERR=false

# Output colors
readonly MESSENGER_OUTPUT_DECOR_COLOR_INFO='\e[36m'  # cyan
readonly MESSENGER_OUTPUT_DECOR_COLOR_WARN='\e[33m'  # yellow
readonly MESSENGER_OUTPUT_DECOR_COLOR_ERR='\e[31m'   # red
readonly MESSENGER_OUTPUT_DECOR_COLOR_OK='\e[32m'    # green
readonly MESSENGER_OUTPUT_DECOR_COLOR_RESET='\e[39m' # reset color

# Internal message templates
readonly MESSENGER_OUTPUT_MSG_ERR_PREF_INT='Internal error: '
readonly MESSENGER_OUTPUT_MSG_ERR_SUFF_TFA='too few arguments: '


#######################################################################
# Print message to STDOUT/STDERR according to a specified styling
#
# Arguments:
#   $1             - message type: PLAIN | INFO | WARN | ERR | OK
#   $2             - message to print
#   $3=false [opt] - terminate execution after printing the message
#                    with a specified exit code (false to avoid force
#                    termination)
#   $4=false [opt] - print all messages to STDOUT only
#   $5=true [opt]  - print in color. The colors are specified in
#                    MESSENGER_DECOR_OUTPUT_COLOR_* for each available
#                    message type.
#
# Return:
#   None
#
# Terminates:
#   Yes
#######################################################################
function print_msg {
    if test "$#" -ge 2; then
        local terminate
        local stdout_only
        local colorful
        terminate=false
        stdout_only=false
        colorful=true
        if test "$#" -ge 3; then terminate="$3"; fi
        if test "$#" -ge 4; then stdout_only="$4"; fi
        if test "$#" -ge 5; then colorful="$5"; fi
        local msg
        local to_stderr
        local color
        to_stderr=false
        case "$1" in
            'PLAIN' )
                msg="${MESSENGER_OUTPUT_DECOR_PLAIN}$2"
                color=''
                ;;
            'OK' )
                msg="${MESSENGER_OUTPUT_DECOR_OK}$2"
                color="${MESSENGER_OUTPUT_DECOR_COLOR_OK}"
                ;;
            'INFO' )
                msg="${MESSENGER_OUTPUT_DECOR_INFO}$2"
                color="${MESSENGER_OUTPUT_DECOR_COLOR_INFO}"
                ;;
            'WARN' )
                msg="${MESSENGER_OUTPUT_DECOR_WARN}$2"
                color="${MESSENGER_OUTPUT_DECOR_COLOR_WARN}"
                to_stderr=true
                ;;
            'ERR' )
                msg="${MESSENGER_OUTPUT_DECOR_ERR}$2"
                color="${MESSENGER_OUTPUT_DECOR_COLOR_ERR}"
                to_stderr=true
                ;;
            * )
                msg="${MESSENGER_OUTPUT_MSG_ERR_PREF_INT}"
                msg="${msg}unknown message type"
                print_msg 'ERR' "${msg}" true
                ;;
        esac
        if "${colorful}"; then
            msg="${color}${msg}${MESSENGER_OUTPUT_DECOR_COLOR_RESET}"
        fi
        if ( "${to_stderr}" && ! "${stdout_only}" ); then echo -e "${msg}" >&2
        else echo -e "${msg}"
        fi
        if is_natural_number "${terminate}"; then exit "${terminate}"
        elif test ! "${terminate}" = false; then
            msg="${MESSENGER_OUTPUT_MSG_ERR_PREF_INT}bad terminate parameter: "
            msg="${msg}${terminate}"
            print_msg 'ERR' "${msg}" 1
        fi
    else
        local msg
        msg="${MESSENGER_OUTPUT_MSG_ERR_PREF_INT}"
        msg="${msg}${MESSENGER_OUTPUT_MSG_ERR_SUFF_TFA}$#"
        print_msg 'ERR' "${msg}" 1
    fi
}


######################################################
# Helper function that validates data from print_<X>
# and calls print_msg with necessary paremeters
#
# Should not be called on its own by a user.
#
# Arguments:
#   $1 - message type
#   $2 - terminate after printing
#   $3 - message to print
#
# Return:
#   None
#
# Terminates:
#   Yes
######################################################
function __print {
    local msg
    if test "$#" -lt 3; then
        msg="${MESSENGER_OUTPUT_MSG_ERR_SUFF_TFA}message to print is missing"
        print_msg 'ERR' "${msg}" 1 "${MESSENGER_OUTPUT_NOSTDERR}" \
            "${MESSENGER_OUTPUT_COLOR}"
    elif test "$#" -gt 3; then
        msg="${MESSENGER_OUTPUT_MSG_ERR_SUFF_TFA}too many arguments"
        print_msg 'ERR' "${msg}" 1 "${MESSENGER_OUTPUT_NOSTDERR}" \
            "${MESSENGER_OUTPUT_COLOR}"
    fi
    print_msg "$1" "$3" "$2" "${MESSENGER_OUTPUT_NOSTDERR}" \
        "${MESSENGER_OUTPUT_COLOR}"
}


######################################################
# Print informational message to STDOUT.
#
# Output is in color if MESSENGER_OUTPUT_COLOR is set to true.
#
# Arguments:
#   $1 - message to print
#
# Return:
#   None
#
# Terminates:
#   Yes
############################################################
function print_info {
    __print 'INFO' false "$@"
}


###################################################################
# Print warning to STDOUT or STDERR
#
# Output is in color if MESSENGER_OUTPUT_COLOR is set to true.
# Output goes to STDERR if MESSENGER_OUTOUT_NOSTDERR is set to false.
#
# Arguments:
#   $1 - message to print
#
# Return:
#   None
#
# Terminates:
#   Yes
###################################################################
function print_warning {
    __print 'WARN' false "$@"
}


###################################################################
# Print error to STDOUT or STDERR but do not exit
#
# Output is in color if MESSENGER_OUTPUT_COLOR is set to true.
# Output goes to STDERR if MESSENGER_OUTOUT_NOSTDERR is set to false.
#
# Arguments:
#   $1 - message to print
#
# Return:
#   None
#
# Terminates:
#   Yes
###################################################################
function print_error {
    __print 'ERR' false "$@"
}


#######################################################################
# Print error to STDOUT or STDERR and exit with a specified exit code
#
# Output is in color if MESSENGER_OUTPUT_COLOR is set to true.
# Output goes to STDERR if MESSENGER_OUTOUT_NOSTDERR is set to false.
#
# Arguments:
#   $1 - exit code
#   $2 - message to print
#
# Return:
#   None
#
# Terminates:
#   Yes
#######################################################################
function print_error_and_exit {
    __print 'ERR' "$@"
}
