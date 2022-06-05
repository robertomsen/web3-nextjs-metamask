import { useEffect, useCallback } from 'react'

import styles from '../styles/Home.module.css'
import { useWeb3React } from '@web3-react/core'
import { connector } from '../config/web3'

export default function Home() {
  const { active, activate, deactivate, account, error, chainId } = useWeb3React()

  const connect = useCallback(() => {
    activate(connector)
    localStorage.setItem('previuslyConnected', true)
  }, [activate])

  const disconnect = () => {
    deactivate()
    localStorage.removeItem('previuslyConnected')
  }

  useEffect(() => {
    if (localStorage.getItem('previuslyConnected') === 'true') {
      connect()
    }
  }, [connect])

  return (
    <div className={styles.container}>
      <h1>Wallet Login Metamask</h1>
      { active 
      ? 
        <>
          <button onClick={disconnect}>Desconectar Wallet</button>
          <p>Estas connectado a la red numero: {chainId}</p>
          <p>Tu cuenta es: {account}</p>
        </>
      : <button onClick={connect}>Conectar Wallet</button>
      }
    </div>
  )
}
