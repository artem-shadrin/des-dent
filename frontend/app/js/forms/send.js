export default class FormSend {
    constructor(props) {


    }

    static async send(form) {
        const {action = window.location.href, method = "GET"} = form;
        const body = new FormData(form);
        await fetch(action, {
            method,
            body: method === "POST" ? body : null
        })
            .then(response => Promise.resolve(response.json()))
            .catch(err => Promise.reject(err))
    }

    static onSuccess(json) {
        console.log(json)
    }

    static onError(err) {
        console.log(err)
    }


}