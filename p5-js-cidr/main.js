

/**
 * SELECTORS
 */

let ip_input = document.getElementById('input-field')
let ip_list_output = document.getElementById('ip-list')
let submit_btn = document.getElementById('submit-btn')
submit_btn.addEventListener('click', main)

/**
 * DEFAULTS
 */
const MAX_OCTET = 255
let ip = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0]
]
let cidr = 32
let count = Math.pow(2, 32 - cidr)
let ip_list = []

function increment_octet_count(i) {

    // reset octets on the right
    for (let j = i + 1; j <= 3; j++) {
        ip[j][0] = 0
        ip[j][1] = 0
    }

    // increment octet
    if (ip[i][0] === MAX_OCTET) {
        ip[i][0] = 0
    } else {
        ip[i][0] += 1
    }
    store_ip()

    // increment octet_count
    ip[i][1] += 1
}

function process_ips() {
    while (count > 0) {
        if (ip[3][1] < MAX_OCTET) {
            increment_octet_count(3)
        } else if (ip[2][1] < MAX_OCTET) {
            increment_octet_count(2)
        } else if (ip[1][1] < MAX_OCTET) {
            increment_octet_count(1)
        } else if (ip[0][1] < MAX_OCTET) {
            increment_octet_count(0)
        }
        count--
    }
}

function store_ip() {
    let ip_string = ip[0][0] + '.' + ip[1][0] + '.' + ip[2][0] + '.' + ip[3][0]
    ip_list.push(ip_string)

    // ip_list_output.innerHTML += ip_string + '<br>'
    // console.log(ip[0][0] + '.' + ip[1][0] + '.' + ip[2][0] + '.' + ip[3][0])
}

function valid_octet(num) {
    if (num < 256) {
        return true
    }
    return false
}

function get_ip_and_cidr_from_input(ip_string) {
    let decimal_octets = [] // empty array
    let cidr = 32 // default to 32
    let start_index = 0

    for (let i = 0; i < ip_string.length; i++) {

        if (ip_string[i] === '.') {
            let num = Number(ip_string.slice(start_index, i))

            if (valid_octet(num)) {
                decimal_octets.push(num)
            } else {
                console.error('Invalid IP')
                break
            }
            start_index = i + 1

        } else if (ip_string[i] === '/') {
            let num = Number(ip_string.slice(start_index, i))

            if (valid_octet(num)) {
                decimal_octets.push(num)
            } else {
                console.error('Invalid IP')
                break
            }
            start_index = i + 1

        } else if (i === ip_string.length - 1) {

            cidr = Number(ip_string.slice(start_index, ip_string.length))

            if (cidr < 16 || cidr > 32) {
                console.error('CIDR value needs to be between 16 and 32')
                break
            }

        }
    }

    return [decimal_octets, cidr]
}

function reset_output() {
    ip_list = []
    ip_list_output.innerHTML = ''
}

function main() {

    // Clear outputs
    reset_output()

    // Get Input
    let [ip_array, cidr] = get_ip_and_cidr_from_input('192.168.0.1/23')

    if (!ip_array || !cidr) {
        return
    }

    ip_array.forEach((octet, index) => {
        ip[index][0] = octet
    })
    count =  Math.pow(2, 32 - cidr)

    // Process Stuff
    store_ip()
    count--
    process_ips()

    console.log(ip_list)

    // Generate Output
    ip_list.forEach(ip => {
        ip_list_output.innerHTML += ip + '<br>'
    })
}
