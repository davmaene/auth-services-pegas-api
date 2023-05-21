// https://hooks.slack.com/services/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
import consoleToSlack from 'console-to-slack';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config()

const baseURL = `https://hooks.slack.com/services/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`;
var options = {
	name: 'My Example Service',
	channels: {
		log: {
			name: '#console_log',
			url: baseURL
		},
		warn: {
			name: '#console_warn',
			url: baseURL
		},
		error: {
			name: '#console_error',
			url: baseURL
		}
	}
}

export const conoleToSlackService =  async ({ callBack }) => {
    const url = 'https://hooks.slack.com/services/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';
    const data = JSON.stringify({ text: "Hello Wordl !" })
    await axios({
        url,
        method: "POST",
        data,
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        }
    })
    .then(_slack => {
        return callBack({ error: undefined, done: _slack })
    })
    .catch(_error => {
        return callBack({ error: _error, done: undefined })
    })
}