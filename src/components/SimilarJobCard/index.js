import {withRouter} from 'react-router-dom'
import {MdWork, MdLocationOn} from 'react-icons/md'
import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const SimilarJobCard = props => {
  const {details, fetchJobDetails} = props
  const {
    companyLogoUrl,
    title,
    id,
    rating,
    employmentType,
    location,
    jobDescription,
  } = details

  const onClickSimilarJob = async () => {
    const {history} = props
    await history.push(`/jobs/${id}`)
    fetchJobDetails()
  }

  return (
    <li className="similar-job-item" onClick={onClickSimilarJob}>
      <div className="company-profile-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="company-logo"
        />
        <div className="role-rating-container">
          <h1 className="role-name">{title}</h1>
          <div className="rating-container">
            <BsFillStarFill className="star" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <div className="description-container">
        <h1 className="desc-heading">Description</h1>
        <p className="description">{jobDescription}</p>
      </div>
      <div className="location-type-container">
        <div className="location-container">
          <MdLocationOn className="location-icon" />
          <p className="location">{location}</p>
        </div>
        <div className="type-container">
          <MdWork className="work-icon" />
          <p className="employment-type">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}
export default withRouter(SimilarJobCard)
