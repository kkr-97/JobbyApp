import {Component} from 'react'
import Cookie from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'
import {MdWork, MdLocationOn} from 'react-icons/md'
import {FaExternalLinkAlt} from 'react-icons/fa'
import Header from '../Header'
import SimilarJobCard from '../SimilarJobCard'
import './index.css'

const apiStatus = {
  initial: 'Initial',
  inProgress: 'In_Progress',
  success: 'Completed',
  failed: 'Failed',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: '',
    fetchJobDetailsStatus: apiStatus.initial,
  }

  componentDidMount() {
    this.fetchJobDetails()
  }

  fetchJobDetails = async () => {
    this.setState({fetchJobDetailsStatus: apiStatus.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const token = Cookie.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        jobDetails: data.job_details,
        similarJobs: data.similar_jobs,
      }
      const updatedJobDetails = {
        lifeAtCompany: updatedData.jobDetails.life_at_company,
        jobDescription: updatedData.jobDetails.job_description,
        id: updatedData.jobDetails.id,
        employmentType: updatedData.jobDetails.employment_type,
        companyWebsiteUrl: updatedData.jobDetails.company_website_url,
        companyLogoUrl: updatedData.jobDetails.company_logo_url,
        skills: updatedData.jobDetails.skills,
        location: updatedData.jobDetails.location,
        packagePerAnnum: updatedData.jobDetails.package_per_annum,
        rating: updatedData.jobDetails.rating,
      }
      const updatedSimilarJobs = updatedData.similarJobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))

      this.setState({
        jobDetails: {
          jobItemDetails: updatedJobDetails,
          similarJobs: updatedSimilarJobs,
        },
        fetchJobDetailsStatus: apiStatus.success,
      })
    } else {
      this.setState({fetchJobDetailsStatus: apiStatus.failed})
    }
  }

  renderLoadingElement = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderInformationFailedView = () => (
    <div className="failed-jobs-list-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />

      {/* eslint-disable-next-line */}
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-content">
        We cannot seem to find the page you are looking for
      </p>
      <button
        className="retry-btn"
        onClick={this.fetchJobDetails}
        type="button"
      >
        Retry
      </button>
    </div>
  )

  renderSimilarJobContainer = () => {
    const {jobDetails} = this.state
    const {similarJobs} = jobDetails
    return (
      <div className="similar-jobs-container">
        <h1 className="desc-heading">Similar Jobs</h1>
        <ul className="similar-job-items-container">
          {similarJobs.map(eachItem => (
            <SimilarJobCard
              fetchJobDetails={this.fetchJobDetails}
              details={eachItem}
              key={eachItem.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderJobDetailedInformation = () => {
    const {jobDetails} = this.state
    return (
      <div className="job-info-out-container">
        <div className="job-information-in-container">
          <div className="company-profile-container">
            <img
              src={jobDetails.jobItemDetails.companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div className="role-rating-container">
              <h1 className="role-name">{jobDetails.jobItemDetails.title}</h1>
              <div className="rating-container">
                <BsFillStarFill className="star" />
                <p className="rating">{jobDetails.jobItemDetails.rating}</p>
              </div>
            </div>
          </div>
          <div className="location-type-salary-container">
            <div className="location-type-container">
              <div className="location-container">
                <MdLocationOn className="location-icon" />
                <p className="location">{jobDetails.jobItemDetails.location}</p>
              </div>
              <div className="type-container">
                <MdWork className="work-icon" />
                <p className="employment-type">
                  {jobDetails.jobItemDetails.employmentType}
                </p>
              </div>
            </div>
            <p className="salary">
              {jobDetails.jobItemDetails.packagePerAnnum}
            </p>
          </div>
          <hr />
          <div className="description-container">
            <div className="desc-heading-visit-container">
              <h1 className="desc-heading">Description</h1>
              <a
                href={jobDetails.jobItemDetails.companyWebsiteUrl}
                className="company-url"
              >
                Visit <FaExternalLinkAlt />
              </a>
            </div>
            <p className="description">
              {jobDetails.jobItemDetails.jobDescription}
            </p>
          </div>
          <div className="skills-container">
            <h3 className="job-sub-heading">Skills</h3>
            <ul className="skills-list-container">
              {jobDetails.jobItemDetails.skills.map(eachItem => (
                <li className="skill-item" key={eachItem.name}>
                  <img
                    src={eachItem.image_url}
                    alt={eachItem.name}
                    className="skill-img"
                  />
                  <p className="skill">{eachItem.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="life-at-company-container">
            <h1 className="desc-heading">Life at Company</h1>
            <div className="life-at-company-content-container">
              <p className="description">
                {jobDetails.jobItemDetails.lifeAtCompany.description}
              </p>
              <img
                src={jobDetails.jobItemDetails.lifeAtCompany.image_url}
                alt="life at company"
                className="life-company-img"
              />
            </div>
          </div>
        </div>
        {this.renderSimilarJobContainer()}
      </div>
    )
  }

  renderRespectiveElement = status => {
    switch (status) {
      case apiStatus.success:
        return this.renderJobDetailedInformation()
      case apiStatus.inProgress:
        return this.renderLoadingElement()
      case apiStatus.failed:
        return this.renderInformationFailedView()
      default:
        return null
    }
  }

  render() {
    const {fetchJobDetailsStatus} = this.state
    return (
      <div className="selected-job-item-details-container">
        <Header />
        <div className="job-information-container">
          {this.renderRespectiveElement(fetchJobDetailsStatus)}
        </div>
      </div>
    )
  }
}
export default JobItemDetails
