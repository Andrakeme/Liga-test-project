import axios from "axios";

const instance = axios.create({
    baseURL: 'https://api.stackexchange.com/2.3/'
})

export const searchAPI = {

    getData(text) {
        return instance.get(`search?page=1&pagesize=10&order=desc&sort=activity&site=stackoverflow&intitle=${text}`)
            .then(Response => Response)
    },

    getQuestionsByUserId(id) {
        return instance.get(`users/${id}/questions?pagesize=5&order=desc&sort=votes&site=stackoverflow`)
            .then(Response => Response.data.items)
    },

    getQuestionsByTag(tag) {
        return instance.get(`tags/${tag}/faq?pagesize=5&site=stackoverflow`)
            .then(Response => Response.data.items)
    },

    getAnswersByQuestionId(id) {
        return instance.get(`questions/${id}/answers?page=1&pagesize=10&order=desc&sort=activity&site=stackoverflow`)
            .then(Response => Response.data)
    },

    getMoreSearchResults(page, text) {
        return instance.get(`search?page=${page}&pagesize=10&order=desc&sort=activity&site=stackoverflow&intitle=${text}`)
            .then(Response => Response)
    },

    getMoreAnswers(page, id) {
        return instance.get(`questions/${id}/answers?page=${page}&pagesize=10&order=desc&sort=activity&site=stackoverflow`)
            .then(Response => Response.data)
    }

}