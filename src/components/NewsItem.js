import React, { Component } from 'react'

export class NewsItem extends Component {


  render() {
      let {title,description,imageUrl,newsUrl,author,date}=this.props

      /*Below snippet takes data from props and populate it on UI */
    return (
            <div className='my-3'>
                <div className="card" >
                      <img className="card-img-top" src={imageUrl?imageUrl:"https://telanganatoday.com/wp-content/uploads/2022/03/iPhone-14-Pro-to-feature-larger-camera-bump-due-to-new-48MP-sensor.jpg"} alt="Card image cap"/>
                      <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted"> Written By {author?author:"Unknown author"} on { new Date(date).toGMTString()} ></small> </p>   {/* Inserted author and published date of article*/}
                        <a href={newsUrl} className="btn btn-sm btn-primary">Read More</a>
                      </div>
                </div>
              
            </div>
    )
  }
  }

export default NewsItem