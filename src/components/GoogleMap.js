import React, { useRef, useEffect } from 'react'
//import MarkerClusterer from '@google/markerclusterer'
//TODO: add marker clustering



const GoogleMap = ({ options, onMount, className }) => {

    const props = { ref: useRef(), className }
    const createGoogleMap = () => {
        const map = new window.google.maps.Map(props.ref.current, options)   
        onMount && onMount(map)
    }
        
    useEffect(() =>{
        if(!window.google) {
            const googleMapScript = document.createElement('script')
            googleMapScript.type = 'text/javascript'
            googleMapScript.id = 'MapScript'
            googleMapScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBG1MognAtYUqGeR91CumRmrnPZUoChvgY&language=pl'
            window.document.body.appendChild(googleMapScript)
            googleMapScript.addEventListener('load', createGoogleMap)
            return () => googleMapScript.removeEventListener('load', createGoogleMap)
        } else createGoogleMap()
    }, [])
    
    
    return (
        <div 
            {...props}
            style={{ height: '95vh'}}
        > 
        </div>
    )
}


export default GoogleMap