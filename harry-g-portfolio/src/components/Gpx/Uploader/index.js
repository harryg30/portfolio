import { useEffect, useState, useRef } from 'react'
import { PropTypes } from 'prop-types'

Uploader.propTypes = {
    form: PropTypes.object
}

const Uploader = (props) => {
    const [selectedFile, setSelectedFile] = useState();
    const [isSelected, setIsSelected] = useState(false)
    const [isUploaded, setIsUploaded] = useState(false);
  
    const changeHandler = (event) => {
      setSelectedFile(event.target.files[0]);
      setIsSelected(true);
    };


    const handleSubmission = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    console.log(formData)
    fetch('http://localhost:5000/upload',
      {
        method: 'POST',
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((result) => {
        setIsUploaded(true)
        console.log('Success:', result);
      })

      .catch((error) => {
        console.error('Error:', error);
      });
  };

    return(
        <>
            <p>When you add a gpx file the map and stats will update</p>
            <form ref={props.form} onSubmit={handleSubmission}>
                <input type="file" id="gpx" name="gpx" accept="csv" />
                <input type="submit" className="flat-button" value="Upload" />
            </form>
        </>
    )

}

export default Uploader