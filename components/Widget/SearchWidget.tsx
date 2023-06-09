import { Icon } from '@iconify/react'
import { ChangeEvent, useState } from 'react'

type SearchWidgetProps = {
    placeholder: string
    onChangeText: (text: string) => void
    value: string
}

export default function SearchWidget({ onChangeText, placeholder, value }: SearchWidgetProps) {
    const [text, setText] = useState(value)

    return (
        <form className="cs-sidebar_search" onSubmit={(e) => e.preventDefault()} style={{ width: '100%', marginTop: '20px' }}>
            <input
                onChange={(e) => {
                    e.preventDefault()
                    setText(e.target.value)
                    onChangeText(e.target.value)
                }}
                type="text"
                placeholder={placeholder}
                value={text}
            />
            <button className="cs-sidebar_search_btn">
                <Icon icon="material-symbols:search-rounded" />
            </button>
        </form>
    )
}
