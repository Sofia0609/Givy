import './create.css'
import NavBar from '../../components/navBar/navBar'
import Header from '../../components/header/header'
import BigButton from '../../components/buttonsGivy/bigButton/bigButton.tsx'
import UploadVideo from '../../components/create/uploadVideo/uploadVideo'
import InputGivy from '../../components/inputGivy/inputGivy'
import tagsData from '../../data/tags.json'
import { useState } from 'react'
import VideoScreen from '../../components/create/videoScreen/videoScreen'
import MediumButton from '../../components/buttonsGivy/mediumButtons/mediumButton.tsx'
import DropdownCustom from '../../components/create/dropDown/dropDown.tsx'
import { supabase } from '../../lib/supabase'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store/index'

function Create() {

  const currentUser = useSelector((state: RootState) => state.user.currentUser)

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [description, setDescription] = useState('')
  const [tagToTeach, setTagToTeach] = useState('')
  const [tagToLearn, setTagToLearn] = useState('')
  const [loading, setLoading] = useState(false)

  function handleVideoSelect(file: File) {
    setSelectedFile(file)
  }

  async function publishVideo() {
    if (!selectedFile || !tagToTeach || !tagToLearn || !currentUser) return

    setLoading(true)

    try {
      // 1. Subir el video al bucket "videos"
      const fileName = `${currentUser.id}_${Date.now()}.mp4`
      const { error: uploadError } = await supabase.storage
        .from('videos')
        .upload(fileName, selectedFile)

      if (uploadError) throw uploadError

      // 2. Obtener la URL pública
      const { data: publicUrlData } = supabase.storage
        .from('videos')
        .getPublicUrl(fileName)

      const publicUrl = publicUrlData.publicUrl

      // 3. Guardar en la tabla "videos"
      const { error: dbError, data: dbData } = await supabase
        .from('videos')
        .insert({
          id: crypto.randomUUID(),
          user_id: currentUser.id,
          match_id: null,
          URL: publicUrl,
          description: description,
          teaches: tagToTeach,
          wantsToLearn: tagToLearn,
          likes: 0
        })

      console.log('dbError:', JSON.stringify(dbError))
      console.log('dbData:', dbData)


      if (dbError) throw dbError

      alert('Video publicado!')

      setSelectedFile(null)
      setDescription('')
      setTagToTeach('')
      setTagToLearn('')

    } catch (error) {
      console.error('Error publicando video:', JSON.stringify(error))
      alert('Error al publicar el video, intenta de nuevo')
    }
  }

  return (
    <>
      <div className='createLayout'>
        <div>
          <NavBar />
        </div>
        <div className='createContent'>

          <Header title="Upload your own video!" />

          {!selectedFile ? (

            <div className='uploadVideoContainer'>
              <p>Chose what you want to share!</p>
              <UploadVideo
                icon='./src/assets/upload_icon.svg'
                onVideoSelect={handleVideoSelect}
              />
              <BigButton content='Upload' />
            </div>

          ) : (

            <div className='publishVideoContainer'>
              <VideoScreen icon='../src/assets/play_video_button.svg' />
              <div className='videoInformation'>
                <DropdownCustom
                  label="What do you want to teach?"
                  options={tagsData}
                  value={tagToTeach}
                  onChange={val => setTagToTeach(val)}
                />
                <DropdownCustom
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
                  content={loading ? 'Uploading...' : 'Publish'}
                  onClick={publishVideo}
                />
              </div>
            </div>

          )}

        </div>
      </div>
    </>
  )
}

export default Create