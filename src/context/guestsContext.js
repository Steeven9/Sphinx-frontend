import React from 'react'

/**
 * This is the context shared from guests to all its children.
 * This context is used to avoid passing props down the chain.
 * @type {React.Context<unknown>}
 */
const GuestsContext = React.createContext();

export {GuestsContext as default};
