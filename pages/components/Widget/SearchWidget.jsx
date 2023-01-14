import { Icon } from '@iconify/react'
import React from 'react'

export default function SearchWidget({ title, onChangeText }) {
    return (

        <form className="cs-sidebar_search" style={{ width: '100%', marginTop: '20px' }}>
            <input onChange={(e) => onChangeText(e.target.value)} type="text" placeholder="Buscar..." />
            <button className="cs-sidebar_search_btn">
                <Icon icon="material-symbols:search-rounded" />
            </button>
        </form>

    )
}
