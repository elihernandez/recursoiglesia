import React from 'react'
import Link from 'next/link'
import Div from '../Div'
import { Artist } from 'api/models/Artist'

export default function ArtistTagWidget({ title }) {
    return (
        <>
            <h4 className="cs-sidebar_widget_title">{title}</h4>
            <Div className="tagcloud">
                {data?.map((artist: Artist, index: number) =>
                    <Link href={`/secuencias/${artist.url}`} className="tag-cloud-link" key={artist.url}>{artist.name}</Link>
                )}
            </Div>
        </>
    )
}

const data = [
    { name: 'Miel San Marcos', url: 'Miel-San-Marcos' },
    { name: 'Elevation Worship', url: 'Elevation-Worship' },
    { name: 'Barak', url: 'Barak' },
    { name: 'Generación 12', url: 'Generación-12' },
    { name: 'Marco Barrientos', url: 'Marco-Barrientos' },
    { name: "Christine D'Clario", url: "Christine-D'Clario" },
    { name: 'MONTESANTO', url: 'MONTESANTO' },
    { name: 'Maverick City Música', url: 'Maverick-City-Música' },
    { name: 'Majo y Dan', url: 'Majo-y-Dan' },
    { name: 'Aliento', url: 'Aliento' },
    { name: 'Gateway Worship Español', url: 'Gateway-Worship-Español' },
    { name: 'Hillsong en Español', url: 'Hillsong-en-Español' },
    { name: 'Un Corazón', url: 'Un-Corazón' },
    { name: 'Bethel Music', url: 'Bethel-Music' },
    { name: 'UPPERROOM', url: 'UPPERROOM' },
    { name: 'Israel and New Breed', url: 'Israel-and-New-Breed' },
    { name: 'Hillsong', url: 'Hillsong' },
    { name: 'Church of the City', url: 'Church-of-the-City' },
    { name: 'Job Gonzalez', url: 'Job-Gonzalez' },
    { name: 'Art Aguilera', url: 'Art-Aguilera' },
    { name: 'Juan Carlos Alvarado', url: 'Juan-Carlos-Alvarado' },
    { name: 'Conquistando Fronteras', url: 'Conquistando-Fronteras' },
    { name: 'Toma Tu Lugar', url: 'Toma-Tu-Lugar' },
    { name: 'Living', url: 'Living' },
    { name: 'Erick Porta', url: 'Erick-Porta' },
    { name: 'Ericson Alexander Molano', url: 'Ericson-Alexander-Molano' },
    { name: 'Passion', url: 'Passion' },
    { name: 'Free Worship', url: 'Free-Worship' },
    { name: 'Planetshakers', url: 'Planetshakers' },
    { name: 'Música Más Vida', url: 'Música-Más-Vida' },
    { name: 'Lakewood Music', url: 'Lakewood-Music' },
    { name: 'Averly Morillo', url: 'Averly-Morillo' },
    { name: 'Bani Muñoz', url: 'Bani-Muñoz' },
    { name: 'Ingrid Rosario', url: 'Ingrid-Rosario' },
    { name: 'Su Presencia', url: 'Su-Presencia' },
    { name: 'Danilo Montero', url: 'Danilo-Montero' },
    { name: 'Coalo Zamorano', url: 'Coalo-Zamorano' },
    { name: 'CTUE Adoración', url: 'CTUE-Adoración' },
    { name: 'Julio Melgar', url: 'Julio-Melgar' },
    { name: 'Phil Wickham', url: 'Phil-Wickham' },
    { name: 'Vida Real Worship', url: 'Vida-Real-Worship' },
]