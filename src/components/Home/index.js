import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => {
  const renderHomePageContainer = () => (
    <div className="home-page-container">
      <div className="home-content-container">
        <h1 className="home-heading">Find The Job That Fits Your Life</h1>
        <p className="home-content">
          Millions of people are searching for jobs, salary, information,
          company reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button type="button" className="find-jobs-btn">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  )

  return (
    <div className="home-bg-container">
      <Header />
      {renderHomePageContainer()}
    </div>
  )
}
export default Home
