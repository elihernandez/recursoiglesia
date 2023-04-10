import { Icon } from '@iconify/react'

type SearchWidgetProps = {
    placeholder: string
    onChangeText: (value: string) => void
}

export default function SearchWidget({ onChangeText, placeholder }: SearchWidgetProps) {
    return (
        <form className="cs-sidebar_search" style={{ width: '100%', marginTop: '20px' }}>
            <input onChange={(e) => onChangeText(e.target.value)} type="text" placeholder={placeholder} />
            <button className="cs-sidebar_search_btn">
                <Icon icon="material-symbols:search-rounded" />
            </button>
        </form>
    )
}
