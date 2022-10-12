import { useState, useEffect } from 'react'
import styles from '../../styles/contact-form.module.css'
import Notification from '../ui/notification'

async function sendContactData(contactDetails) {

    const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(contactDetails),
        //JSON.stringify({email: enteredEmail,name: enteredName,message: enteredMessage})
        headers: {
            'Content-Type' : 'application/json'
        }
    })

    const data = await response.json()

    if(!response.ok) {
        throw new Error(data.message || 'Something went wrong')
    }
}


function ContactForm() {

    const [enteredEmail, setEnteredEmail] = useState('')
    const [enteredName, setEnteredName] = useState('')
    const [enteredMessage, setEnteredMessage] = useState('')
    const [requestStatus, setRequestStatus] = useState() //pending, success, error
    const [requestError, setRequestError] = useState() //store error of try catch block for later display it

    //Use useEffect to reset notification status after x seconds
    //without this notifications bar doesn't disappear
    useEffect(() => {
        if (requestStatus == 'success' || requestStatus == 'error') {
            const timer = setTimeout(() => {
                setRequestStatus(null)
                setRequestError(null)
            }, 3000)

            return () => clearTimeout(timer)
        }
    }, [requestStatus])


    async function sendMessageHandler(event) {
        event.preventDefault()

        //Set Request Status to pending (State for showing notification UI)
        setRequestStatus('pending')

        try {
            await sendContactData({
                email:enteredEmail,
                name: enteredName,
                message: enteredMessage
            })
        } catch (error) {
            //Store error message for showing it later
            setRequestError(error.message)

            //If error occours set state to error
            setRequestStatus('error')
        }

        //After set Request Status to success
        setRequestStatus('success')

        //After success, we cant clean the form
        setEnteredEmail('')
        setEnteredMessage('')
        setEnteredName('')
    }

    //Create object for notification class
    //notification.js expects receive title, message and status as props
    let notification

    if (requestStatus == 'pending') {
        notification = {
            status: 'pending',
            title: 'Sending message...',
            message: 'Your message is on its way!'
        }
    }
    if (requestStatus == 'success') {
        notification = {
            status: 'success',
            title: 'Success!',
            message: 'Message sent successfully!!'
        }
    }
    if (requestStatus == 'error') {
        notification = {
            status: 'error',
            title: 'Error!',
            message: requestError
        }
    }

    return (
        <section className={styles.contact}>
            <h1>How can i help?</h1>
            <form className={styles.form} onSubmit={sendMessageHandler}>
                <div className={styles.controls}>
                    <div className={styles.control}>
                        <label htmlFor="email">Your Email</label>
                        <input type="email" id="email" required value={enteredEmail} onChange={event => setEnteredEmail(event.target.value)}></input>
                    </div>
                    <div className={styles.control}>
                        <label htmlFor="name">Your Name</label>
                        <input type="text" id="name" required value={enteredName} onChange={event => setEnteredName(event.target.value)}></input>
                    </div>
                </div>
                <div className={styles.control}>
                    <label htmlFor="message">Your Message</label>
                    <textarea id="message" rows="2" required value={enteredMessage} onChange={event => setEnteredMessage(event.target.value)}></textarea>
                </div>
                <div className={styles.actions}>
                    <button>Send Message</button>
                </div>
            </form>
            {notification && <Notification 
            status={notification.status}
            title={notification.title}
            message={notification.message} />
            }
        </section>

    )
}

export default ContactForm;