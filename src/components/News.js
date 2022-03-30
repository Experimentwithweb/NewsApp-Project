import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

  /*  Below code snippet provide values for props only if it is not provided by root component*/
  static defaultProps = {
    country: 'in',
    pageSize:'9',
    category:'business'
  }

  /*  Below code snippet specifies datatupe of props variable */
  static propTypes= {
    country: PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
  }

capitalizeFirstLetter=(string)=> {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
  
  constructor(props){
            super(props)
            this.state={
              articles: [] ,
              loading:true,
              page:1,
              totalResults:0
            }
           document.title=`${ this.capitalizeFirstLetter(this.props.category) } NewsMonkey`;
          }


/*Below function fetch News articles by making API request in JSON format and stores it in "articles" array */
async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d1d6eb7662d94253b58aec5f44ed13cb&page=1&pageSize=${this.props.pageSize}`
        console.log(url)
        this.setState({loading:true})
        let data = await fetch(url)
        let parsedData= await data.json()
        this.setState({loading:false})
        this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults})
      }

/*Below function fetch News articles for previous pages by making API request in JSON format and stores it in "articles" array */
 handlePrevClick =async()=>{
        console.log("Previous")
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d1d6eb7662d94253b58aec5f44ed13cb&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
        console.log(url)
        this.setState({loading:true})
        let data = await fetch(url)
        let parsedData= await data.json()
        this.setState({loading:false})
        this.setState(
          {
            page:this.state.page-1,
            articles:parsedData.articles
          }
        ) 
      }

/*Below function fetch News articles for Next pages by making API request in JSON format and stores it in "articles" array */
 handleNextClick =async()=>{
      if (this.state.page+1 <= Math.ceil(this.state.totalResults/this.props.pageSize)){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d1d6eb7662d94253b58aec5f44ed13cb&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
        console.log(url)
        this.setState({loading:true})
        let data = await fetch(url)
        let parsedData= await data.json()
        this.setState({loading:false})
        this.setState(
          {
            page:this.state.page+1,
            articles:parsedData.articles
          }
        ) 
    }
    else{
    }

    }

    fetchMoreData = async() => {
      this.setState({page: this.state.page+1})
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d1d6eb7662d94253b58aec5f44ed13cb&page=${this.state.page}&pageSize=${this.props.pageSize}`
      console.log(url)
      let data = await fetch(url)
      let parsedData= await data.json()
      this.setState({
        articles:this.state.articles.concat(parsedData.articles),
        totalResults:parsedData.totalResults,
      })
    };

  render() {
    return (
      <>
        <h1 className='text-center' style={{margin: '35px'}}>Top { this.capitalizeFirstLetter(this.props.category) } Headlines</h1>
        {this.state.loading && <Spinner />}  {/*  Shows the spinner image until loading variable is set to true */}

        <InfiniteScroll
                  dataLength={this.state.articles.length}
                  next={this.fetchMoreData}
                  hasMore={this.state.articles.length !== this.state.totalResults}
                  loader={ <Spinner/> }
                >
                  <div className='container'>
                        {/* map method takes element one by one  as a paramater from "articles" array which is the collection of JSON objects fetched from News API.
                        and returns the News item component on console by passing respective props in News component  */}
                        <div className="row"> 
                              {this.state.articles.map((element)=>{
                                return   <div key={element.url} className="col-md-4  ">
                                <NewsItem  title={element.title?element.title.slice(0,50):"Not available"} description={element.description?element.description.slice(0,88):" Not available"} 
                                newsUrl={element.url} imageUrl={element.urlToImage} author={element.author} date={element.publishedAt}/>
                                </div>
                                })}
                        </div>
                  </div>
        </InfiniteScroll>

        <div className='container d-flex justify-content-between'>  {/* This class is For previous and Next buttons*/}

        </div>
      </>
    )
  }
}
export default News
