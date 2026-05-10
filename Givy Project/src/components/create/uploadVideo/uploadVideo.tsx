import './uploadVideo.css'

interface UploadVideoprops {
    icon: string
    onVideoSelect?: (file: File) => void
}

function UploadVideo({ icon, onVideoSelect }: UploadVideoprops) {

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (file) {
            onVideoSelect?.(file)
        }
    }

    return (
        <div className='uploadVideo'>
            <div className='border'>
                <img className='icon' src={icon} alt="" />
                <input
                    className='inputFile'
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                />
            </div>
        </div>
    )
}

export default UploadVideo