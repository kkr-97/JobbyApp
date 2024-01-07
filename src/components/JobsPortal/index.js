import {Component} from 'react'
import Cookie from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import JobItem from '../JobItem'
import FiltersGroup from '../FiltersGroup'
import './index.css'

const apiStatus = {
  initial: 'Initial',
  inProgress: 'In_Progress',
  success: 'Completed',
  failed: 'Failed',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]
const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class JobsPortal extends Component {
  state = {
    profileApiStatus: apiStatus.initial,
    jobsListApiStatus: apiStatus.initial,
    profileDetails: {},
    jobsList: [],
    employmentTypes: [],
    minimumPackage: '',
    search: '',
  }

  componentDidMount() {
    this.fetchProfileDetails()
    this.fetchJobsList()
  }

  fetchProfileDetails = async () => {
    this.setState({profileApiStatus: apiStatus.inProgress})

    const token = Cookie.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch('https://apis.ccbp.in/profile/', options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
        profileApiStatus: apiStatus.success,
      })
    } else {
      this.setState({profileApiStatus: apiStatus.failed})
    }
  }

  fetchJobsList = async () => {
    this.setState({jobsListApiStatus: apiStatus.inProgress})

    const {employmentTypes, minimumPackage, search} = this.state
    const strEmploymentTypes = employmentTypes.join(',')
    const token = Cookie.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const url = `https://apis.ccbp.in/jobs?employment_type=${strEmploymentTypes}&minimum_package=${minimumPackage}&search=${search}`

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const {jobs} = data
      const updatedList = jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        jobsList: updatedList,
        jobsListApiStatus: apiStatus.success,
      })
    } else {
      this.setState({jobsListApiStatus: apiStatus.failed})
    }
  }

  retryJobsList = () => this.fetchJobsList()

  retryProfile = () => this.fetchProfileDetails()

  setMinimumPackage = minSalary =>
    this.setState({minimumPackage: minSalary}, this.fetchJobsList)

  setEmploymentTypes = employmentTypeId => {
    const {employmentTypes} = this.state
    if (employmentTypes.includes(employmentTypeId)) {
      const updatedList = employmentTypes.filter(
        eachItem => eachItem !== employmentTypeId,
      )
      this.setState({employmentTypes: updatedList}, this.fetchJobsList)
    } else {
      const updatedList = [...employmentTypes, employmentTypeId]
      this.setState({employmentTypes: updatedList}, this.fetchJobsList)
    }
  }

  onChangeSearchInp = event => this.setState({search: event.target.value})

  onClickSearch = () => this.fetchJobsList()

  renderLoadingElement = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  successProfileView = profileDetails => {
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile-in-container">
        <img src={profileImageUrl} alt={name} className="profile-img" />
        <h1 className="profile-name">{name}</h1>
        <p className="short-bio">{shortBio}</p>
      </div>
    )
  }

  renderFailedProfileView = () => (
    <button className="retry-btn" onClick={this.retryProfile} type="button">
      Retry
    </button>
  )

  renderProfileElement = () => {
    const {profileApiStatus, profileDetails} = this.state
    switch (profileApiStatus) {
      case apiStatus.success:
        return this.successProfileView(profileDetails)
      case apiStatus.inProgress:
        return this.renderLoadingElement()
      case apiStatus.failed:
        return this.renderFailedProfileView()
      default:
        return null
    }
  }

  renderProfileAndFilters = () => (
    <div className="profile-filters-container">
      <div className="profile-out-container">{this.renderProfileElement()}</div>
      <hr />
      <FiltersGroup
        salaryRangesList={salaryRangesList}
        employmentTypesList={employmentTypesList}
        setMinimumPackage={this.setMinimumPackage}
        setEmploymentTypes={this.setEmploymentTypes}
      />
    </div>
  )

  renderJobsListSuccessView = jobsList => {
    if (jobsList.length !== 0) {
      return (
        <ul className="jobs-list-container">
          {jobsList.map(eachItem => (
            <JobItem details={eachItem} key={eachItem.id} />
          ))}
        </ul>
      )
    }
    return (
      <div className="no-product-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs-img"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-content">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderFailedJobsListView = () => (
    <div className="failed-jobs-list-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      {/* eslint-disable-next-line */}
      <h1 className="failure-heading">Oop's! Something Went Wrong</h1>
      <p className="failure-content">
        We cannot seem to find the page your are looking for.
      </p>
      <button className="retry-btn" onClick={this.retryJobsList} type="button">
        Retry
      </button>
    </div>
  )

  renderJobsListElement = (jobsListApiStatus, jobsList) => {
    switch (jobsListApiStatus) {
      case apiStatus.success:
        return this.renderJobsListSuccessView(jobsList)
      case apiStatus.inProgress:
        return this.renderLoadingElement()
      case apiStatus.failed:
        return this.renderFailedJobsListView()
      default:
        return null
    }
  }

  renderJobsList = () => {
    const {jobsListApiStatus, search, jobsList} = this.state
    return (
      <div className="jobs-search-list-container">
        <div className="search-container large-dev">
          <input
            type="search"
            className="search-box"
            value={search}
            placeholder="Search"
            onChange={this.onChangeSearchInp}
          />
          <button
            type="button"
            data-testid="searchButton"
            onClick={this.onClickSearch}
            className="search-btn"
          >
            <BsSearch className="search-icon" />
            {}
          </button>
        </div>
        {this.renderJobsListElement(jobsListApiStatus, jobsList)}
      </div>
    )
  }

  render() {
    const {search} = this.state
    return (
      <div className="jobs-portal-page-container">
        <Header />
        <div className="jobs-non-header-container">
          <div className="search-container small-dev">
            <input
              type="search"
              className="search-box"
              value={search}
              placeholder="Search"
              onChange={this.onChangeSearchInp}
            />
            <button
              type="button"
              data-testid="searchButton"
              onClick={this.onClickSearch}
              className="search-btn"
            >
              <BsSearch className="search-icon" />
              {}
            </button>
          </div>
          {this.renderProfileAndFilters()}
          {this.renderJobsList()}
        </div>
      </div>
    )
  }
}
export default JobsPortal
