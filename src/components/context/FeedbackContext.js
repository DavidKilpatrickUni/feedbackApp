import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid'


const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {

    const [feedback, setFeedback] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    useEffect(() => {
        fetchFeedback()
    }, [])

    // stuff after question mark sorts the fetch

    const fetchFeedback = async () => {
        const response = await fetch('http://localhost:5000/feedback?_sort=id_order=desc')

        const data = await response.json()

        setFeedback(data)
        setIsLoading(false)
    }

    const deleteFeedback = async (id) => {
        if (window.confirm('are you sure')) {

            await fetch(`http://localhost:5000/feedback/${id}`, {
                method: 'DELETE'
            })

            setFeedback(feedback.filter((item) => item.id !== id))
        }
    }

    const addFeedback = async (newFeedback) => {

        const response = await fetch('http://localhost:5000/feedback',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newFeedback)
            }
        )

        const data = await response.json()

        //newFeedback.id = uuidv4() //not required when using json server
        setFeedback([data, ...feedback])

    }

    const editFeedback = (item) => {
        setFeedbackEdit({
            item: item,
            edit: true
        })
    }

    const updateFeedback = async (id, updatedItem) => {

        const response = await fetch(`http://localhost:5000/feedback/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedItem)
        })

        const data = await response.json()

        setFeedback(feedback.map((item) => item.id === id ? { ...item, ...data } : item))
    }

    return (
        <FeedbackContext.Provider value={{ feedback, deleteFeedback, addFeedback, editFeedback, updateFeedback, feedbackEdit, isLoading }}>
            {children}
        </FeedbackContext.Provider>
    )
}

export default FeedbackContext