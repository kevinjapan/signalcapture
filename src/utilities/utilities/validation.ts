

// simple validation for demo
// future : enhance
export const is_valid_payload = (payload: object) => {
    if(!payload) return false
    const payload_required_keys = 'data,outcome,server_response'
    let obj_keys = Object.keys(payload)
    return obj_keys.sort().join(',') === payload_required_keys
}

