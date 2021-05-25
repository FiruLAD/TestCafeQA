import dotenv from 'dotenv'
dotenv.config()

export const CREDENTIALS = {
    VALID_USERS: {
        USERNAMES:
        process.env.STANDARD_USERNAME,

        PASSWORD:
        process.env.PASSWORD
    },
    INVALID_USERS: {
        USERNAMES:
            'invalid_user',

        PASSWORDS:
            'secret_sauce'
    }
}

export const LOGIN_ERROR_MESSAGES = {
    ERROR_MESSAGES:
        'Epic sadface: Username and password do not match any user in this service'
}

export const ORDERINFO = {
    VALID_ORDERINFO: {
        FIRSTNAME: 'Ricardo',
        LASTNAME: 'CG',
        POSTALCODE: '45070'
    },
    INVALID_ORDERINFO: {
        POSTALCODES:
            ''
    }
}

export const ORDERINFO_ERROR_MESSAGES = {
    ERROR_MESSAGES:
        'Error: Postal Code is required'
}