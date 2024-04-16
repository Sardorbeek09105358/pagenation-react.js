import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [limit, setLimit] = useState(2) // Set initial limit here

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${limit}`)
      .then(res => {
        setUsers(res.data)
        const totalCount = Number(res.headers['x-total-count'])
        const totalPagesCount = Math.ceil(totalCount / limit)
        setTotalPages(totalPagesCount)
      })
      .catch(error => console.error('Error fetching data:', error))
  }, [page, limit])


  return (
    <div className="container  h-100 w-100 pt-5">
      <table className='table table-bordered shadow-sm'>
        <thead>
          <tr>
            <th className='text-capitalize'>t/r</th>
            <th className='text-capitalize'>name</th>
            <th className='text-capitalize'>username</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='d-flex align-items-center gap-2'>
        <button className='btn btn-success' onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1}>prev</button>
        <span>{page}</span>
        <button className='btn btn-danger' onClick={() => setPage(prev => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>next</button>
      </div>
    </div>
  )
}

export default App
