import React, { useContext, useState, useEffect, Fragment } from 'react'
import appContext from '../context/appContext'
import { ethers } from 'ethers';
import Loader from '../components/Loader'

function History() {
    const [transactionHistory, setTransactionHistory] = useState([]);
    const { State, setNavState } = useContext(appContext);
    const {
        ReadContract,
        WalletAddress
    } = State;

    const getTransactionHistory = async () => {
        try {
            const data = await ReadContract.getHistory({ from: WalletAddress });
            setTransactionHistory(data);
        } catch (e) {
            console.log(e.message);
        }
    }

    useEffect(() => {
        setNavState({
            dashboard: false,
            transaction: false,
            history: true,
        })
    }, []);

    useEffect(() => {
        getTransactionHistory();
    }, [transactionHistory, setTransactionHistory]);

    return (
        <Fragment>
            <section className='page history_page'>
                {
                    (transactionHistory.length > 0) ? (
                        <table>
                            <thead>
                                <th>Sender</th>
                                <th>Reciever</th>
                                <th>Amount (ETH)</th>
                            </thead>
                            <tbody>
                                {
                                    transactionHistory.map((aTransaction, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{`${aTransaction[0].slice(0, 7)}...${aTransaction[0].slice(-5)}`}</td>
                                                <td>{aTransaction[1]}</td>
                                                <td>{ethers.utils.formatEther(aTransaction[2])}</td>  {/* To convert BigNumber into Ether */}
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                    ) : (
                        <Loader />
                    )
                }
            </section>
        </Fragment>
    )
}

export default History