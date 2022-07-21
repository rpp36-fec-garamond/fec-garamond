import React from 'react';
import ReviewList from './RnRComponents/ReviewList.jsx';
import RatingsList from './RnRComponents/RatingsList.jsx';
import CharacteristicsList from './RnRComponents/CharacteristicsList.jsx';
import Review from './RnRComponents/Review.jsx';
import Stars from './RnRComponents/Stars.jsx';
import Sort from './RnRComponents/Sort.jsx';

class RnR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ratingsPercent: 0,
      starsFilter: 0
    }
    this.percentRatings = this.percentRatings.bind(this);
    this.handleMoreReviews = this.handleMoreReviews.bind(this);
    this.setStarsFilter = this.setStarsFilter.bind(this);
  }

  percentRatings () {
    let total = parseInt(this.props.reviewsMetadata.recommended.false) + parseInt(this.props.reviewsMetadata.recommended.true);
    let percent = parseInt(this.props.reviewsMetadata.recommended.true) / total;
    percent = Math.floor(percent * 100);
    this.setState({ratingsPercent: percent});
  }

  handleMoreReviews () {
    this.props.setReviewsCount();
  }

  setStarsFilter () {
    this.setState({starsFilter: event.target.innerText[0]});
  }

  componentDidMount () {
    this.percentRatings();
  }

  render() {
    if (this.props.reviewsCount === 'Not expanded') {
      return (
        <div>
          <div className='RnR'>
            <div className='RnRHead'>
              <div>
                <h1 className="rating">RATINGS &#38; REVIEWS</h1>
              </div>
              <div className='rating'>
                {this.props.averageReviewScore}
              </div>
              <div className='rating'>
                <Stars ratings={this.props.averageReviewScore}/>
              </div>
            </div>
            <div className='RnRRatings'>
              <div>
                <span className='percent'>{this.state.ratingsPercent}&#37;</span> of reviewers recommend this product
              </div>
              <RatingsList ratings={this.props.reviewsMetadata.ratings} recommended={this.props.reviewsMetadata.recommended} starsFilter={this.state.starsFilter} setStarsFilter={this.setStarsFilter}/>
            </div>
            <div className='RnRCharacteristics'>
              <CharacteristicsList characteristics={this.props.reviewsMetadata.characteristics} />
            </div>
            <div className='RnRReviewHead'>
              <Sort reviewsMetadata={this.props.reviewsMetadata} sortOrder={this.props.sortOrder} />
            </div>
            <div className='RnRSortHead'>
              <div className='RnRHeadReviews'>
                <span>sorted by </span>
                <div className='sort'>
                  <select onChange={this.props.setSortOptions}>
                    {this.props.sortOptions.map((option, i) => {
                      return <option key={i} value={option}>{option}</option>
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className='RnRReviewList'>
              <ReviewList reviews={this.props.reviews} reviewsMetadata={this.props.reviewsMetadata} sortOrder={this.props.sortOrder} ratings={this.props.averageReviewScore} reviewsCount={this.props.reviewsCount} starsFilter={this.state.starsFilter} setStarsFilter={this.setStarsFilter} getReviewID={this.props.getReviewID}/>
            </div>
            <div className='RnRAddReview'>
              <button className='RnRReviewListButton1' onClick={this.handleMoreReviews}>More Reviews</button>
              <button className='RnRReviewListButton2'>Add Review</button>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div className='RnR'>
            <div className='RnRHead'>
              <div>
                <h1 className="rating">RATINGS &#38; REVIEWS</h1>
              </div>
              <div className='rating'>
                {this.props.averageReviewScore}
              </div>
              <div className='rating'>
                <Stars ratings={this.props.averageReviewScore}/>
              </div>
            </div>
            <div className='RnRRatings'>
              <div className='percent'>
                <span className='percent'>{this.state.ratingsPercent}&#37;</span> of reviewers recommend this product
              </div>
              <RatingsList ratings={this.props.reviewsMetadata.ratings} recommended={this.props.reviewsMetadata.recommended} starsFilter={this.state.starsFilter} setStarsFilter={this.setStarsFilter}/>
            </div>
            <div className='RnRCharacteristics'>
              <CharacteristicsList characteristics={this.props.reviewsMetadata.characteristics} />
            </div>
            <div className='RnRReviewHead'>
              <Sort reviewsMetadata={this.props.reviewsMetadata} sortOrder={this.props.sortOrder} />
            </div>
            <div className='RnRSortHead'>
              <div className='RnRHeadReviews'>
                <span>sorted by </span>
                <div className='sort'>
                  <select onChange={this.props.setSortOptions}>
                    {this.props.sortOptions.map((option, i) => {
                      return <option key={i} value={option}>{option}</option>
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className='RnRReviewList'>
              <ReviewList reviews={this.props.reviews} reviewsMetadata={this.props.reviewsMetadata} sortOrder={this.props.sortOrder} ratings={this.props.averageReviewScore} reviewsCount={this.props.reviewsCount} starsFilter={this.state.starsFilter} setStarsFilter={this.setStarsFilter} getReviewID={this.props.getReviewID}/>
            </div>
            <div className='RnRAddReview'>
                <button className='RnRReviewListButton1' onClick={this.handleMoreReviews}>Less Reviews</button>
                <button className='RnRReviewListButton2'>Add Review</button>
              </div>
          </div>
        </div>
      )
    }
  }
}

export default RnR;