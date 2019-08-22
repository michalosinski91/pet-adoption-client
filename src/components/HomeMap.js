import React, {useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
//import MarkerClusterer from '@google/markerclusterer'


const HomeMap = ({ shelters, className }) => {
    const props = { ref: useRef(), className }
    const onLoad = () => {
        const map = new window.google.maps.Map(props.ref.current, {
            center: { lat: 52.1830643, lng: 18.8839713},
            zoom: 7
        })
        
        //TODO: add marker clustering
        /*const coordinates = shelters.map(shelter => ({
            lat: shelter.coordinates.latitude,
            lng: shelter.coordinates.longitude
        }))

        const contentString = `<Link to='/schroniska/${item.id}>${item.name}</Link>`
            const infowindow = new google.maps.InfoWindow({
                content: contentString
            })
         marker.addEventListener('click', () => {
                infowindow.open(map, marker)
            })
        */
        const addMarker = shelters.map(item => {
            
            const marker = new window.google.maps.Marker({
                map,
                position: {
                    lat: item.coordinates.latitude,
                    lng: item.coordinates.longitude
                },
                title: item.city
            })
           
        })

    }
    
    useEffect(() => {
        if (!window.google) {
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBG1MognAtYUqGeR91CumRmrnPZUoChvgY&language=pl'
            const headScript = document.getElementsByTagName('script')[0]
            headScript.parentNode.insertBefore(script, headScript)
            script.addEventListener('load', onLoad)
            return () => script.removeEventListener('load', onLoad)
            
        } else onLoad()
    }, [])
    


    return (
        <div {...props} style={{height: '100vh'}}></div>
    )
}

export default HomeMap