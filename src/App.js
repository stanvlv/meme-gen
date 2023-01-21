import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'

function App() {

  const [memes, setMemes] = useState([])
  const [memeIndex, setMemeIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [topText, setTopText] = useState('')
  const [bottomText, setBottomText] = useState('')
  const [finishedMeme, setFinishedMeme] = useState('')

  useEffect(() => {
    axios
    .get('https://api.imgflip.com/get_memes')
    .then((response) => {
      setMemes(response.data.data.memes)
      setIsLoading(true)
    })
    .catch(error => console.log(error))
  }, [])

  //console.log(memes[0].id)
  const previousImage = () => {
    if(memeIndex === 0) return memeIndex
   if(memeIndex > 0) {setMemeIndex(memeIndex - 1)}
  }
  const nextImage = () => {
    if(memeIndex === memes.length - 1) return memeIndex
    if(memeIndex < memes.length - 1) {setMemeIndex(memeIndex + 1)}
  }
  const addText = () => {
    axios
    .post(`https://api.imgflip.com/caption_image?username=myimagetest&password=nzkostava3&template_id=${memes[memeIndex].id}}&text0=${encodeURIComponent(topText)}&text1=${encodeURIComponent(bottomText)}`)
    .then(response => setFinishedMeme(response.data.data.url))
    .catch(error => console.log(error))
  }
  //console.log(finishedMeme)
 
console.log(memes)

  return ( <>
  <nav className='navigation-bar'><h1>React training - meme generator</h1></nav>
    <div className='main-div'>
      <div>{isLoading ? (<div className='image'>{memes.filter((meme, index) => {
        return index === memeIndex
      }).map((meme) =>  {
        return (
          <>
        <img src={meme.url} alt={meme.name} />
        </>)})}
        </div>) 
        : <h2>Fetching data</h2>}</div>
      <br></br>
      <button className='button' onClick={previousImage}>Previous Image</button>
      <button className='button' onClick={nextImage}>Next Image</button>
      <br></br>
      <form className='form' onSubmit={e => e.preventDefault()}>
      <input placeholder='top text' onChange={e => setTopText(e.target.value)} />
      <input placeholder='bottom text'onChange={e => setBottomText(e.target.value)} />
      <button className='button' onClick={addText}>Add Text</button>
      </form>
    </div>
    <h3>That's your creation:</h3>
    <div><img src={finishedMeme} alt='Your finished meme:' /></div>
    </> )
}

export default App;
