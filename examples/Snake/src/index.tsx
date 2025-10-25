import 'reflect-metadata'
import { createRoot } from 'react-dom/client'
import { configure } from 'react-mvvm'
import { makeObservable } from 'mobx'
import { Map } from './components/Map/Map'

configure({
  vmFactory: (VM) => makeObservable(new VM()),
})

createRoot(document.getElementById('root')!).render(<Map />)
