import './create.css'
import NavBar from '../../components/navBar/navBar'
import Header from '../../components/header/header'
import BigButton from '../../components/buttonsGivy/bigButton/bigButton.tsx'
import UploadVideo from '../../components/create/uploadVideo/uploadVideo'
import InputGivy from '../../components/inputGivy/inputGivy'
import videos from "../../data/videos.json"
import tagsData from '../../data/tags.json'
import { useState } from 'react'
import VideoScreen from '../../components/create/videoScreen/videoScreen'
import Dropdown from '../../components/create/dropDown/dropDown.tsx'
import MediumButton from '../../components/buttonsGivy/mediumButtons/mediumButton.tsx'

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
    

  function publishVideo(){ 

        if (!videoUrl || !tagToTeach || !tagToLearn) return

        const stored = localStorage.getItem('videos')
        const allVideos = stored ? JSON.parse(stored) : videos

        const newVideo = {
            id: `v${allVideos.length + 1}`,
            userId: userLogged,
            matchId: null,
            url: videoUrl,
            thumbnail: videoUrl,
            title: description || 'Sin título',
            description: description,
            tags: [tagToTeach],
            likes: 0,
            uploadDate: new Date().toISOString(),
            teaches: [tagToTeach],
            wantsToLearnInReturn: [tagToLearn]
        }

        localStorage.setItem('videos', JSON.stringify([...allVideos, newVideo]))
        alert('Video publicado!')

        setSelectedFile(null)
        setVideoUrl(null)
        setDescription('')
        setTagToTeach('')
        setTagToLearn('')
  }


  return (
    <>
      <div className='createLayout'>
        <div>
          <NavBar/>
        </div>
        <div className='createContent'>

          <Header title="Upload your own video!" />

          {!selectedFile ?(

          <div className='uploadVideoContainer'>

            <p>Chose what you want to share!</p>
            
            <UploadVideo
              icon='./src/assets/upload_icon.svg'
              onVideoSelect={handleVideoSelect}
            />
            <BigButton
              content='Upload'
            />
          </div>

        ):(

          <>
          <div className='publishVideoContainer'>

              <VideoScreen icon='../src/assets/play_video_button.svg'/>
              <div  className='videoInformation'>
                  <Dropdown
                      label="What do you want to teach?"
                      options={tagsData}
                      value={tagToTeach}
                      onChange={val => setTagToTeach(val)}
                  />
                  <Dropdown
                      label="What do you want to learn?"
                      options={tagsData}
                      value={tagToLearn}
                      onChange={val => setTagToLearn(val)}
                  />
                  <InputGivy
                    label="Description"
                    type="text"
                    value={description}
                    placeholder="Write something..."
                    onChange={e => setDescription(e.target.value)}
                    big={true}
                  />
                  <MediumButton
                    content='Publish'
                    onClick={publishVideo}
                  />

              </div>


          </div>
            
          </>

        )}

        </div>
      </div>
    </>
  )
}

export default Create