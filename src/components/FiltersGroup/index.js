import './index.css'

const FiltersGroup = props => {
  const {
    employmentTypesList,
    salaryRangesList,
    setMinimumPackage,
    setEmploymentTypes,
  } = props

  const onClickSalaryFilter = event => setMinimumPackage(event.target.value)

  const onToggleEmploymentFilters = event =>
    setEmploymentTypes(event.target.value)

  const renderTypesOfEmploymentContainer = () => (
    <div className="types-of-employment-container">
      <h1 className="filter-heading">Types of Employment</h1>
      <ul className="employment-types-list-container">
        {employmentTypesList.map(eachItem => (
          <li className="types-list-element" key={eachItem.employmentTypeId}>
            <input
              type="checkbox"
              className="check-box"
              id={eachItem.employmentTypeId}
              value={eachItem.employmentTypeId}
              onClick={onToggleEmploymentFilters}
            />
            <label className="label" htmlFor={eachItem.employmentTypeId}>
              {eachItem.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  const renderSalaryFilterContainer = () => (
    <div className="salary-filters-container">
      <h1 className="filter-heading">Salary Range</h1>
      <ul className="salary-filters-list-container">
        {salaryRangesList.map(eachItem => (
          <li className="salary-list-element" key={eachItem.salaryRangeId}>
            <input
              type="radio"
              name="salary"
              id={eachItem.salaryRangeId}
              value={eachItem.salaryRangeId}
              onClick={onClickSalaryFilter}
            />
            <label className="label">{eachItem.label}</label>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <div className="filters-container">
      {renderTypesOfEmploymentContainer()}
      <hr />
      {renderSalaryFilterContainer()}
    </div>
  )
}
export default FiltersGroup
