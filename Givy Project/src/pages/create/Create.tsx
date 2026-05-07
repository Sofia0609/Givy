import './create.css'
import NavBar from '../../components/navBar/navBar'
import Header from '../../components/header/header'
import BigButton from '../../components/bigButton/bigButton'
import UploadVideo from '../../components/create/uploadVideo/uploadVideo'
import InputGivy from '../../components/inputGivy/inputGivy'

function Create() {

  return (
    <><div className='createLayout'>
      <div>
          <NavBar></NavBar>
      </div>
      <div className='createContent'>
          <Header title="Upload your own video!"></Header>
          <UploadVideo
            icon='./src/assets/uploaded_icon.svg'
          />
          <BigButton content='Upload'></BigButton>

          <InputGivy 
            label="Title"
            type="text"
            value='Hola'
            placeholder="placeholder"
            big={true}
          />
      </div>
    </div>
    </>
  )
}

export default Create