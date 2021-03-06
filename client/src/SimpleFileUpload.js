import React from 'react'
// import axios, { post } from 'axios';
import axios from 'axios';

// https://gist.github.com/AshikNesin/e44b1950f6a24cfcd85330ffc1713513
class SimpleFileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      file:null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }

  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file).then((response)=>{
      console.log(response.data);
      this.props.uploadHandler()
    })
  }

  onChange(e) {
    this.setState({file:e.target.files[0]})
  }

  fileUpload(file){
    const url = '/api/upload/file';
    const formData = new FormData();
    formData.append('file', file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return axios.post(url, formData, config)
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <h2>File Upload</h2>
        <input type="file" onChange={this.onChange} />
        <button type="submit">Upload</button>
      </form>
   )
  }
}

export default SimpleFileUpload
