import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'
import {MdWork, MdLocationOn} from 'react-icons/md'
import './index.css'

const JobItem = props => {
  const {details} = props
  const {
    title,
    rating,
    packagePerAnnum,
    location,
    jobDescription,
    id,
    employmentType,
    companyLogoUrl,
  } = details
  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="job-item-container">
        <div className="company-profile-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
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
        <div className="location-type-salary-container">
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
          <h3 className="salary">{packagePerAnnum}</h3>
        </div>
        <hr />
        <div className="description-container">
          <h1 className="desc-heading">Description</h1>
          <p className="description">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}
export default JobItem
