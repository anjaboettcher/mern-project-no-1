import React, { useEffect, useState } from 'react'
import api from '../../api'
import { Link } from 'react-router-dom'
import Loader from 'react-dots-loader'
import 'react-dots-loader/index.css'
// import { Button } from 'reactstrap'

export default function List() {
  const [streetArt, setstreetArt] = useState([])
  useEffect(() => {
    api
      .getStreetArts()
      .then(streetArt => {
        setstreetArt(streetArt)
      })
      .catch(err => console.log(err))
  }, [])

  console.log(streetArt)

  return (
    <div>
      <h1>List of Street Arts</h1>
      <div className="container">
        <table className="table table-center hoverTable">
          <thead>
            <tr>
              <th scope="col">Picture</th>
              <th scope="col">Google Maps Direction</th>
              <th scope="col">Detail</th>
            </tr>
          </thead>
          <tbody>
            {!streetArt && <Loader className="text-center">Loading...</Loader>}
            {streetArt &&
              streetArt.map(s => (
                <tr key={s._id}>
                  <td>
                    <img
                      className=""
                      src={s.pictureUrl}
                      alt="street-art"
                      height="100"
                    />
                  </td>
                  <td>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={
                        'http://www.google.com/maps/dir//' +
                        s.location.coordinates[1] +
                        s.location.coordinates[0]
                      }
                    >
                      {'lat: ' +
                        s.location.coordinates[1] +
                        ' lng: ' +
                        s.location.coordinates[0]}
                    </a>
                  </td>
                  <td>
                    <Link
                      className="btn btn-outline-danger"
                      to={'/streetart-detail/' + s._id}
                    >
                      Detail
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
