
import React, { Component } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
class Upload extends Component {

    // API Endpoints
    custom_file_upload_url = `YOUR_API_ENDPOINT_SHOULD_GOES_HERE`;


    constructor(props) {
        super(props);
        this.state = {
            image_file: null,
            image_preview: '',
        }
    }

    // Image Preview Handler
    handleImagePreview = (e) => {
        let image_as_base64 = URL.createObjectURL(e.target.files[0])
        let image_as_files = e.target.files[0];

        this.setState({
            image_preview: image_as_base64,
            image_file: image_as_files,
        })
    }
    handleSubmitFile = () => {

        if (this.state.image_file !== null){

            let formData = new FormData();
            formData.append('customFile', this.state.image_file);
            // the image field name should be similar to your api endpoint field name
            // in my case here the field name is customFile
            for (var key of formData.entries()) {
        console.log(key[0] + ', ' + key[1]);
    }

            axios.post(
                '/fixit',
                formData,
                {
                    headers: {
                        "auth":localStorage.token,
                        "Content-type": "multipart/form-data",
                    },
                }
            )
            .then(res => {
                console.log(`Success` + res.data);

                window.location.href = "/img1";
            })
            .catch(err => {
                console.log(err);
            })
        }

    }


    // render from here
    render() {
      localStorage.token=this.props.post;
      console.log(this.props.post);
        return (
            <div className="post card">
                {/* image preview */}
                <img src={this.state.image_preview} alt="image preview" width="300" height="300"/>

                {/* image input field */}
                <input
                    type="file"
                    onChange={this.handleImagePreview}
                />
                <label>Upload file</label>
                <input type="submit" onClick={this.handleSubmitFile} value="Submit"/>

            </div>
        );
    }
}
const mapdata=(state)=>{
  return{post:state.post}
}
export default connect(mapdata)(Upload);
