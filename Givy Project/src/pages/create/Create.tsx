import './create.css'
import NavBar from '../../components/navBar/navBar'
import Header from '../../components/header/header'
import BigButton from '../../components/bigButton/bigButton'
import UploadVideo from '../../components/create/uploadVideo/uploadVideo'
import InputGivy from '../../components/inputGivy/inputGivy'
import users from "../../data/users.json"
import videos from "../../data/videos.json"
import tagsData from '../../data/tags.json'
import { useState } from 'react'

const userLogged = "u1"

function Create() {

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [description, setDescription] = useState('')
  const [tagToTeach, setTagToTeach] = useState('')
  const [tagToLearn, setTagToLearn] = useState('')

  function handleVideoSelect(file: File) {
    setSelectedFile(file)
    const url = URL.createObjectURL(file)
    setVideoUrl(url)
  }

        const stored = localStorage.getItem('videos')
        const allVideos = stored ? JSON.parse(stored) : videos

  function pusblishVideo(){

    const newVideo ={

            id: `v${allVideos.length + 1}`,
            userId: userLogged,
            matchId: null,
            url: videoUrl,
            thumbnail: videoUrl,
            title: description,
            description: description,
            tags: [tagToTeach],
            likes: 0,
            uploadDate: new Date().toISOString(),
            teaches: [tagToTeach],
            wantsToLearnInReturn: [tagToLearn]
    }
  }

  return (
    <><div className='createLayout'>
      <div>
          <NavBar></NavBar>
      </div>
      <div className='createContent'>
          <Header title="Upload your own video!"></Header>
          <UploadVideo
            icon='./src/assets/upload_icon.svg'
          />
          <BigButton content='Upload'></BigButton>

          <InputGivy

            label="Description"
            type="text"
            value={description}
            placeholder="Write something..."
            onChange={e => setDescription(e.target.value)}  
            big={true}
          />

      </div>
    </div>
    </>
  )
}

export default Create