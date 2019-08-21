import React,  {useEffect, useRef } from 'react'
require('dotenv').config()


const HomeMap = ({ shelters, options, onMount, className }) => {
    const props = { ref: useRef(), className }
    const onLoad = () => {
        const map = new window.google.maps.Map(props.ref.current, {
            center: { lat: 52.1830643, lng: 18.8839713},
            zoom: 7
        })
        onMount && onMount(map)
    }
    
    useEffect(() => {
        if (!window.google) {
            const script = document.createElement(`script`)
            script.type = 'text/javascript'
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBG1MognAtYUqGeR91CumRmrnPZUoChvgY`
            const headScript = document.getElementsByTagName(`script`)[0]
            headScript.parentNode.insertBefore(script, headScript)
            script.addEventListener('load', onLoad)
            return () => script.removeEventListener('load', onLoad)
        } else onLoad()
    })

    return (
        <div {...props} style={{height: '100vh'}}></div>
    )
}

export default HomeMap