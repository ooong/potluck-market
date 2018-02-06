import React, { Component } from 'react'
import {connect} from 'react-redux'
import ItemCard from './ItemCard'
import Pantry from './Pantry'
import { fetchContractAssociations, updateContract, removeFromOffer, removeFromMyMarket } from '../store'

const RequestTicket = (props) => {
    console.log('PROPS FROM request ticket', props)
    const request = props.currentUser.contracts.find(contract => +contract.id === +props.match.params.id)

    const { items, contractId, associations, currentUser, offer, updateContractHandler } = props
    let currentContractAssociations, sender, associationsBySender, itemsRequested = []
    console.log('I AM THE OFFER', offer)

    if (associations.length) {
        currentContractAssociations = associations.filter(association => (+association.userId !== +currentUser.id) && (+association.contractId === +contractId))
        console.log('currentContractAssociations', currentContractAssociations)

        currentContractAssociations.map(association => {
            let item = items.find(item => +item.id === +association.itemId)
            itemsRequested.push(item)
        })

        associationsBySender = associations.filter(association => +association.userId !== +currentUser.id)
        console.log('associationsBySender', associationsBySender)
        sender = +associationsBySender[0].userId
    }

    // UPDATE ASSOCIATIONS MODEL TO MAKE ASSOCIATIONS FOR MULTIPLE ITEMS

    let hasItems = itemsRequested.length
    console.log("itemsRequested", itemsRequested)

    return (
        <div className="request-ticket">
            <h5>Lets make a swap!</h5>
            <p>Status: {request.status} </p>
            <div className="requested-items">
                <h3>Request</h3>
                <ul className="request-ticket-card"  >
                    {hasItems &&
                            <li>
                                <ItemCard itemOwnerId={currentUser.id} items={itemsRequested} path={props.match.path} inRequest="true" />
                            </li>

                    }
                </ul>
                <h3>Offer</h3>
                {offer &&
                    <div>
                        <ItemCard itemOwnerId={sender} items={offer} path={props.match.path} inRequest="true" />
                        <button type="button" className="btn btn-primary" onClick={() => updateContractHandler(offer, request, sender, currentUser)}>
                            <i className="fas fa-arrow-circle-right" />
                        </button>
                    </div>
                }

            </div>
            <hr />
            <div className="sender-pantry">
                <Pantry senderId={sender} path={props.match.path} />
            </div>
        </div>
    )
}

const mapState = (state, ownProps) => {
    return {
        items: state.market,
        requests: state.contracts,
        currentUser: state.user,
        associations: state.contractAssociations,
        contractId: ownProps.match.params.id,
        offer: state.offer
    }
}

const mapDispatch = (dispatch, ownProps) => {

    return {
        updateContractHandler: (items, contract, sender, currentUser) => {
        const solicitor = sender
        dispatch(updateContract(items, contract, solicitor, currentUser))
        items.forEach(item => {
            dispatch(removeFromOffer(item.id))
            dispatch(removeFromMyMarket(item.id))
        })
            // sends update to contract via web3, and then gets all contracts
             // will request ticket automatically update?
          // need to send message to the user who initiated the contract
         }

    }
}

export default connect(mapState, mapDispatch)(RequestTicket)
