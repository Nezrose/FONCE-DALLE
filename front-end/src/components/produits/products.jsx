import { React, useState, useEffect } from 'react';
import ActionAreaCard from './ActionAreaCard'

const ActionAreaCard2 = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    fetch('http://localhost:1337/api/products',
      {
        method: "GET",
        headers: {
          'Accept': 'Application/json'
        }
      })
      .then(res => res.json())
      .then(reponse => {
          setPosts(reponse)
          setIsLoading(false)
     
    })
  },[])

 

  return (
    <div className='posts'>
      
      {isLoading ? 'loading..' : posts.data.map(post => <ActionAreaCard post={post} key={post.id}/> )}
    </div>
  );
}
export default ActionAreaCard2;