import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'

import App from './App'


//Customises the error messages in the console
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) 
        graphQLErrors.map(({ message, locations, path }) =>
             console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                ),
        );
    
    if (networkError) console.log(`[Network error]: ${networkError}`)
    
})

//passes a token in the authorization header
//passing null seems to create an issue, so passing an empty string instead - reasearch needed
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('znajdz-schronisko')
    return {
        headers: {
            ...headers,
            authorization: token ? token : ''
        }
    }

})

const httpLink = createHttpLink({ uri: 'http://localhost:4000' })


//merges the various links into one
const mergedLinks = ApolloLink.from([
    authLink,
    errorLink,
    httpLink
])

//passes in the merged links, and initializes cache
const client = new ApolloClient({
    link: mergedLinks,
    cache: new InMemoryCache()
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
    , document.getElementById('root'))