import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
//import MarkerClusterer from '@google/markerclusterer'
//TODO: add marker clustering



const GoogleMap = ({ shelters }) => {
    useEffect(() =>{
        const googleMapScript = document.createElement('script')
        googleMapScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBG1MognAtYUqGeR91CumRmrnPZUoChvgY&language=pl'
        window.document.body.appendChild(googleMapScript)
        googleMapScript.addEventListener('load', () => {
            const googleMap = createGoogleMap()
            const markers = shelters.map(shelter => createMarker(shelter, googleMap))
        })
    }, [])
    
    const googleMapRef = useRef()
    const createGoogleMap = () => 
        new window.google.maps.Map(googleMapRef.current, {
            center: { 
                lat: 52.1830643, 
                lng: 18.8839713
            },
            zoom: 7,
            disableDefaultUI: true
        })   

    const createMarker = (shelter, map) => {
        const marker = new window.google.maps.Marker({
            map,
            position: {
                lat: shelter.coordinates.latitude,
                lng: shelter.coordinates.longitude
            }
        }) 
        const contentString = `<a href='/schroniska/${shelter.id}'>${shelter.name}</a>`
        const info = new window.google.maps.InfoWindow({
            content: contentString
        })
        marker.addListener('click', () => {
            info.open(map, marker)
        })
    }

    
    return (
        <div 
            id="google-map"
            ref={googleMapRef}
            style={{ height: '85vh'}}
        > 
            
        </div>
    )
}

export default GoogleMap