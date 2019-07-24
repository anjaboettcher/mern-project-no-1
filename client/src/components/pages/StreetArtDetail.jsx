import React, { useState, useEffect } from 'react'
import api from '../../api'
import Loader from 'react-dots-loader'
import 'react-dots-loader/index.css'

export default function StreetArtDetail(props) {
  const [streetArt, setstreetArt] = useState(null)
  const [state, setState] = useState(true)
  const streetArtId = props.match.params.streetArtId
  console.log(props)

  function toggle() {
    state ? setState(false) : setState(true)
  }

  useEffect(() => {
    api
      .getStreetArt(streetArtId)
      .then(streetArt => {
        setstreetArt(streetArt)
      })
      .catch(err => console.log(err))
  }, [streetArtId])

  console.log(streetArt)

  return (
    <div>
      <h1>Street Art Detail</h1>
      {!streetArt && <Loader>Loading...</Loader>}
      {streetArt && (
        <>
          {/* <img
            className=""
            src={streetArt.pictureUrl}
            alt="street-art"
            height="500"
            margin="20px"
          /> */}

          <h2 onClick={toggle}>
            {state ? (
              <span>
                {' '}
                <img
                  className=""
                  src={streetArt.pictureUrl}
                  alt="street-art"
                  height="500"
                />
              </span>
            ) : (
              <span>
                {' '}
                <img
                  className=""
                  src={streetArt.pictureUrl}
                  alt="street-art"
                  height="1000"
                />
              </span>
            )}
          </h2>

          <hr />

          <span>Longitude: </span>
          <h5>{streetArt.location.coordinates[0]}</h5>
          <span>Latitude: </span>
          <h5>{streetArt.location.coordinates[1]}</h5>
        </>
      )}
    </div>
  )
}
